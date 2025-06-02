class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export const assert = <T>(value: T, message: string, condition?: (value: T) => boolean) => {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value) ||
    (condition && !condition(value))
  ) {
    throw new AssertionError(message);
  }
  return value;
};

export const fallback = <T>(
  value: T,
  replacementValue: NonUndefined<T>,
  condition?: (value: T) => boolean
) => {
  if (value !== undefined && condition && !condition(value)) {
    return replacementValue;
  }
  if (value === undefined || Number.isNaN(value)) {
    return replacementValue;
  }

  if (value === 0) return value;

  return value;
};

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
