export const selectors = {
  revealType: '[data-reveal-type]',
  revealParent: '[data-reveal-parent]',
} as const;

const revealTypeValuesArray = ['chars', 'words', 'lines'] as const;
export const revealTypeValuesSet: Set<string> = new Set(revealTypeValuesArray);
export type RevealTypeValue = (typeof revealTypeValuesArray)[number];

const animationTypeValuesArray = ['from-top', 'from-bottom', 'from-left-bottom'] as const;
export const animationTypeValuesSet: Set<string> = new Set(animationTypeValuesArray);
export type AnimationTypeValue = (typeof animationTypeValuesArray)[number];

export type AnimationDataProps = {
  revealType: RevealTypeValue;
  animationType: AnimationTypeValue;
  duration: number;
  easing: string;
  delay: number;
  staggerDelay: number;
};

export type AnimationDataKeys = keyof AnimationDataProps;
