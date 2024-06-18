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

  const {
    animationType,
    delay,
    duration,
    easing,
    revealType,
    staggerDelay,
    fromX,
    fromY,
    viewThreshold,
  } = getAnimationValues(charRevealEl);

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

  const tweenProps: GsapTweenVars = {
    delay,
    stagger: staggerDelay,
    ease: easing,
    duration,
  };

  if (animationType === 'from-bottom') {
    gsap.set(targetElements, { yPercent: 100 });
  }
  if (animationType === 'from-top') {
    gsap.set(targetElements, { yPercent: 100 });
  }
  if (animationType === 'fade-from-bottom-left') {
    gsap.set(targetElements, { y: fromY || '30%', x: fromX || '-50px', opacity: 0.05 });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(targetElements, { ...tweenProps, y: 0, yPercent: 0, x: 0, opacity: 1 });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: viewThreshold,
    }
  );

  observer.observe(charRevealParentEl || charRevealEl);
}
