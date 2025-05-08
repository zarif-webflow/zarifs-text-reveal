export const selectors = {
  revealType: '[data-reveal-type]',
  revealParent: '[data-reveal-parent]',
  toggleScroll: '[data-toggle-scroll]',
  startScroll: '[data-start-scroll]',
  stopScroll: '[data-stop-scroll]',
  resetAnimation: '[data-reset-animation]',
} as const;

const revealTypeValuesArray = ['chars', 'words', 'lines'] as const;
export const revealTypeValuesSet: Set<string> = new Set(revealTypeValuesArray);
export type RevealTypeValue = (typeof revealTypeValuesArray)[number];

const animationTypeValuesArray = ['from-top', 'from-bottom', 'fade-from-bottom-left'] as const;
export const animationTypeValuesSet: Set<string> = new Set(animationTypeValuesArray);
export type AnimationTypeValue = (typeof animationTypeValuesArray)[number];

export type AnimationDataProps = {
  revealType: RevealTypeValue;
  animationType: AnimationTypeValue;
  duration: number;
  easing: string;
  delay: number;
  staggerDelay: number;
  fromX: string | undefined;
  fromY: string | undefined;
  fromOpacity: string | undefined;
  viewThreshold: number;
  resetAnimation: string | undefined;
  keepSplit: string | undefined;
};

export type AnimationDataKeys = keyof AnimationDataProps;

const gsapEaseArray = [
  'power1',
  'power1.in',
  'power1.out',
  'power1.inOut',
  'power2',
  'power2.in',
  'power2.out',
  'power2.inOut',
  'power3',
  'power3.in',
  'power3.out',
  'power3.inOut',
  'power4',
  'power4.in',
  'power4.out',
  'power4.inOut',
  'back',
  'back.in',
  'back.out',
  'back.inOut',
  'bounce',
  'bounce.in',
  'bounce.out',
  'bounce.inOut',
  'circ',
  'circ.in',
  'circ.out',
  'circ.inOut',
  'elastic',
  'elastic.in',
  'elastic.out',
  'elastic.inOut',
  'expo',
  'expo.in',
  'expo.out',
  'expo.inOut',
  'sine',
  'sine.in',
  'sine.out',
  'sine.inOut',
] as const;
export const gsapEaseSet: Set<string> = new Set(gsapEaseArray);
export type GsapEaseType = (typeof gsapEaseArray)[number];
