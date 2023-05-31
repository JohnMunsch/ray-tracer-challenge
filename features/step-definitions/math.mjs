const EPSILON = 0.00001;

export function approximatelyEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}
