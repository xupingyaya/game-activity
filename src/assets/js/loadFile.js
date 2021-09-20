import createjs from 'createjs-npm';

export default function (files, isNeedProcess = true){
  return new Promise((resolve, reject) => {
    try {
      const queue = new createjs.LoadQueue();
      queue.installPlugin(createjs.Sound);
      queue.loadManifest(
        files
      );
      if (isNeedProcess) {
        queue.on("progress", function () {
          const loadMsgDom = document.querySelector("#load-msg")
          loadMsgDom.style.display = 'block';
          loadMsgDom.innerText = "加载中" + parseInt(queue.progress * 100) + "%...";
          //加载完成把进度条隐藏
          if (parseInt(queue.progress * 100) === 100) {
            loadMsgDom.style.display = "none";
          }
        });
      }
      //文件加载完成执行
      queue.addEventListener("complete", function () {
        console.log("加载完成，游戏开始！");
        resolve()
      });
    } catch (e) {
      reject(e)
    }
  })
}
