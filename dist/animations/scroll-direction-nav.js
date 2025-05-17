"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/scroll-direction-manager.ts
  var ScrollDirectionManager = class {
    constructor({ initialOffset, onDirectionChange }) {
      this.onDirectionChange = void 0;
      this.scrollDirection = "initial";
      this.initialOffset = 120;
      this.removeListener = void 0;
      this.setupSubscriptions = () => {
        window.addEventListener("scroll", this.handleScrollDirection);
        this.removeListener = () => window.removeEventListener("scroll", this.handleScrollDirection);
      };
      this.handleScrollDirection = () => {
        const position = window.scrollY;
        let direction = "initial";
        if (position > this.initialOffset) {
          if (position < this.scrollPosition) {
            direction = "up";
          } else {
            direction = "down";
          }
        }
        if (direction !== this.scrollDirection) {
          this.onDirectionChange?.(direction);
        }
        this.scrollPosition = position;
        this.scrollDirection = direction;
      };
      this.scrollPosition = 0;
      if (initialOffset)
        this.initialOffset = initialOffset;
      this.onDirectionChange = onDirectionChange;
      this.setupSubscriptions();
    }
    dispose() {
      this.removeListener?.();
    }
  };

  // src/animations/scroll-direction-nav.ts
  var init = () => {
    const navbar = document.querySelector("[data-navbar]");
    if (!navbar)
      return;
    const parsedInitialOffset = Number.parseFloat(navbar.dataset.initialOffset || "");
    const initialOffset = Number.isNaN(parsedInitialOffset) ? 1 : parsedInitialOffset;
    new ScrollDirectionManager({
      initialOffset,
      onDirectionChange: (direction) => {
        if (direction === "up" || direction === "initial") {
          navbar.classList.remove("hide-navbar");
          return;
        }
        navbar.classList.add("hide-navbar");
      }
    });
    const initNavbarBgToggle = () => {
      const navbar2 = document.querySelector("[data-navbar]");
      if (!navbar2)
        return;
      const interSectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              navbar2?.classList.add("below--top");
            } else {
              navbar2?.classList.remove("below--top");
            }
          }
        },
        {
          root: null,
          threshold: 0.1
        }
      );
      interSectionObserver.observe(document.body);
    };
    initNavbarBgToggle();
  };
  init();
})();
//# sourceMappingURL=scroll-direction-nav.js.map
