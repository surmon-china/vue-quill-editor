
module.exports = (Object.assign || ((target, source) => {

  const toObject = val => {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined')
    }
    return Object(val)
  }

  const applyFn = (a, b, c) => {
    if (typeof Reflect !== 'undefined' && Reflect && Reflect.apply) {
      return Reflect.apply(a, b, c)
    } else {
      return a.call(b, c)
    }
  }

  let from
  let symbols
  const targetObject = toObject(target)

  for (let s = 1; s < arguments.length; s++) {
    from = Object(arguments[s])
    for (const key in from) {
      if (applyFn(Object.prototype.hasOwnProperty, from, key)) {
        targetObject[key] = from[key]
      }
    }

    if (Object.getOwnPropertySymbols) {
      symbols = Object.getOwnPropertySymbols(from)
      for (let i = 0; i < symbols.length; i++) {
        if (applyFn(Object.prototype.propIsEnumerable, from, symbols[i])) {
          targetObject[symbols[i]] = from[symbols[i]]
        }
      }
    }
  }
  return targetObject
}))
