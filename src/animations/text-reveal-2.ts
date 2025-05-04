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

    let tl: Timeline | undefined = undefined;
    let scrollTrig: globalThis.ScrollTrigger | undefined = undefined;

    const split = SplitText.create(charRevealEl, {
      type: revealType === 'chars' ? 'words, chars' : revealType,
      autoSplit: true,
      mask: revealType,
      smartWrap: true,
      onSplit: (split) => {
        const splittedElements = split[revealType];

        if (tl !== undefined) {
          tl.kill();
          tl.clear();
          tl = undefined;
        }

        if (scrollTrig !== undefined) {
          scrollTrig.kill(true);
          scrollTrig = undefined;
        }

        const initTimeline = () => {
          const tl = gsap.timeline();

          tl.set(splittedElements, {
            opacity: fromOpacity || '0.08',
            x: fromX || '0%',
            y: fromY || '100%',
          }).add('start');

          tl.to(splittedElements, {
            opacity: '1',
            x: '0%',
            y: '0%',
            stagger: 0.05,
            delay: 0.2,
          }).add('end');
          tl.pause();
          return tl;
        };

        tl = initTimeline();

        const onEnter = () => {
          tl!.restart(true).then(() => {
            if (!shouldAnimationRestart) split.revert();
          });
        };
        const onEnterBack = () => {
          if (!shouldAnimationRestart) return;

          tl!.restart(true).then(() => {
            if (!shouldAnimationRestart) split.revert();
          });
        };
        const onLeave = () => {
          if (!shouldAnimationRestart) return;

          tl!.progress(0.001);
        };

        scrollTrig = ScrollTrigger.create({
          trigger: charRevealParentEl,
          onEnter: onEnter,
          onEnterBack: onEnterBack,
          onLeave: onLeave,
          once: !shouldAnimationRestart,
        });
      },
    });
  }
})();
