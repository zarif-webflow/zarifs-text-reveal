// node_modules/.pnpm/@finsweet+ts-utils@0.40.0/node_modules/@finsweet/ts-utils/dist/helpers/wait.js
var wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

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

// src/utils/common.ts
var fallback = (value, replacementValue, condition) => {
  if (value !== void 0 && condition && !condition(value)) {
    return replacementValue;
  }
  if (value === void 0 || Number.isNaN(value)) {
    return replacementValue;
  }
  if (value === 0) return value;
  return value;
};

// src/utils/valueGetters.ts
var getAnimationValues = (element, defaultValues, parentEl) => {
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
    resetAnimation
  } = element.dataset;
  const parentViewThreshold = parentEl?.dataset.viewThreshold;
  const selectedAnimationType = fallback(
    animationType,
    defaultValues?.animationType ?? "from-bottom",
    (value) => value !== void 0 && animationTypeValuesSet.has(value)
  );
  const selectedRevealType = fallback(
    revealType,
    defaultValues?.revealType ?? "chars",
    (value) => value !== void 0 && revealTypeValuesSet.has(value)
  );
  const selectedEasing = fallback(
    easing,
    defaultValues?.easing ?? "powe3.out",
    (value) => value !== void 0 && gsapEaseSet.has(value)
  );
  const selectedDelay = fallback(Number.parseFloat(delay || ""), defaultValues?.delay ?? 0);
  const selectedViewThreshold = fallback(
    Number.parseFloat(viewThreshold || parentViewThreshold || ""),
    defaultValues?.viewThreshold ?? 0.8
  );
  const selectedDuration = fallback(
    Number.parseFloat(duration || ""),
    defaultValues?.duration ?? 0.5
  );
  const selectedStaggerDelay = fallback(
    Number.parseFloat(staggerDelay || ""),
    defaultValues?.staggerDelay ?? 0.05
  );
  return {
    animationType: selectedAnimationType,
    revealType: selectedRevealType,
    delay: selectedDelay,
    duration: selectedDuration,
    easing: selectedEasing,
    staggerDelay: selectedStaggerDelay,
    fromX,
    fromY,
    fromOpacity,
    viewThreshold: selectedViewThreshold,
    resetAnimation
  };
};

// src/utils/wrap-words.ts
function wrapHyphenatedWords(element) {
  const textNodes = getTextNodesWithHyphens(element);
  textNodes.forEach((textNode) => {
    const text = textNode.nodeValue || "";
    const fragment = document.createDocumentFragment();
    const parts = text.split(/(\s+)/);
    for (const part of parts) {
      if (part.includes("-") && /\S/.test(part)) {
        const span = document.createElement("span");
        span.classList.add("split-word-nowrap");
        span.textContent = part;
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    }
    if (textNode.parentNode) {
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
  return element;
}
function getTextNodesWithHyphens(element) {
  const result = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  let node;
  while (node = walker.nextNode()) {
    const textNode = node;
    if (textNode.nodeValue && textNode.nodeValue.includes("-")) {
      result.push(textNode);
    }
  }
  return result;
}

export {
  wait,
  selectors,
  getAnimationValues,
  wrapHyphenatedWords
};
//# sourceMappingURL=chunk-2OTSJLV6.js.map
