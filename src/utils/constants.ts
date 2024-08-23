import { type Easing } from 'motion';

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

const animationTypeValuesArray = [
  'from-top',
  'from-bottom',
  'from-left-bottom',
  'fade-from-bottom-left',
] as const;
export const animationTypeValuesSet: Set<string> = new Set(animationTypeValuesArray);
export type AnimationTypeValue = (typeof animationTypeValuesArray)[number];

export type AnimationDataProps = {
  revealType: RevealTypeValue;
  animationType: AnimationTypeValue;
  duration: number;
  easing: MotionEaseType;
  delay: number;
  staggerDelay: number;
  fromX: string | undefined;
  fromY: string | undefined;
  fromOpacity: string | undefined;
  viewThreshold: number;
  resetAnimation: string | undefined;
};

export type AnimationDataKeys = keyof AnimationDataProps;
export const motionEaseArray: Easing[] = [
  'ease',
  'ease-in',
  'ease-in-out',
  'ease-out',
  'linear',
  'step-end',
  'step-start',
];
export type MotionEaseType = (typeof motionEaseArray)[number];
export const motionEaseSet: Set<MotionEaseType> = new Set(motionEaseArray);
