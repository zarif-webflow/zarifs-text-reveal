import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SplitType from 'split-type';

import { selectors } from '@/utils/constants';
import { gsap } from '@/utils/gsap';
import type { GsapTweenVars } from '@/utils/types';
import { getAnimationValues } from '@/utils/valueGetters';

const charRevealElements = document.querySelectorAll<HTMLElement>(selectors.revealType);
const loaderDuration = Number.parseInt(document.body.dataset.loaderDuration ?? '');

(async () => {
  for (let i = 0; i < charRevealElements.length; i++) {
    const charRevealEl = charRevealElements[i]!;

    const charRevealParentEl =
      charRevealEl.closest<HTMLElement>(selectors.revealParent) || charRevealEl;
    const resetAnimationParent = charRevealEl.closest<HTMLElement>(selectors.resetAnimation);
    console.log(resetAnimationParent, 'Reset Animation Parent');
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

    const split = SplitText.create(charRevealEl, {
      type: 'words',
      autoSplit: true,
      mask: 'words',
      onSplit: (split) => {
        const tl = gsap.timeline();

        tl.set(split.words, {
          opacity: fromOpacity || '0.08',
          x: fromX || '0%',
          y: fromY || '100%',
        }).add('start');

        tl.to(split.words, { opacity: '1', x: '0%', y: '0%', stagger: 0.1 }).add('end');
        tl.pause();

        const scroll = ScrollTrigger.create({
          trigger: charRevealParentEl,
          onEnter: () => tl.restart(),
          onEnterBack: shouldAnimationRestart ? () => tl.restart() : undefined,
          onLeave: shouldAnimationRestart ? () => tl.progress(0.01) : undefined,
          once: !shouldAnimationRestart,
        });
      },
    });
  }
})();
