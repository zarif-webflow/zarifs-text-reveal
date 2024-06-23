import Lenis from 'lenis';

import { selectors } from '@/utils/constants';

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: 'vertical',
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const scrollTogglers = [...document.querySelectorAll(selectors.toggleScroll)] as HTMLElement[];

for (let i = 0; i < scrollTogglers.length; i++) {
  const scrollToggleElement = scrollTogglers[i];

  scrollToggleElement.addEventListener('click', () => {
    if (scrollToggleElement.classList.contains('stop-scroll')) {
      lenis.start();
      scrollToggleElement.classList.remove('stop-scroll');
      return;
    }
    lenis.stop();
    scrollToggleElement.classList.add('stop-scroll');
  });
}
