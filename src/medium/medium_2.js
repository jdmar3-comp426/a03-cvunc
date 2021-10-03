import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
  avgMpg: {
    "city": mpg_data.map(e => e["city_mpg"]).reduce((s, e) => s + e) / mpg_data.length,
    "highway": mpg_data.map(e => e["highway_mpg"]).reduce((s, e) => s + e) / mpg_data.length
  },
  allYearStats: getStatistics(mpg_data.map(e => e["year"])),
  ratioHybrids: mpg_data.map(e => e["hybrid"]).reduce((s, e) => s + e) / mpg_data.length,
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data.reduce((p, car) => {
      if (p.map(e => e["make"]).includes(car["make"])) {
        p.forEach(e => {
          if (e["make"] == car["make"]) {
            if (car["hybrid"]) {
              e["hybrids"].push(car["id"])
            }
          }
        })
      } else {
        p.push({"make": car["make"], "hybrids": [car["id"]]})
      }
      return p.sort((a, b) => b["hybrids"].length - a["hybrids"].length)
    }, []),

    avgMpgByYearAndHybrid: mpg_data.reduce((d, car) => {
      let p = d[0], counts = d[1]
      let hy = car["hybrid"] ? "hybrid" : "notHybrid"
      if (car["year"] in p) {
        p[car["year"]][hy]["city"] = (p[car["year"]][hy]["city"] * counts[car["year"]][hy] + car["city_mpg"]) / (counts[car["year"]][hy] + 1)
        p[car["year"]][hy]["highway"] = (p[car["year"]][hy]["highway"] * counts[car["year"]][hy] + car["highway_mpg"]) / (counts[car["year"]][hy] + 1)
        counts[car["year"]][hy] += 1
      } else {
        p[car["year"]] = {
          "hybrid": {
            "city": 0, 
            "highway": 0 
          },
          "notHybrid": {
            "city": 0, 
            "highway": 0
          }
        }
        p[car["year"]][hy]["city"] = car["city_mpg"]
        p[car["year"]][hy]["highway"] = car["highway_mpg"]

        counts[car["year"]] = {
          "hybrid": 0,
          "notHybrid": 0
        }
        counts[car["year"]][hy] = 1
      }
      return [p, counts]
    }, [{},{}])[0]
};
console.log("2009: ", moreStats["avgMpgByYearAndHybrid"]["2009"])
console.log("2010: ", moreStats["avgMpgByYearAndHybrid"]["2010"])
console.log("2011: ", moreStats["avgMpgByYearAndHybrid"]["2011"])
console.log("2012: ", moreStats["avgMpgByYearAndHybrid"]["2012"])
