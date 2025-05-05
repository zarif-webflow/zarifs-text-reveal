import { wait } from '@finsweet/ts-utils';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { selectors } from '@/utils/constants';
import { gsap } from '@/utils/gsap';
import type { GsapTweenVars } from '@/utils/types';
import { getAnimationValues } from '@/utils/valueGetters';

const charRevealElements = document.querySelectorAll<HTMLElement>(selectors.revealType);
const loaderDuration = Number.parseInt(document.body.dataset.loaderDuration ?? '');

type Timeline = gsap.core.Timeline;

const init = () => {
  for (let i = 0; i < charRevealElements.length; i++) {
    const charRevealEl = charRevealElements[i]!;

    const charRevealParentEl =
      charRevealEl.closest<HTMLElement>(selectors.revealParent) || charRevealEl;
    const resetAnimationParent = charRevealEl.closest<HTMLElement>(selectors.resetAnimation);
    const shouldAnimationRestart = resetAnimationParent !== null;

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

    let ctx: gsap.Context | undefined = undefined;
    let tl: Timeline | undefined = undefined;
    let splitter: globalThis.SplitText | undefined = undefined;
    let splittedElements: Element[] | undefined = undefined;

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

    const initTimeline = () => {
      ctx = gsap.context(() => {
        tl = gsap.timeline({ paused: true });

        tl.set(splittedElements!, initialAnimationProps).add('start');

        tl.to(splittedElements!, finalAnimationProps).add('end');

        tl.progress(0.001);
      });
    };

    const resetSplitAnimation = () => {
      destroyTimeline();
      splitter?.revert();
    };

    const getSplitter = () => {
      const splitter = SplitText.create(charRevealEl, {
        type: revealType === 'chars' ? 'words, chars' : revealType,
        autoSplit: true,
        mask:
          animationType === 'fade-from-bottom-left'
            ? undefined
            : revealType === 'chars'
              ? 'words'
              : revealType,
        smartWrap: true,
        wordsClass: 'split-word',
        onSplit: (split) => {
          splittedElements = split[revealType];
          initTimeline();
        },
      });
      charRevealEl.dataset.initialized = '';
      return splitter;
    };

    const onEnter = () => {
      if (!tl) return;

      tl.restart(true).then(() => {
        resetSplitAnimation();
      });
    };
    const onEnterBack = () => {
      if (!shouldAnimationRestart || !tl) return;

      tl.restart(true).then(() => {
        resetSplitAnimation();
      });
    };
    const onLeave = () => {
      if (!shouldAnimationRestart) return;
      resetSplitAnimation();
      splitter = getSplitter();
    };

    const initSplitSetup = () => {
      splitter = getSplitter();

      ScrollTrigger.create({
        trigger: charRevealParentEl,
        onEnter: onEnter,
        onEnterBack: onEnterBack,
        onLeave: onLeave,
        once: !shouldAnimationRestart,
        start: `${Math.ceil(viewThreshold * 100)}% bottom`,
      });
    };

    if (!Number.isNaN(loaderDuration)) {
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
