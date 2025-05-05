import { wait } from '@finsweet/ts-utils';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { selectors } from '@/utils/constants';
import { gsap } from '@/utils/gsap';
import type { GsapTweenVars } from '@/utils/types';
import { getAnimationValues } from '@/utils/valueGetters';

// All the target split animation elements
const charRevealElements = document.querySelectorAll<HTMLElement>(selectors.revealType);
// Page Loader duration if there is Any
const loaderDuration = Number.parseInt(document.body.dataset.loaderDuration ?? '');
const doesLoaderExist = !Number.isNaN(loaderDuration);

type Timeline = gsap.core.Timeline;

const init = () => {
  for (let i = 0; i < charRevealElements.length; i++) {
    // Target Reveal Element
    const charRevealEl = charRevealElements[i]!;

    // Target's Common Parent Element
    const charRevealParentEl =
      charRevealEl.closest<HTMLElement>(selectors.revealParent) || charRevealEl;
    // Target's Parent Element for Resetting the Animation
    const resetAnimationParent = charRevealEl.closest<HTMLElement>(selectors.resetAnimation);
    const shouldAnimationRestart = resetAnimationParent !== null;

    // All Target Data Properties
    const {
      animationType,
      delay,
      duration,
      easing,
      revealType,
      staggerDelay,
      fromX,
      fromY,
      fromOpacity,
      viewThreshold,
    } = getAnimationValues(charRevealEl, undefined, charRevealParentEl);

    let initialAnimationProps: GsapTweenVars = {};
    let finalAnimationProps: GsapTweenVars = {};

    if (animationType === 'from-bottom') {
      initialAnimationProps.y = '100%';

      finalAnimationProps.y = '0%';
    } else if (animationType === 'from-top') {
      initialAnimationProps.y = '-100%';

      finalAnimationProps.y = '0%';
    } else if (animationType === 'fade-from-bottom-left') {
      initialAnimationProps.y = fromY || '30%';
      initialAnimationProps.x = fromX || '-50px';
      initialAnimationProps.opacity = fromOpacity || '0.05';

      finalAnimationProps.y = '0%';
      finalAnimationProps.x = '0%';
      finalAnimationProps.opacity = '1';
    }

    finalAnimationProps.delay = delay;
    finalAnimationProps.duration = duration;
    finalAnimationProps.ease = easing;
    finalAnimationProps.stagger = staggerDelay;

    // Stored GSAP and Split Elements
    let ctx: gsap.Context | undefined = undefined;
    let tl: Timeline | undefined = undefined;
    let splitter: globalThis.SplitText | undefined = undefined;
    let splittedElements: Element[] | undefined = undefined;

    // Destroys the Animation Timeline
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

    // Initializes The Animation Timeline
    const initTimeline = () => {
      ctx = gsap.context(() => {
        tl = gsap.timeline({ paused: true });

        tl.set(splittedElements!, initialAnimationProps).add('start');

        tl.to(splittedElements!, finalAnimationProps).add('end');

        // To show tl "Start" state
        tl.progress(0.001);
      });
    };

    // For Resetting the entire split animation
    const resetSplitAnimation = () => {
      destroyTimeline();
      splitter?.revert();
    };

    // For initializing the splitter element
    const getSplitter = () => {
      const splitter = SplitText.create(charRevealEl, {
        type: revealType === 'chars' ? 'words, chars' : revealType,
        autoSplit: true,
        // No mask if fade-from-bottom-left
        mask:
          animationType === 'fade-from-bottom-left'
            ? undefined
            : revealType === 'chars'
              ? 'words'
              : revealType,
        smartWrap: true,
        // Words Class. It should have width=max-content
        wordsClass: 'split-word',
        onSplit: (split) => {
          splittedElements = split[revealType];
          initTimeline();
        },
      });
      // For fixing the initial splash before javascript loads. The following css should be active.
      /*
      [data-reveal-type]:not([data-initialized]) {
        visibility: hidden;
      }
      */
      charRevealEl.dataset.initialized = '';
      return splitter;
    };

    const onEnter = () => {
      if (!tl) return;

      // After the animation completes, it will revert to original state
      tl.restart(true).then(() => {
        resetSplitAnimation();
      });
    };
    const onEnterBack = () => {
      if (!shouldAnimationRestart || !tl) return;

      // After the animation completes, it will revert to original state
      tl.restart(true).then(() => {
        resetSplitAnimation();
      });
    };
    const onLeave = () => {
      if (!shouldAnimationRestart) return;
      resetSplitAnimation();
      // Create the split animation again upon leaving the viewport
      splitter = getSplitter();
    };

    const initSplitSetup = () => {
      // Initial Split Animation Setup
      splitter = getSplitter();

      // Scroll Trigger Setup for triggering the reveal animations
      ScrollTrigger.create({
        trigger: charRevealParentEl,
        onEnter: onEnter,
        onEnterBack: onEnterBack,
        onLeave: onLeave,
        once: !shouldAnimationRestart,
        start: `${Math.ceil(viewThreshold * 100)}% bottom`,
      });
    };

    if (doesLoaderExist) {
      // Wait for loader and fonts to finish, then setup the animation
      window.addEventListener('load', async () => {
        const fontsReadyPromise = document.fonts.ready;
        const loaderPromise = wait(loaderDuration);
        await Promise.all([fontsReadyPromise, loaderPromise]);
        initSplitSetup();
      });
    } else {
      document.fonts.ready.then(() => {
        initSplitSetup();
      });
    }
  }
};

init();
