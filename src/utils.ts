/**
 * Generates a series of integers from 0 to end, exclusive.
 * @param end The end of the series, exclusive.
 */
export function* range(end: number) {
  for (let i = 0; i < end; ++i) {
    yield i;
  }
};

/**
 * Returns a copy of an array with a value removed. If value is not found in the array, returns the original array.
 * @param array The original array.
 * @param value The removed value.
 */
export const arrayRemove = <T>(array: readonly T[], value: T): readonly T[] => {
  const index = array.indexOf(value);
  if (index < 0) {
    return array;
  }
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
