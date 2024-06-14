import { assert, fallback } from './common';
import {
  type AnimationDataKeys,
  type AnimationDataProps,
  type AnimationTypeValue,
  animationTypeValuesSet,
  type RevealTypeValue,
  revealTypeValuesSet,
} from './constants';

export const getAnimationValues = (
  element: HTMLElement,
  defaultValues: AnimationDataProps
): AnimationDataProps => {
  const { animationType, delay, duration, easing, revealType, staggerDelay } =
    element.dataset as Record<AnimationDataKeys, string | undefined>;

  const selectedAnimationType = assert(
    animationType,
    'Animation type not found or invalid!',
    (value) => value !== undefined && animationTypeValuesSet.has(value)
  ) as AnimationTypeValue;

  const selectedRevealType = fallback(
    revealType,
    defaultValues.revealType ?? 'chars',
    (value) => value !== undefined && revealTypeValuesSet.has(value)
  ) as RevealTypeValue;

  const selectedDelay = fallback(Number.parseInt(delay || ''), defaultValues.delay ?? 0);
  const selectedDuration = fallback(Number.parseInt(duration || ''), defaultValues.duration ?? 500);
  const selectedEasing = fallback(easing, defaultValues.easing ?? 'ease-in');
  const selectedStaggerDelay = fallback(
    Number.parseInt(staggerDelay || ''),
    defaultValues.staggerDelay ?? 50
  );

  return {
    animationType: selectedAnimationType,
    revealType: selectedRevealType,
    delay: selectedDelay,
    duration: selectedDuration,
    easing: selectedEasing,
    staggerDelay: selectedStaggerDelay,
  };
};
