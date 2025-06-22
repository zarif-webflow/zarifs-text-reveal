import "./line-scroll-color-mask.css";

import {
  afterWebflowReady,
  getGsap,
  getHtmlElement,
  getMultipleHtmlElements,
  type GSAPType,
} from "@taj-wf/utils";

const PROPERTIES = {
  element: "line-scroll-color-mask",
  inactiveColor: "line-scroll-inactive-color",
  activeColor: "line-scroll-active-color",
};

type LineAnimationTL = {
  tl: gsap.core.Timeline;
  destroy: () => void;
};

const getActiveScript = () => {
  const currentModuleUrl = import.meta.url;
  return getHtmlElement<HTMLScriptElement>({
    selector: `script[src="${currentModuleUrl}"]`,
  });
};

let allSplitAnimationInstances: {
  splitText: SplitText | undefined;
  tls: LineAnimationTL[] | undefined;
}[] = [];

const destroyLineScrollInstances = () => {
  for (const instance of allSplitAnimationInstances) {
    if (instance.splitText) {
      instance.splitText.revert();
      instance.splitText = undefined;
    }
    if (instance.tls) {
      for (const tlObj of instance.tls) {
        tlObj.destroy();
      }
      instance.tls = undefined;
    }
  }
  allSplitAnimationInstances = [];
};

const lineScrollInit = () => {
  const lineScrollElements = getMultipleHtmlElements({ selector: `[${PROPERTIES.element}]` });

  if (!lineScrollElements) return;

  const [gsap, SplitText, ScrollTrigger] = getGsap(["SplitText", "ScrollTrigger"]);

  if (!gsap) return;

  if (!SplitText) {
    console.error("SplitText plugin script is not loaded");
    return;
  }

  if (!ScrollTrigger) {
    console.error("Scroll trigger plugin script is not loaded");
    return;
  }

  gsap.registerPlugin(SplitText, ScrollTrigger);

  const scriptTagElement = getActiveScript();

  if (!scriptTagElement) return;

  const globalInactiveColor = scriptTagElement.getAttribute(PROPERTIES.inactiveColor);
  const globalActiveColor = scriptTagElement.getAttribute(PROPERTIES.activeColor);
  const createLineAnimationTL = (lineElement: HTMLElement): LineAnimationTL => {
    let tl: ReturnType<GSAPType["timeline"]> | undefined = undefined;
    let scrollTrigger: ScrollTrigger | undefined = undefined;
    let ctx: ReturnType<GSAPType["context"]> | undefined = gsap.context(() => {
      tl = gsap.timeline();
      tl.from(lineElement, { "--line-width": 0, duration: 1 });

      scrollTrigger = ScrollTrigger.create({
        trigger: lineElement,
        start: "top 60%",
        end: "bottom 60%",
        scrub: 1,
        animation: tl,
      });
    });
    return {
      tl: tl!,
      destroy: () => {
        scrollTrigger?.kill();
        scrollTrigger = undefined;
        tl?.revert();
        tl = undefined;
        ctx?.revert();
        ctx = undefined;
      },
    };
  };

  for (const lineScrollElement of lineScrollElements) {
    let animationTlArr: LineAnimationTL[] = [];
    let splittedLines: HTMLElement[] = [];

    const inactiveColor =
      lineScrollElement.getAttribute(PROPERTIES.inactiveColor) || globalInactiveColor;
    const activeColor = lineScrollElement.getAttribute(PROPERTIES.activeColor) || globalActiveColor;

    const initSplitAnimation = () => {
      return SplitText.create(lineScrollElement, {
        type: "lines",
        autoSplit: true,
        linesClass: "line-scroll-splitted-line",
        onSplit: (split) => {
          if (animationTlArr.length > 0) {
            for (const tlObj of animationTlArr) {
              tlObj.destroy();
            }
            animationTlArr = [];
          }
          splittedLines = split["lines"] as HTMLElement[];
          for (const lineElement of splittedLines) {
            if (inactiveColor) {
              lineElement.style.setProperty("--inactive-color", inactiveColor);
            }

            if (activeColor) {
              lineElement.style.setProperty("--active-color", activeColor);
            }
            const lineAnimationTl = createLineAnimationTL(lineElement);
            animationTlArr.push(lineAnimationTl);
          }
        },
      });
    };

    const splitText = initSplitAnimation();

    allSplitAnimationInstances.push({ splitText, tls: animationTlArr });
  }
};

afterWebflowReady(() => {
  lineScrollInit();

  // @ts-expect-error no types
  window.wfCustomPageLoadFeatures ||= [];
  // @ts-expect-error no types
  window.wfCustomPageLoadFeatures.push({
    name: "LineScrollColorMask",
    init: lineScrollInit,
    destroy: destroyLineScrollInstances,
    reInit: () => {
      destroyLineScrollInstances();
      lineScrollInit();
    },
    isInitialized: true,
    getData: () => {
      return {
        allSplitAnimationInstances,
      };
    },
  });
});
