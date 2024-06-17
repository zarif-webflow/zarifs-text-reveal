import SplitType from 'split-type';

import { assert } from '@/utils/common';
import { selectors } from '@/utils/constants';
import { gsap } from '@/utils/gsap';
import type { GsapTweenVars } from '@/utils/types';
import { getAnimationValues } from '@/utils/valueGetters';

const charRevealElements = document.querySelectorAll(selectors.revealType);

for (let i = 0; i < charRevealElements.length; i++) {
  const charRevealEl = assert(
    charRevealElements[i],
    `${selectors.revealType} not found!`
  ) as HTMLElement;

  const charRevealParentEl = charRevealEl.closest(selectors.revealParent) as HTMLElement | null;

  const { animationType, delay, duration, easing, revealType, staggerDelay, fromX, fromY } =
    getAnimationValues(charRevealEl);

  const splitText = SplitType.create(charRevealEl);

  let targetElements =
    (revealType === 'lines'
      ? splitText.lines
      : revealType === 'words'
        ? splitText.words
        : splitText.chars) || [];

  if (revealType === 'lines') {
    const updatedTargetElements: HTMLElement[] = [];
    for (let j = 0; j < targetElements.length; j++) {
      const el = targetElements[j];

      const parentEl = document.createElement('div');
      const cloneEl = el.cloneNode(true) as HTMLElement;

      parentEl.classList.add('line-parent');
      parentEl.appendChild(cloneEl);
      el.replaceWith(parentEl);
      updatedTargetElements.push(cloneEl);
    }
    targetElements = updatedTargetElements;
  }

  let tweenProps: GsapTweenVars = {
    delay,
    stagger: staggerDelay,
    ease: easing,
    duration,
    scrollTrigger: {
      trigger: charRevealParentEl || charRevealEl,
      start: 'top center',
    },
  };

  if (animationType === 'from-bottom') {
    tweenProps = { ...tweenProps, yPercent: 100 };
  }
  if (animationType === 'from-top') {
    tweenProps = { ...tweenProps, yPercent: 100 };
  }
  if (animationType === 'fade-from-bottom-left') {
    tweenProps = { ...tweenProps, y: fromY || '30%', x: fromX || '-50px', opacity: 0.05 };
  }

  gsap.from(targetElements, tweenProps);
}

// const charRevealParentEl = assert(
//   charRevealEl.closest(selectors.revealParent),
//   `${selectors.revealParent} not found!`
// ) as HTMLElement;
