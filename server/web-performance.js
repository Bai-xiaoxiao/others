// 针对网页的性能分析
(function() {
  handleAddListener('load', getTiming)

  function handleAddListener(type, fn) {
      if(window.addEventListener) {
          window.addEventListener(type, fn)
      } else {
          window.attachEvent('on' + type, fn)
      }
  }

  function createElement(timingObj) {
    const bxd = document.createElement('div')
    const timeString = Object.keys(timingObj).reduce((prev, currentValue) => {
      return `${prev}<li>${currentValue}：${timingObj[currentValue]}秒</li>`
    })
    bxd.innerHTML = `
    <div style="position: fixed;right:20px;bottom: 100px;background:#fff;z-index:999;">
      <ul>
      ${timeString}
      </ul>
    </div>`

    document.body.appendChild(bxd)
  }

  function getTiming() {
      try {
          var time = performance.timing;
          var timingObj = {};

          var loadTime = (time.loadEventEnd - time.loadEventStart) / 1000;

          if(loadTime < 0) {
              setTimeout(function() {
                  getTiming();
              }, 200);
              return;
          }

          timingObj['白屏时间'] = (time.responseStart - time.navigationStart) / 1000;
          timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000;
          timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart) / 1000;
          timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000;
          timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart) / 1000;
          timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.navigationStart) / 1000;
          timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading) / 1000;
          timingObj['DOM结构解析完成时间'] = (time.domInteractive - time.domLoading) / 1000;
          timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000;
          timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart) / 1000;
          timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS解析时间'] + timingObj['TCP完成握手时间'] + timingObj['HTTP请求响应完成时间'] + timingObj['DOM结构解析完成时间'] + timingObj['DOM加载完成时间']);

          const p = window.performance.getEntries();
          let jsR = p.filter(ele => ele.initiatorType === "script" || ele.name.includes('.js'));
          timingObj['js加载总耗时'] = (Math.max(...jsR.map((ele) => ele.responseEnd)) - Math.min(...jsR.map((ele) => ele.startTime))) / 1000;

          let cssR = p.filter(ele => ele.initiatorType === "css" || ele.name.includes('.css'));
          timingObj['css加载总耗时'] = (Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime))) / 1000;


          console.log(timingObj)
          // createElement(timingObj)

      } catch(e) {
          console.log(timingObj)
          console.log(performance.timing);
      }
  }
})();