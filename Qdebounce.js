
// 原则: 一个函数进行做一件事情, 一个变量也用于记录一种状态
function Qdebounce(fn, delay, immediate = false, resultCallback) {
  // 1.用于记录上一次事件触发的timer
  let timer = null
  let isInvoke = false

  // 2.触发事件时执行的函数
  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      try {
        // 2.1.如果有再次触发(更多次触发)事件, 那么取消上一次的事件
        if (timer) clearTimeout(timer)

        // 第一次操作是不需要延迟
        let res = undefined
        if (immediate && !isInvoke) {
          res = fn.apply(this, args)
          if (resultCallback) resultCallback(res)
          resolve(res)
          isInvoke = true
          return
        }

        // 2.2.延迟去执行对应的fn函数(传入的回调函数)
        timer = setTimeout(() => {
          res = fn.apply(this, args)
          if (resultCallback) resultCallback(res)
          resolve(res)
          timer = null // 执行过函数之后, 将timer重新置null
          isInvoke = false
        }, delay);
      } catch (error) {
        reject(error)
      }
    })
  }

  // 3.给_debounce绑定一个取消的函数
  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  // 返回一个新的函数
  return _debounce
}


export { Qdebounce };

