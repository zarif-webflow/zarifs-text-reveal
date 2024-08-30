import { ScrollDirectionManager } from '@/utils/scroll-direction-manager';

const init = () => {
  const navbar = document.querySelector<HTMLDivElement>('[data-navbar]');

  if (!navbar) return;

  const parsedInitialOffset = Number.parseFloat(navbar.dataset.initialOffset || '');
  const initialOffset = Number.isNaN(parsedInitialOffset) ? 1 : parsedInitialOffset;

  new ScrollDirectionManager({
    initialOffset,
    onDirectionChange: (direction) => {
      if (direction === 'up' || direction === 'initial') {
        navbar.classList.remove('hide-navbar');
        return;
      }
      navbar.classList.add('hide-navbar');
    },
  });
};

init();
