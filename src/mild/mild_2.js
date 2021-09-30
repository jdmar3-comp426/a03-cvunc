/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
  return {"type": typeof variable, "value": variable}
}


/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
  let items = []
  for (let i = 0; i < array.length; i++) {
    items[i] = {"type": typeof array[i], "value": array[i]}
  }
  return items
}

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
  delete object[key]
}

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
  let newobj = {}
  let keys = Object.keys(object)
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] != key) {
      newobj[keys[i]] = object[keys[i]]
    }
  }
  return newobj
}

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
  let newobj = {}
  Object.keys(object).forEach(k => newobj[k] = object[k])
  keyList.forEach(k => newobj = Object.keys(newobj).includes(k) ? removeKeyNonDestructive(newobj, k) : newobj)
  return newobj
}

console.log(identifyVariable(3))
console.log(identifyArray([3,"some"]))
let t = {"hi": "there", 3: 1}
removeKey(t, "hi")
t["test"] = "thingy"
console.log(removeKeyNonDestructive(t, "test"))
console.log(removeKeys(t, ['3', "test"]))
