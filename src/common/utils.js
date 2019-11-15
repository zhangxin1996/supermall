// 防抖函数
export function debounce(func, delay = 200) {
  let timer = null;

  return function() {
    var _this = this;
    var args = arguments;
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(_this, args);
    }, delay)
  }
}