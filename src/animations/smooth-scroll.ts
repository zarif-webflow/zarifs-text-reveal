import { preventBodyScroll } from '@zag-js/remove-scroll';
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
const scrollStartTriggers = [...document.querySelectorAll(selectors.startScroll)] as HTMLElement[];
const scrollStopTriggers = [...document.querySelectorAll(selectors.stopScroll)] as HTMLElement[];

let resetScroll: (() => void) | undefined = undefined;

for (let i = 0; i < scrollTogglers.length; i++) {
  const scrollToggleElement = scrollTogglers[i];

  scrollToggleElement.addEventListener('click', () => {
    if (scrollToggleElement.classList.contains('stop-scroll')) {
      resetScroll?.();
      lenis.start();
      scrollToggleElement.classList.remove('stop-scroll');
      return;
    }
    resetScroll = preventBodyScroll();
    lenis.stop();
    scrollToggleElement.classList.add('stop-scroll');
  });
}

for (const startTrigger of scrollStartTriggers) {
  startTrigger.addEventListener('click', () => {
    lenis.start();
    resetScroll?.();
  });
}

for (const stopTrigger of scrollStopTriggers) {
  stopTrigger.addEventListener('click', () => {
    lenis.stop();
    resetScroll = preventBodyScroll();
  });
}
