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

  const scriptTagElement = getActiveScript();

  if (!scriptTagElement) return;

  const globalInactiveColor = scriptTagElement.getAttribute(PROPERTIES.inactiveColor);
  const globalActiveColor = scriptTagElement.getAttribute(PROPERTIES.activeColor);

  const createLineAnimationTL = (lineElement: HTMLElement): LineAnimationTL => {
    let tl: ReturnType<GSAPType["timeline"]> | undefined = undefined;
    let ctx: ReturnType<GSAPType["context"]> | undefined = gsap.context(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: lineElement,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
      tl.from(lineElement, { "--line-width": 0, duration: 1 });
    });
    return {
      tl: tl!,
      destroy: () => {
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
      SplitText.create(lineScrollElement, {
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

    initSplitAnimation();
  }
};

afterWebflowReady(() => {
  lineScrollInit();
});
