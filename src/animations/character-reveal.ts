import anime from 'animejs';
import SplitType from 'split-type';

import { assert } from '@/utils/common';
import { selectors } from '@/utils/constants';

const charRevealElements = document.querySelectorAll(selectors.revealType);

for (let i = 0; i < charRevealElements.length; i++) {
  const charRevealEl = assert(
    charRevealElements[i],
    `${selectors.revealType} not found!`
  ) as HTMLElement;

  const { revealType } = charRevealEl.dataset;
  assert(revealType, `data-reveal-type not found`);

  const splitText = SplitType.create(charRevealEl);

  const targetElements =
    revealType === 'lines'
      ? splitText.lines
      : revealType === 'word'
        ? splitText.words
        : splitText.chars;

  assert(revealType, 'target split elements were not found!');

  anime({
    targets: assert(targetElements, 'Split chars not found!'),
    translateY: ['100%', '0%'],
    delay: anime.stagger(50),
    easing: 'easeOutQuint',
    duration: 800,
  });
}

// const charRevealParentEl = assert(
//   charRevealEl.closest(selectors.revealParent),
//   `${selectors.revealParent} not found!`
// ) as HTMLElement;
