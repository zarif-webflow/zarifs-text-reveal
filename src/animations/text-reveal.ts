import SplitType from 'split-type';

import { assert } from '@/utils/common';
import { selectors } from '@/utils/constants';
import { gsap } from '@/utils/gsap';
import type { GsapTweenVars } from '@/utils/types';
import { getAnimationValues } from '@/utils/valueGetters';

const charRevealElements = document.querySelectorAll<HTMLElement>(selectors.revealType);
const loaderDuration = Number.parseInt(document.body.dataset.loaderDuration ?? '');

(async () => {
  for (let i = 0; i < charRevealElements.length; i++) {
    const charRevealEl = assert(charRevealElements[i], `${selectors.revealType} not found!`);

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

    const charElements = [...charRevealEl.querySelectorAll<HTMLElement>('.char')];

    const targetElements =
      (revealType === 'lines' || revealType === 'words' ? wordElements : charElements) || [];

    const tweenProps: GsapTweenVars = {
      delay,
      stagger: staggerDelay,
      ease: easing,
      duration,
    };

    const getAnimationProps = (
      transition: boolean = false,
      overwrite?: boolean | 'auto' | undefined
    ) => {
      let animationsProps: GsapTweenVars = { overwrite };

      if (animationType === 'from-bottom') {
        animationsProps.yPercent = 100;
        animationsProps.duration = transition ? duration : 0;
      }

      if (animationType === 'from-top') {
        animationsProps.yPercent = -100;
        animationsProps.duration = transition ? duration : 0;
      }

      if (animationType === 'fade-from-bottom-left') {
        animationsProps.y = fromY || '30%';
        animationsProps.x = fromX || '-50px';
        animationsProps.opacity = fromOpacity || '0.05';
        animationsProps.duration = transition ? duration : 0;
      }

      return animationsProps;
    };

    gsap.to(targetElements, getAnimationProps(false, 'auto'));

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

    const shouldAnimationReset = resetAnimationParent !== null;

    const targetObserverElement = charRevealParentEl || charRevealEl;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
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
                    overwrite: 'auto',
                  });
                }
              }
            } else {
              gsap.to(targetElements, {
                ...tweenProps,
                y: 0,
                yPercent: 0,
                x: 0,
                opacity: 1,
                overwrite: 'auto',
              });
            }

            if (!shouldAnimationReset) {
              revealObserver.unobserve(entry.target);
            }
          }
        }
      },
      {
        threshold: viewThreshold,
      }
    );

    let resetObserver: IntersectionObserver | undefined = undefined;

    if (shouldAnimationReset) {
      resetObserver = new IntersectionObserver(
        (entries) => {
          // eslint-disable-next-line
          for (const entry of entries) {
            if (entry.isIntersecting) return;
            gsap.to(targetElements, getAnimationProps(false, true));
          }
        },
        { threshold: 0 }
      );
    }

    window.addEventListener('load', () => {
      if (!Number.isNaN(loaderDuration)) {
        setTimeout(() => {
          revealObserver.observe(targetObserverElement);
          resetObserver?.observe(targetObserverElement);
        }, loaderDuration);
      } else {
        revealObserver.observe(targetObserverElement);
        resetObserver?.observe(targetObserverElement);
      }
    });
  }
})();
