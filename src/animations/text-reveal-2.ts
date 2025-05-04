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

    const charRevealParentEl = charRevealEl.closest<HTMLElement>(selectors.revealParent);
    const resetAnimationParent = charRevealEl.closest<HTMLElement>(selectors.resetAnimation);

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
        return gsap.from(split.words, { yPercent: 100, stagger: 0.1 });
      },
    });
  }
})();
