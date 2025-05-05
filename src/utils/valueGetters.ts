import { assert, fallback } from './common';
import {
  type AnimationDataKeys,
  type AnimationDataProps,
  type AnimationTypeValue,
  animationTypeValuesSet,
  gsapEaseSet,
  type GsapEaseType,
  type RevealTypeValue,
  revealTypeValuesSet,
} from './constants';

export const getAnimationValues = (
  element: HTMLElement,
  defaultValues?: AnimationDataProps,
  parentEl?: HTMLElement
): AnimationDataProps => {
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
    resetAnimation,
  } = element.dataset as Record<AnimationDataKeys, string | undefined>;
  const parentViewThreshold = parentEl?.dataset.viewThreshold;

  const selectedAnimationType = assert(
    animationType,
    'Animation type not found or invalid!',
    (value) => value !== undefined && animationTypeValuesSet.has(value)
  ) as AnimationTypeValue;

  const selectedRevealType = fallback(
    revealType,
    defaultValues?.revealType ?? 'chars',
    (value) => value !== undefined && revealTypeValuesSet.has(value)
  ) as RevealTypeValue;

  const selectedEasing = fallback(
    easing,
    defaultValues?.easing ?? 'powe3.out',
    (value) => value !== undefined && gsapEaseSet.has(value)
  ) as GsapEaseType;

  const selectedDelay = fallback(Number.parseFloat(delay || ''), defaultValues?.delay ?? 0);
  const selectedViewThreshold = fallback(
    Number.parseFloat(viewThreshold || parentViewThreshold || ''),
    defaultValues?.viewThreshold ?? 0.8
  );
  const selectedDuration = fallback(
    Number.parseFloat(duration || ''),
    defaultValues?.duration ?? 0.5
  );
  const selectedStaggerDelay = fallback(
    Number.parseFloat(staggerDelay || ''),
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
    resetAnimation,
  };
};
