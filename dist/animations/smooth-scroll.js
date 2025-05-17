"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // node_modules/.pnpm/@zag-js+dom-query@0.65.1/node_modules/@zag-js/dom-query/dist/index.mjs
  var isDom = () => typeof document !== "undefined";
  function getPlatform() {
    const agent = navigator.userAgentData;
    return agent?.platform ?? navigator.platform;
  }
  var pt = (v) => isDom() && v.test(getPlatform());
  var isIos = () => pt(/iP(hone|ad|od)|iOS/);
  var fps = 1e3 / 60;

  // node_modules/.pnpm/@zag-js+remove-scroll@0.65.1/node_modules/@zag-js/remove-scroll/dist/index.mjs
  var LOCK_CLASSNAME = "data-zag-scroll-lock";
  function assignStyle(el, style) {
    if (!el)
      return;
    const previousStyle = el.style.cssText;
    Object.assign(el.style, style);
    return () => {
      el.style.cssText = previousStyle;
    };
  }
  function setCSSProperty(el, property, value) {
    if (!el)
      return;
    const previousValue = el.style.getPropertyValue(property);
    el.style.setProperty(property, value);
    return () => {
      if (previousValue) {
        el.style.setProperty(property, previousValue);
      } else {
        el.style.removeProperty(property);
      }
    };
  }
  function getPaddingProperty(documentElement) {
    const documentLeft = documentElement.getBoundingClientRect().left;
    const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
    return scrollbarX ? "paddingLeft" : "paddingRight";
  }
  function preventBodyScroll(_document) {
    const doc = _document ?? document;
    const win = doc.defaultView ?? window;
    const { documentElement, body } = doc;
    const locked = body.hasAttribute(LOCK_CLASSNAME);
    if (locked)
      return;
    body.setAttribute(LOCK_CLASSNAME, "");
    const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
    const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
    const paddingProperty = getPaddingProperty(documentElement);
    const setStyle = () => assignStyle(body, {
      overflow: "hidden",
      [paddingProperty]: `${scrollbarWidth}px`
    });
    const setIOSStyle = () => {
      const { scrollX, scrollY, visualViewport } = win;
      const offsetLeft = visualViewport?.offsetLeft ?? 0;
      const offsetTop = visualViewport?.offsetTop ?? 0;
      const restoreStyle = assignStyle(body, {
        position: "fixed",
        overflow: "hidden",
        top: `${-(scrollY - Math.floor(offsetTop))}px`,
        left: `${-(scrollX - Math.floor(offsetLeft))}px`,
        right: "0",
        [paddingProperty]: `${scrollbarWidth}px`
      });
      return () => {
        restoreStyle?.();
        win.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      };
    };
    const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
    return () => {
      cleanups.forEach((fn) => fn?.());
      body.removeAttribute(LOCK_CLASSNAME);
    };
  }

  // node_modules/.pnpm/lenis@1.1.3/node_modules/lenis/dist/lenis.mjs
  function clamp(t2, e, i) {
    return Math.max(t2, Math.min(e, i));
  }
  var Animate = class {
    advance(t2) {
      if (!this.isRunning)
        return;
      let e = false;
      if (this.duration && this.easing) {
        this.currentTime += t2;
        const i = clamp(0, this.currentTime / this.duration, 1);
        e = i >= 1;
        const s = e ? 1 : this.easing(i);
        this.value = this.from + (this.to - this.from) * s;
      } else
        this.lerp ? (this.value = function damp(t3, e2, i, s) {
          return function lerp(t4, e3, i2) {
            return (1 - i2) * t4 + i2 * e3;
          }(t3, e2, 1 - Math.exp(-i * s));
        }(this.value, this.to, 60 * this.lerp, t2), Math.round(this.value) === this.to && (this.value = this.to, e = true)) : (this.value = this.to, e = true);
      e && this.stop(), this.onUpdate?.(this.value, e);
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t2, e, { lerp: i, duration: s, easing: o, onStart: n, onUpdate: r }) {
      this.from = this.value = t2, this.to = e, this.lerp = i, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = true, n?.(), this.onUpdate = r;
    }
  };
  var Dimensions = class {
    constructor({ wrapper: t2, content: e, autoResize: i = true, debounce: s = 250 } = {}) {
      this.wrapper = t2, this.content = e, i && (this.debouncedResize = /* @__PURE__ */ function debounce(t3, e2) {
        let i2;
        return function() {
          let s2 = arguments, o = this;
          clearTimeout(i2), i2 = setTimeout(function() {
            t3.apply(o, s2);
          }, e2);
        };
      }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
    }
    destroy() {
      this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
    }
    resize = () => {
      this.onWrapperResize(), this.onContentResize();
    };
    onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    };
    onContentResize = () => {
      this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    };
    get limit() {
      return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
    }
  };
  var Emitter = class {
    constructor() {
      this.events = {};
    }
    emit(t2, ...e) {
      let i = this.events[t2] || [];
      for (let t3 = 0, s = i.length; t3 < s; t3++)
        i[t3](...e);
    }
    on(t2, e) {
      return this.events[t2]?.push(e) || (this.events[t2] = [e]), () => {
        this.events[t2] = this.events[t2]?.filter((t3) => e !== t3);
      };
    }
    off(t2, e) {
      this.events[t2] = this.events[t2]?.filter((t3) => e !== t3);
    }
    destroy() {
      this.events = {};
    }
  };
  var t = 100 / 6;
  var VirtualScroll = class {
    constructor(t2, { wheelMultiplier: e = 1, touchMultiplier: i = 1 }) {
      this.element = t2, this.wheelMultiplier = e, this.touchMultiplier = i, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    on(t2, e) {
      return this.emitter.on(t2, e);
    }
    destroy() {
      this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    onTouchStart = (t2) => {
      const { clientX: e, clientY: i } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    };
    onTouchMove = (t2) => {
      const { clientX: e, clientY: i } = t2.targetTouches ? t2.targetTouches[0] : t2, s = -(e - this.touchStart.x) * this.touchMultiplier, o = -(i - this.touchStart.y) * this.touchMultiplier;
      this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = { x: s, y: o }, this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: t2 });
    };
    onTouchEnd = (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    };
    onWheel = (e) => {
      let { deltaX: i, deltaY: s, deltaMode: o } = e;
      i *= 1 === o ? t : 2 === o ? this.windowWidth : 1, s *= 1 === o ? t : 2 === o ? this.windowHeight : 1, i *= this.wheelMultiplier, s *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: i, deltaY: s, event: e });
    };
    onWindowResize = () => {
      this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
    };
  };
  var Lenis = class {
    constructor({ wrapper: t2 = window, content: e = document.documentElement, wheelEventsTarget: i = t2, eventsTarget: s = i, smoothWheel: o = true, syncTouch: n = false, syncTouchLerp: r = 0.075, touchInertiaMultiplier: l = 35, duration: h, easing: a = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: c = 0.1, infinite: u = false, orientation: d = "vertical", gestureOrientation: p = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = true, prevent: S = false, __experimental__naiveDimensions: w = false } = {}) {
      this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.direction = 0, this.onVirtualScroll = ({ deltaX: t3, deltaY: e2, event: i2 }) => {
        if (i2.ctrlKey)
          return;
        const s2 = i2.type.includes("touch"), o2 = i2.type.includes("wheel");
        this.isTouching = "touchstart" === i2.type || "touchmove" === i2.type;
        if (this.options.syncTouch && s2 && "touchstart" === i2.type && !this.isStopped && !this.isLocked)
          return void this.reset();
        const n2 = 0 === t3 && 0 === e2, r2 = "vertical" === this.options.gestureOrientation && 0 === e2 || "horizontal" === this.options.gestureOrientation && 0 === t3;
        if (n2 || r2)
          return;
        let l2 = i2.composedPath();
        l2 = l2.slice(0, l2.indexOf(this.rootElement));
        const h2 = this.options.prevent;
        if (l2.find((t4) => {
          var e3, i3, n3, r3, l3;
          return t4 instanceof Element && (("function" == typeof h2 ? null == h2 ? void 0 : h2(t4) : h2) || (null === (e3 = t4.hasAttribute) || void 0 === e3 ? void 0 : e3.call(t4, "data-lenis-prevent")) || s2 && (null === (i3 = t4.hasAttribute) || void 0 === i3 ? void 0 : i3.call(t4, "data-lenis-prevent-touch")) || o2 && (null === (n3 = t4.hasAttribute) || void 0 === n3 ? void 0 : n3.call(t4, "data-lenis-prevent-wheel")) || (null === (r3 = t4.classList) || void 0 === r3 ? void 0 : r3.contains("lenis")) && !(null === (l3 = t4.classList) || void 0 === l3 ? void 0 : l3.contains("lenis-stopped")));
        }))
          return;
        if (this.isStopped || this.isLocked)
          return void i2.preventDefault();
        if (!(this.options.syncTouch && s2 || this.options.smoothWheel && o2))
          return this.isScrolling = "native", void this.animate.stop();
        i2.preventDefault();
        let a2 = e2;
        "both" === this.options.gestureOrientation ? a2 = Math.abs(e2) > Math.abs(t3) ? e2 : t3 : "horizontal" === this.options.gestureOrientation && (a2 = t3);
        const c2 = s2 && this.options.syncTouch, u2 = s2 && "touchend" === i2.type && Math.abs(a2) > 5;
        u2 && (a2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + a2, Object.assign({ programmatic: false }, c2 ? { lerp: u2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
      }, this.onNativeScroll = () => {
        if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent)
          delete this.__preventNextNativeScrollEvent;
        else if (false === this.isScrolling || "native" === this.isScrolling) {
          const t3 = this.animatedScroll;
          this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t3, this.direction = Math.sign(this.animatedScroll - t3), this.isScrolling = "native", this.emit(), 0 !== this.velocity && (this.__resetVelocityTimeout = setTimeout(() => {
            this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
          }, 400));
        }
      }, window.lenisVersion = "1.1.3", t2 && t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: e, wheelEventsTarget: i, eventsTarget: s, smoothWheel: o, syncTouch: n, syncTouchLerp: r, touchInertiaMultiplier: l, duration: h, easing: a, lerp: c, infinite: u, gestureOrientation: p, orientation: d, touchMultiplier: m, wheelMultiplier: v, autoResize: g, prevent: S, __experimental__naiveDimensions: w }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: e, autoResize: g }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = false, this.isStopped = false, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.virtualScroll = new VirtualScroll(s, { touchMultiplier: m, wheelMultiplier: v }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
      this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
    }
    on(t2, e) {
      return this.emitter.on(t2, e);
    }
    off(t2, e) {
      return this.emitter.off(t2, e);
    }
    setScroll(t2) {
      this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
    }
    resize() {
      this.dimensions.resize();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
    }
    start() {
      this.isStopped && (this.isStopped = false, this.reset());
    }
    stop() {
      this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
    }
    raf(t2) {
      const e = t2 - (this.time || t2);
      this.time = t2, this.animate.advance(1e-3 * e);
    }
    scrollTo(t2, { offset: e = 0, immediate: i = false, lock: s = false, duration: o = this.options.duration, easing: n = this.options.easing, lerp: r = this.options.lerp, onStart: l, onComplete: h, force: a = false, programmatic: c = true, userData: u = {} } = {}) {
      if (!this.isStopped && !this.isLocked || a) {
        if ("string" == typeof t2 && ["top", "left", "start"].includes(t2))
          t2 = 0;
        else if ("string" == typeof t2 && ["bottom", "right", "end"].includes(t2))
          t2 = this.limit;
        else {
          let i2;
          if ("string" == typeof t2 ? i2 = document.querySelector(t2) : t2 instanceof HTMLElement && (null == t2 ? void 0 : t2.nodeType) && (i2 = t2), i2) {
            if (this.options.wrapper !== window) {
              const t3 = this.rootElement.getBoundingClientRect();
              e -= this.isHorizontal ? t3.left : t3.top;
            }
            const s2 = i2.getBoundingClientRect();
            t2 = (this.isHorizontal ? s2.left : s2.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t2 && (t2 += e, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = clamp(0, t2, this.limit), t2 !== this.targetScroll)) {
          if (this.userData = u, i)
            return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == h || h(this), void (this.userData = {});
          c || (this.targetScroll = t2), this.animate.fromTo(this.animatedScroll, t2, { duration: o, easing: n, lerp: r, onStart: () => {
            s && (this.isLocked = true), this.isScrolling = "smooth", null == l || l(this);
          }, onUpdate: (t3, e2) => {
            this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), e2 || this.emit(), e2 && (this.reset(), this.emit(), null == h || h(this), this.userData = {}, this.preventNextNativeScrollEvent());
          } });
        }
      }
    }
    preventNextNativeScrollEvent() {
      this.__preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
        delete this.__preventNextNativeScrollEvent;
      });
    }
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    get limit() {
      return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? function modulo(t2, e) {
        return (t2 % e + e) % e;
      }(this.animatedScroll, this.limit) : this.animatedScroll;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isScrolling() {
      return this.__isScrolling;
    }
    set isScrolling(t2) {
      this.__isScrolling !== t2 && (this.__isScrolling = t2, this.updateClassName());
    }
    get isStopped() {
      return this.__isStopped;
    }
    set isStopped(t2) {
      this.__isStopped !== t2 && (this.__isStopped = t2, this.updateClassName());
    }
    get isLocked() {
      return this.__isLocked;
    }
    set isLocked(t2) {
      this.__isLocked !== t2 && (this.__isLocked = t2, this.updateClassName());
    }
    get isSmooth() {
      return "smooth" === this.isScrolling;
    }
    get className() {
      let t2 = "lenis";
      return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), "smooth" === this.isScrolling && (t2 += " lenis-smooth"), t2;
    }
    updateClassName() {
      this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
    }
    cleanUpClassName() {
      this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
    }
  };

  // src/utils/constants.ts
  var selectors = {
    revealType: "[data-reveal-type]",
    revealParent: "[data-reveal-parent]",
    toggleScroll: "[data-toggle-scroll]",
    startScroll: "[data-start-scroll]",
    stopScroll: "[data-stop-scroll]",
    resetAnimation: "[data-reset-animation]",
    keepSplit: "[data-reset-animation]"
  };
  var revealTypeValuesArray = ["chars", "words", "lines"];
  var revealTypeValuesSet = new Set(revealTypeValuesArray);
  var animationTypeValuesArray = ["from-top", "from-bottom", "fade-from-bottom-left"];
  var animationTypeValuesSet = new Set(animationTypeValuesArray);
  var gsapEaseArray = [
    "power1",
    "power1.in",
    "power1.out",
    "power1.inOut",
    "power2",
    "power2.in",
    "power2.out",
    "power2.inOut",
    "power3",
    "power3.in",
    "power3.out",
    "power3.inOut",
    "power4",
    "power4.in",
    "power4.out",
    "power4.inOut",
    "back",
    "back.in",
    "back.out",
    "back.inOut",
    "bounce",
    "bounce.in",
    "bounce.out",
    "bounce.inOut",
    "circ",
    "circ.in",
    "circ.out",
    "circ.inOut",
    "elastic",
    "elastic.in",
    "elastic.out",
    "elastic.inOut",
    "expo",
    "expo.in",
    "expo.out",
    "expo.inOut",
    "sine",
    "sine.in",
    "sine.out",
    "sine.inOut"
  ];
  var gsapEaseSet = new Set(gsapEaseArray);

  // src/animations/smooth-scroll.ts
  var init = () => {
    const noSmoothScroll = document.body.dataset.noSmoothScroll !== void 0;
    const activateLenis = () => {
      return noSmoothScroll ? null : new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.7,
        gestureOrientation: "vertical"
      });
    };
    let lenis = activateLenis();
    function raf(time) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    const scrollTogglers = [...document.querySelectorAll(selectors.toggleScroll)];
    const scrollStartTriggers = [
      ...document.querySelectorAll(selectors.startScroll)
    ];
    const scrollStopTriggers = [...document.querySelectorAll(selectors.stopScroll)];
    let resetScroll = void 0;
    for (let i = 0; i < scrollTogglers.length; i++) {
      const scrollToggleElement = scrollTogglers[i];
      scrollToggleElement.addEventListener("click", () => {
        if (scrollToggleElement.classList.contains("stop-scroll")) {
          resetScroll?.();
          lenis = activateLenis();
          scrollToggleElement.classList.remove("stop-scroll");
          return;
        }
        resetScroll = preventBodyScroll();
        lenis?.destroy();
        scrollToggleElement.classList.add("stop-scroll");
      });
    }
    for (const startTrigger of scrollStartTriggers) {
      startTrigger.addEventListener("click", () => {
        lenis = activateLenis();
        resetScroll?.();
      });
    }
    for (const stopTrigger of scrollStopTriggers) {
      stopTrigger.addEventListener("click", () => {
        lenis?.destroy();
        resetScroll = preventBodyScroll();
      });
    }
  };
  init();
})();
//# sourceMappingURL=smooth-scroll.js.map
