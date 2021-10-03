import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
  let sum = 0
  array.forEach(e => sum += e)
  return sum
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
  let newa = []
  array.forEach(e => newa.push(e))
  newa.sort()
  if (newa.length % 2 != 0) {
    return newa[parseInt(newa.length / 2)]
  } else {
    let first = newa[newa.length / 2]
    let second = newa[newa.length / 2 + 1]
    return (first + second) / 2
  }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
  let statistics = {}
  let min = array[0], max = array[0]
  statistics["length"] = array.length
  statistics["sum"] = getSum(array)
  statistics["mean"] = getSum(array) / array.length
  statistics["median"] = getMedian(array)
  array.forEach(e => {
    min = Math.min(min, e)
    max = Math.max(max, e)
  })
  statistics["min"] = min
  statistics["max"] = max
  statistics["variance"] = variance(array, getSum(array) / array.length)
  statistics["standard_deviation"] = Math.sqrt(statistics["variance"])
  return statistics
}
