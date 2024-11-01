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

  const initNavbarBgToggle = () => {
    const navbar = document.querySelector<HTMLDivElement>('[data-navbar]');

    if (!navbar) return;

    const interSectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            navbar?.classList.add('below--top');
          } else {
            navbar?.classList.remove('below--top');
          }
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    interSectionObserver.observe(document.body);
  };

  initNavbarBgToggle();
};

init();
