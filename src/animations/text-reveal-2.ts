import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { selectors } from '@/utils/constants';
import { gsap } from '@/utils/gsap';
import type { GsapTweenVars } from '@/utils/types';
import { getAnimationValues } from '@/utils/valueGetters';

const charRevealElements = document.querySelectorAll<HTMLElement>(selectors.revealType);
const loaderDuration = Number.parseInt(document.body.dataset.loaderDuration ?? '');

type Timeline = gsap.core.Timeline;

(async () => {
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
    } = getAnimationValues(charRevealEl);

    let ctx: gsap.Context | undefined = undefined;

    let tl: Timeline | undefined = undefined;
    let splitter: globalThis.SplitText | undefined = undefined;
    let splittedElements: Element[] | undefined = undefined;

    const commonSplitProps: SplitText.Vars = {
      type: revealType === 'chars' ? 'words, chars' : revealType,
      autoSplit: true,
      mask: revealType === 'chars' ? 'words' : revealType,
      smartWrap: true,
      wordsClass: 'split-word',
    };

    const destroyTimeline = () => {
      if (tl) {
        tl.revert();
        tl.kill();
        tl.clear();
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

        tl.set(splittedElements!, {
          opacity: fromOpacity || '0.08',
          x: fromX || '0%',
          y: fromY || '100%',
        }).add('start');

        tl.to(splittedElements!, {
          opacity: '1',
          x: '0%',
          y: '0%',
          stagger: 0.05,
          delay: 0.2,
        }).add('end');
      });
    };

    const resetSplitAnimation = () => {
      destroyTimeline();
      splitter?.revert();
    };

    const getSplitter = () => {
      return SplitText.create(charRevealEl, {
        ...commonSplitProps,
        onSplit: (split) => {
          splittedElements = split[revealType];

          initTimeline();
        },
      });
    };

    splitter = getSplitter();

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

    ScrollTrigger.create({
      trigger: charRevealParentEl,
      onEnter: onEnter,
      onEnterBack: onEnterBack,
      onLeave: onLeave,
      once: !shouldAnimationRestart,
    });
  }
})();
