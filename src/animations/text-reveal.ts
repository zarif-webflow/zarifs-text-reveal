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
    fromOpacity,
    viewThreshold,
  } = getAnimationValues(charRevealEl);

  const splitText = SplitType.create(charRevealEl, { types: 'words,chars' });

  const initialWordElements = splitText.words || [];
  const wordElements: HTMLElement[] = [];

  for (let j = 0; j < initialWordElements.length; j++) {
    const el = initialWordElements[j];

    const parentEl = document.createElement('span');
    const cloneEl = el.cloneNode(true) as HTMLElement;

    parentEl.classList.add('reveal-parent');
    parentEl.appendChild(cloneEl);
    el.replaceWith(parentEl);
    wordElements.push(cloneEl);
  }

  const charElements = [...charRevealEl.querySelectorAll('.char')] as HTMLElement[];
  // const lineElements = [...charRevealEl.querySelectorAll('.line')] as HTMLElement[];

  const targetElements =
    (revealType === 'lines' || revealType === 'words' ? wordElements : charElements) || [];

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
    gsap.set(targetElements, { yPercent: -100 });
  }
  if (animationType === 'fade-from-bottom-left') {
    gsap.set(targetElements, {
      y: fromY || '30%',
      x: fromX || '-50px',
      opacity: fromOpacity || '0.05',
    });
  }

  let allLines: HTMLElement[][] = [];
  if (revealType === 'lines') {
    let currentLineTopRect = 0;
    let currentLineWords: HTMLElement[] = [];
    const resOb = new ResizeObserver((entries) => {
      for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
        for (let k = 0; k < wordElements.length; k++) {
          const wordElement = wordElements[k];
          const wordTopRect = wordElement.getBoundingClientRect().top;

          if (wordTopRect === currentLineTopRect) {
            currentLineWords.push(wordElement);
          } else {
            currentLineTopRect = wordTopRect;
            currentLineWords.length > 0 && allLines.push(currentLineWords);
            currentLineWords = [wordElement];
          }
        }
        allLines.push(currentLineWords);
      }
    });

    resOb.observe(charRevealEl);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (revealType === 'lines' && allLines.length > 0) {
            for (let i = 0; i < allLines.length; i++) {
              const line = allLines[i];
              for (let j = 0; j < line.length; j++) {
                const delayPropValue = (tweenProps.delay as number) || 0;
                const staggerPropValue = (tweenProps.stagger as number) || 0;

                const delay = delayPropValue + i * staggerPropValue;

                const word = line[j];
                gsap.to(word, {
                  ...tweenProps,
                  y: 0,
                  yPercent: 0,
                  x: 0,
                  opacity: 1,
                  delay,
                  stagger: 0,
                });
              }
            }
          } else {
            gsap.to(targetElements, { ...tweenProps, y: 0, yPercent: 0, x: 0, opacity: 1 });
          }
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
