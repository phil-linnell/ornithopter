/**
 * Receives an array [a] and a function fn. Returns the resulting array [b] of
 * mapping fn over [a] collecting its results as a flatten array.
 *
 * @param {Array} array The list to iterate over.
 * @param {Function} fn The function applied per item.
 *
 * @example
 *    flatMap([1,2,3], x => [x, x * x])  //=> [1, 1, 2, 4, 3, 9]
 *
 *
 * @return {Array} Flattened array of mapped items.
 */
export function flatMap(array, fn) {
  return array.reduce((xs, x) => xs.concat(fn(x)), []);
}
