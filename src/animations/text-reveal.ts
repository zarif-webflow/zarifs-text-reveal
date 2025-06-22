import "./text-reveal.css";

import { wait } from "@finsweet/ts-utils";
import { afterWebflowReady, getGsap, type GSAPTweenVars, type GSAPType } from "@taj-wf/utils";

import { selectors } from "@/utils/constants";
import { getAnimationValues } from "@/utils/valueGetters";
import { wrapHyphenatedWords } from "@/utils/wrap-words";

/**
 * Text Reveal Animation Module
 *
 * This module creates animated text reveals using GSAP and SplitText.
 * It supports splitting text into characters, words, or lines and animating them
 * with different entrance animations when they enter the viewport.
 */

// Type alias for GSAP timeline
type Timeline = ReturnType<GSAPType["timeline"]>;

/**
 * Initialize text reveal animations
 */

type TextRevealInstance = {
  splitText: SplitText;
  revealObserver: IntersectionObserver;
  resetObserver: IntersectionObserver | undefined;
};

type Nullish<T> = {
  [K in keyof T]: T[K] | undefined;
};

let textRevealInstances: Array<Nullish<TextRevealInstance>> = [];

let splitSetupInitializers: Array<() => TextRevealInstance> = [];

const executeSplitSetupInitializers = () => {
  for (const initializer of splitSetupInitializers) {
    const { splitText, revealObserver, resetObserver } = initializer();
    textRevealInstances.push({ splitText, revealObserver, resetObserver });
  }
  splitSetupInitializers = [];
};

const initTextReveal = () => {
  // Barba Js Page Transitioner Instance
  // @ts-expect-error barbe no types
  const barbaInstance = window.BarbaInstance;

  // Select all elements with a data-reveal-type attribute (chars, words, or lines)
  const charRevealElements = document.querySelectorAll<HTMLElement>(selectors.revealType);

  // Check if page has a loader by parsing loader duration from body attribute
  const loaderDuration = Number.parseInt(document.body.dataset.loaderDuration ?? "");
  const doesLoaderExist = !Number.isNaN(loaderDuration);

  const [gsap, SplitText] = getGsap(["SplitText"]);

  if (!gsap) {
    console.error(
      "GSAP is not imported. GSAP Script must be loaded before text-reveal script. Get it from here: https://gsap.com/docs/v3/Installation/?tab=cdn&module=esm&require=false&plugins=SplitText"
    );
    return;
  }

  if (!SplitText) {
    console.error(
      "SplitText plugin script is not imported. SplitText Script must be loaded after GSAP script and before text-reveal script. Get it from here: https://gsap.com/docs/v3/Installation/?tab=cdn&module=esm&require=false&plugins=SplitText"
    );
    return;
  }

  // Process each text reveal element
  for (let i = 0; i < charRevealElements.length; i++) {
    // Target element to animate
    const charRevealEl = charRevealElements[i]!;

    // Find parent element for intersection observation
    // If data-reveal-parent exists, use it, otherwise use the element itself
    const charRevealParentEl =
      charRevealEl.closest<HTMLElement>(selectors.revealParent) || charRevealEl;

    // Extract animation configuration from data attributes
    // These values determine how the animation will behave
    const {
      animationType, // Type of animation (from-bottom, from-top, fade-from-bottom-left)
      delay, // Delay before animation starts
      duration, // Duration of animation
      easing, // Easing function
      revealType, // How text is split (chars, words, lines)
      staggerDelay, // Delay between each animated element
      fromX, // Starting X position for fade-from-bottom-left
      fromY, // Starting Y position for fade-from-bottom-left
      fromOpacity, // Starting opacity for fade-from-bottom-left
      viewThreshold, // Viewport threshold to trigger animation
    } = getAnimationValues(charRevealEl, undefined, charRevealParentEl);

    /**
     * Determine if split text should remain split after animation
     * Checks data-keep-split on element or closest ancestor with that attribute
     */
    const getKeepSplit = () => {
      const value =
        charRevealEl.dataset.keepSplit ||
        charRevealEl.closest<HTMLElement>("[data-keep-split]")?.dataset.keepSplit;

      if (value === "true") return true;
      if (value === "false") return false;

      return false;
    };

    /**
     * Determine if animation should reset when element leaves viewport
     * Checks data-reset-animation on element or closest ancestor with that attribute
     */
    const getResetAnimation = () => {
      const value =
        charRevealEl.dataset.resetAnimation ||
        charRevealEl.closest<HTMLElement>("[data-reset-animation]")?.dataset.resetAnimation;

      if (value === "true") return true;
      if (value === "false") return false;

      return false;
    };

    const keepSplit = getKeepSplit();
    const shouldAnimationReset = getResetAnimation();

    // Animation properties for initial (hidden) and final (visible) states
    const initialAnimationProps: GSAPTweenVars = {};
    const finalAnimationProps: GSAPTweenVars = {};

    // Configure animation properties based on animation type
    if (animationType === "from-bottom") {
      // Start below and animate up
      initialAnimationProps.y = "100%";
      finalAnimationProps.y = "0%";
    } else if (animationType === "from-top") {
      // Start above and animate down
      initialAnimationProps.y = "-100%";
      finalAnimationProps.y = "0%";
    } else if (animationType === "fade-from-bottom-left") {
      // Start from bottom-left with fade-in
      initialAnimationProps.y = fromY || "30%";
      initialAnimationProps.x = fromX || "-50px";
      initialAnimationProps.opacity = fromOpacity || "0.05";

      finalAnimationProps.y = "0%";
      finalAnimationProps.x = "0%";
      finalAnimationProps.opacity = "1";
    }

    // Add common animation properties
    finalAnimationProps.delay = delay;
    finalAnimationProps.duration = duration;
    finalAnimationProps.ease = easing;
    finalAnimationProps.stagger = staggerDelay;

    // References to store created GSAP and SplitText instances
    let ctx: ReturnType<GSAPType["context"]> | undefined = undefined;
    let tl: Timeline | undefined = undefined;
    let splitter: globalThis.SplitText | undefined = undefined;
    let splittedElements: Element[] | undefined = undefined;

    /**
     * Clean up GSAP timeline and context
     */
    const destroyTimeline = () => {
      if (tl) {
        tl.revert();
        tl = undefined;
      }
      if (ctx) {
        ctx.revert();
        ctx = undefined;
      }
    };

    /**
     * Create GSAP timeline for the animation
     */
    const initTimeline = () => {
      ctx = gsap.context(() => {
        // Create paused timeline - will be played when element enters viewport
        tl = gsap.timeline({ paused: true });

        // Set initial state (hidden)
        tl.set(splittedElements!, initialAnimationProps).add("start");

        // Animate to final state (visible)
        tl.to(splittedElements!, finalAnimationProps).add("end");

        // Set tiny progress to ensure initial state is applied
        tl.progress(0.001);
      });
    };

    /**
     * Reset animation by destroying timeline and reverting split text
     */
    const resetSplitAnimation = () => {
      destroyTimeline();
      splitter?.revert();

      // Fix layout shift for line animations
      if (revealType === "lines" && !keepSplit) {
        fixLineLayoutShiftAfterRevert();
      }
    };

    /**
     * Fix layout shift for line animations by setting width before splitting
     * This prevents content jumps when text is split into lines
     * Uses getBoundingClientRect() to get precise decimal pixel values instead of
     * offsetWidth which rounds down to integers
     */
    const fixLineLayoutShiftBeforeSplit = () => {
      // Get exact width with decimal precision
      const rect = charRevealEl.getBoundingClientRect();
      const charRevealElWidth = rect.width + "px";

      charRevealEl.style.minWidth = charRevealElWidth;
    };

    /**
     * Remove fixed width after animation reverts
     */
    const fixLineLayoutShiftAfterRevert = () => {
      charRevealEl.style.removeProperty("min-width");
    };

    /**
     * Create SplitText instance and configure it based on animation settings
     */
    const getSplitter = () => {
      // Fix layout issues for line animations
      if (revealType === "lines" && !keepSplit) {
        wrapHyphenatedWords(charRevealEl);
        fixLineLayoutShiftBeforeSplit();
      }

      const splitter = SplitText.create(charRevealEl, {
        // For char animations, we need to split into words first, then chars
        type: revealType === "chars" ? "words, chars" : revealType,
        // To make lines responsive
        autoSplit: revealType === "lines",
        // Only use masks for from-top/from-bottom animations (not for fade animations)
        mask:
          animationType === "fade-from-bottom-left"
            ? undefined
            : revealType === "chars"
              ? "words"
              : revealType,
        // To make sure chars wont break
        smartWrap: revealType === "chars",
        // CSS classes for split elements
        charsClass: "split-chars",
        wordsClass: "split-words",
        linesClass: "split-lines",
        // Initialize timeline when on split
        onSplit: (split) => {
          splittedElements = split[revealType];
          initTimeline();
        },
      });

      // Mark element as initialized so CSS can show it
      // Works with CSS: [data-reveal-type]:not([data-initialized]) { visibility: hidden; }
      charRevealEl.setAttribute("data-initialized", "");
      return splitter;
    };

    /**
     * Handle element entering viewport - play animation
     */
    const onEnter = () => {
      if (!tl) return;

      // Play animation and clean up after if not keeping split text
      tl.restart(true).then(() => {
        if (keepSplit) return;
        resetSplitAnimation();
      });
    };

    /**
     * Handle element leaving viewport - reset for animations that should restart
     */
    const onLeave = () => {
      if (!shouldAnimationReset) return;

      resetSplitAnimation();
      // Recreate split text when element leaves viewport
      splitter = getSplitter();
    };

    /**
     * Set up split text and intersection observers
     */
    const initSplitSetup = () => {
      // Create initial split text setup
      splitter = getSplitter();

      // Create observer to detect when element enters viewport
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              onEnter();
              // If animation doesn't restart, we don't need to observe anymore
              if (shouldAnimationReset) return;
              revealObserver.unobserve(entry.target);
            }
          }
        },
        {
          threshold: viewThreshold, // How much of element must be visible
        }
      );
      revealObserver.observe(charRevealParentEl);

      let resetObserver: IntersectionObserver | undefined = undefined;

      // For restart animations, create observer to detect when element leaves viewport
      if (shouldAnimationReset) {
        resetObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) return;
              onLeave();
            }
          },
          {
            threshold: 0,
          }
        );
        resetObserver.observe(charRevealParentEl);
      }

      return {
        splitText: splitter,
        revealObserver,
        resetObserver,
      };
    };

    splitSetupInitializers.push(initSplitSetup);
  }

  // Initialize based on whether page has a loader
  if (barbaInstance) {
    barbaInstance.hooks.afterOnce(() => {
      document.fonts.ready.then(() => {
        executeSplitSetupInitializers();
      });
    });
  } else if (doesLoaderExist) {
    // If page has loader, wait for both loader and fonts before initializing
    window.addEventListener("load", async () => {
      const fontsReadyPromise = document.fonts.ready;
      const loaderPromise = wait(loaderDuration);
      await Promise.all([fontsReadyPromise, loaderPromise]);
      executeSplitSetupInitializers();
    });
  } else {
    // Otherwise just wait for fonts to be ready
    document.fonts.ready.then(() => {
      executeSplitSetupInitializers();
    });
  }
};

const destroyTextReveal = () => {
  for (const instance of textRevealInstances) {
    if (instance.splitText) {
      instance.splitText.revert();
      instance.splitText = undefined;
    }
    if (instance.revealObserver) {
      instance.revealObserver.disconnect();
      instance.revealObserver = undefined;
    }
    if (instance.resetObserver) {
      instance.resetObserver.disconnect();
      instance.resetObserver = undefined;
    }
  }
  textRevealInstances = [];
};

afterWebflowReady(() => {
  initTextReveal();

  // @ts-expect-error no types
  window.wfCustomPageLoadFeatures ||= [];
  // @ts-expect-error no types
  window.wfCustomPageLoadFeatures.push({
    name: "TextRevealAnimations",
    init: initTextReveal,
    destroy: destroyTextReveal,
    reInit: () => {
      destroyTextReveal();
      initTextReveal();
    },
    isInitialized: true,
    getData: () => {
      return {
        textRevealInstances,
      };
    },
  });
});
