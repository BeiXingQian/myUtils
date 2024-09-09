// 判断一个标识符是否是对象类型
function isObject(value) {
  /*
  null -> object
  function -> function -> true
  object/array -> object -> true
  const valueType = typeof value
  */
  return (value !== null) && ( valueType === "object" || valueType === "function" )
}

function deepCopy(originValue, map = new WeakMap()) {
      // 0.如果值是Symbol的类型
      if (typeof originValue === "symbol") {
        return Symbol(originValue.description)
      }

      // 1.如果是原始类型, 直接返回
      if (!isObject(originValue)) {
        return originValue
      }

      // 2.如果是set类型
      if (originValue instanceof Set) {
        const newSet = new Set()
        for (const setItem of originValue) {
          newSet.add(deepCopy(setItem))
        }
        return newSet
      }

      // 3.如果是函数function类型, 不需要进行深拷贝
      if (typeof originValue === "function") {
        return originValue
      }

      // 4.如果是对象类型, 才需要创建对象
      if (map.get(originValue)) {
        return map.get(originValue)
      }
      const newObj = Array.isArray(originValue) ? []: {}
      map.set(originValue, newObj)
      // 遍历普通的key
      for (const key in originValue) {
        newObj[key] = deepCopy(originValue[key], map);
      }
      // 单独遍历symbol
      const symbolKeys = Object.getOwnPropertySymbols(originValue)
      for (const symbolKey of symbolKeys) {
        newObj[Symbol(symbolKey.description)] = deepCopy(originValue[symbolKey], map)
      }

      return newObj
    }

    // 导出
    export { deepCopy };