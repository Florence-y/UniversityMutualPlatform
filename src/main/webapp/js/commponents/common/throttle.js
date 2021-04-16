function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为 true，不为 true 则 return
    canRun = false; // 立即设置为 false
    setTimeout(() => { // 将外部传入的函数的执行放在 setTimeout 中
      fn.apply(this, arguments);
      // 最后在 setTimeout 执行完毕后再把标记设置为 true(关键) 
      //表示可以执行下一次循环了。当定时器没有执行的时候
      //标记永远是 false，在开头被 return 掉
      canRun = true;
    }, 500);
  };
}
