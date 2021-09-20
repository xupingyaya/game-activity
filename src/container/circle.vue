<template>
  <div ref="home" class="home">
    <div v-show="showPage">
      <img class="bg-bottom" src="../assets/images/circle/bg-bottom.png" alt="">
      <div class="times-tips">
        剩余次数2次
      </div>
<!--      <img  src="../assets/images/circle/times-tips.png" alt="">-->
<!--      <h1 class="reset" @click="handleReset">重新开始</h1>-->
      <header>
        <img class="back" @click="handleBack" src="../assets/images/circle/back.png" alt="">
        <img class="my-prize" @click="handleDisMyPrize" src="../assets/images/circle/my-prize.png" alt="">
        <img class="title" src="../assets/images/circle/title.png" alt="">
        <img class="game-instructions" @click="handleGameIns" src="../assets/images/circle/game-instructions.png"
             alt="">
      </header>
      <tipsSwipe class="get-prize-tips-container" v-if="showPage"></tipsSwipe>
      <div class="prize-container">
        <img ref="prize1" class="prize-1" src="../assets/images/circle/iphone.png"/>
        <img ref="prize2" class="prize-2" src="../assets/images/circle/computer.png"/>
        <img ref="prize3" class="prize-3" src="../assets/images/circle/8yuan.png"/>
        <img ref="prize4" class="prize-4" src="../assets/images/circle/chair.png"/>
        <img ref="prize5" class="prize-5" src="../assets/images/circle/tv.png"/>
        <img ref="prize6" class="prize-6" src="../assets/images/circle/1yuan.png"/>
        <img ref="prize7" class="prize-7" src="../assets/images/circle/3yuan.png"/>
        <img ref="prize8" class="prize-8" src="../assets/images/circle/random-prize.png"/>
        <img ref="prize9" class="prize-9" src="../assets/images/circle/2yuan.png"/>
      </div>
      <div class="shadow-container">
        <img class="prize-1-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-2-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-3-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-4-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-5-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-6-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-7-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-8-shadow" src="../assets/images/circle/shadow.png" alt="">
        <img class="prize-9-shadow" src="../assets/images/circle/shadow.png" alt="">
      </div>
      <div ref="ballContainer" class="ball-container">
        <img ref="circleTips" class="circle-tips" src="../assets/images/circle/circle-tips.png" alt="">
        <img ref="touzhi" class="touzhi" src="../assets/images/circle/touzhi.png" alt="">
        <div class="drag-ball" ref="dragBall" @touchstart.stop.prevent="touchstart"
             @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
        </div>
      </div>
      <myPrize :show.sync="showMyPrize"></myPrize>
      <gameInstructions :show.sync="showGameIns"></gameInstructions>
      <currentPrize @continue="handleContinue" :show.sync="showCurrentPrize"
                    :current-prize="currentPrizeIndex"></currentPrize>
    </div>
  </div>
</template>
<script>
import myPrize from "../components/circle/myPrize.vue";
import gameInstructions from "../components/circle/gameInstructions.vue";
import currentPrize from "../components/circle/currentPrize.vue";
import Parabola from "../components/circle/parabola.js";
import loadFile from "../assets/js/loadFile.js";

// 需要加载的资源
import bg from '../assets/images/circle/bg.png'
import prize1 from "../assets/images/circle/iphone.png";
import prize2 from "../assets/images/circle/computer.png";
import prize3 from "../assets/images/circle/8yuan.png";
import prize4 from "../assets/images/circle/chair.png";
import prize5 from "../assets/images/circle/tv.png";
import prize6 from "../assets/images/circle/1yuan.png";
import prize7 from "../assets/images/circle/3yuan.png";
import prize8 from "../assets/images/circle/random-prize.png";
import prize9 from "../assets/images/circle/2yuan.png";
import tipsSwipe from "../components/common/tipsSwipe.vue";
import startMusic from "../assets/mp4/circle/start.mp3";
import bgMusic from "../assets/mp4/circle/bg.mp3";
import createjs from 'createjs-npm';
// import prizeResultBg from "../assets/images/circle/prizeResultBg.png";
// import prizeFragment1 from '../assets/images/circle/prizeFragment1.png'
// import prizeFragment2 from '../assets/images/circle/prizeFragment2.png'
// import prizeFragment3 from '../assets/images/circle/prizeFragment3.png'
// import prizeFragment4 from '../assets/images/circle/prizeFragment4.png'
// import prizeFragment5 from '../assets/images/circle/prizeFragment5.png'
// import prizeFragment6 from '../assets/images/circle/prizeFragment6.png'
// import prizeFragment7 from '../assets/images/circle/prizeFragment7.png'
// import prizeFragment9 from '../assets/images/circle/prizeFragment9.png'

export default {
  name: 'drag-ball',
  components: {
    myPrize,
    gameInstructions,
    currentPrize,
    tipsSwipe
  },
  data() {
    return {
      canDrag: false,
      canStart: true,
      // 偏移
      inset: {
        left: 0,
        top: 0,
      },
      // 移动
      move: {},
      // 位置
      position: {
        left: 0,
        top: 0,
      },
      // 初始位置
      positionOld: {},
      ballContainerPosition: {},
      startTime: null,
      endTime: null,
      prize3Position: {},
      prize1Position: {},
      showMyPrize: false,
      showGameIns: false,
      showCurrentPrize: false,
      currentPrizeIndex: 0,
      showPage: false
    };
  },
  mounted() {
    createjs.Sound.stop();//停止背景音乐播放(兼容)
    const fileList = [
      {
        id: "bg",
        src: bg
      },
      {
        id: "circleStartMusic",
        src: startMusic
      },
      {
        id: "circleBgMusic",
        src: bgMusic
      },
      // {
      //   id: "prizeResultBg",
      //   src: prizeResultBg
      // },
      {
        id: "prize1",
        src: prize1
      }, {
        id: "prize2",
        src: prize2
      }, {
        id: "prize3",
        src: prize3
      }, {
        id: "prize4",
        src: prize4
      }, {
        id: "prize5",
        src: prize5
      }, {
        id: "prize6",
        src: prize6
      }, {
        id: "prize7",
        src: prize7
      }, {
        id: "prize8",
        src: prize8
      }, {
        id: "prize9",
        src: prize9
      },
      // {
      //   id: "prizeFragment1",
      //   src: prizeFragment1
      // },
      // {
      //   id: "prizeFragment2",
      //   src: prizeFragment2
      // },
      // {
      //   id: "prizeFragment3",
      //   src: prizeFragment3
      // },
      // {
      //   id: "prizeFragment4",
      //   src: prizeFragment4
      // },
      // {
      //   id: "prizeFragment5",
      //   src: prizeFragment5
      // },
      // {
      //   id: "prizeFragment6",
      //   src: prizeFragment6
      // },
      // {
      //   id: "prizeFragment7",
      //   src: prizeFragment7
      // },
      // {
      //   id: "prizeFragment9",
      //   src: prizeFragment9
      // },
    ];
    loadFile(fileList).then(() => {
      this.$refs.home.style.opacity = 1;
      this.showPage = true;
      this.$nextTick(() => {
        this.initPosition();
        this.initMusic();
      })
    })
  },
  methods: {
    initMusic() {
      const bgInstance = createjs.Sound.play("circleBgMusic");
      bgInstance.on("complete", this.handleBgComplete, this);
      bgInstance.volume = 0.2;
    },
    handleBgComplete() {
      this.initMusic();
    },
    initPosition() {
      this.ballContainerPosition = this.getPosition(this.ballContainer);
      // 设置圈的位置为container的中心位置
      this.positionOld = this.getPosition(this.dragBall);
      const position = this.ballContainerPosition;
      const left = position.left + position.width / 2
          - this.positionOld.width / 2;
      const top = position.top + position.height / 2
          - this.positionOld.height / 2 + 5;
      this.dragBall.style.left = `${left}px`;
      this.dragBall.style.top = `${top}px`;
      this.positionOld = this.getPosition(this.dragBall);

      // 设置投掷提示的位置
      const touzhiPosition = this.getPosition(this.$refs.touzhi);
      const touzhiLeft = position.left + position.width / 2
          - touzhiPosition.width / 2;
      const touzhitTop = position.top + position.height / 2
          - touzhiPosition.height / 2;
      this.$refs.touzhi.style.left = `${touzhiLeft}px`;
      this.$refs.touzhi.style.top = `${touzhitTop}px`;
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleContinue() {
      this.handleReset();
    },
    handleDisMyPrize() {
      this.showMyPrize = true;
    },
    handleGameIns() {
      this.showGameIns = true;
    },
    handleReset() {
      this.dragBall.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      this.dragBall.style.transform = 'scale(1)';
      this.dragBall.style.left = `${this.positionOld.left}px`;
      this.dragBall.style.top = `${this.positionOld.top}px`;
      this.canStart = true;
      this.$refs.circleTips.style.opacity = '1';
      this.$refs.touzhi.style.opacity = '1';
    },
    touchstart(e) {
      this.dragBall.style.transition = 'all 0s';
      this.$refs.circleTips.style.opacity = '0';
      this.$refs.touzhi.style.opacity = '0';
      if (!this.canStart) return;
      if (!this.canDrag) {
        this.dragBall.style.transition = 'all 0s';
        // 获取ball-container位置
        this.startTime = e.timeStamp;
        this.position = {...this.positionOld};
        this.inset = {
          left: e.targetTouches[0].clientX - this.positionOld.left,
          top: e.targetTouches[0].clientY - this.positionOld.top,
        };
        this.canDrag = true;
      }
    },
    touchmove(e) {
      if (!this.canStart) return;
      if (this.canDrag) {
        let left = e.targetTouches[0].clientX - this.inset.left;
        let top = e.targetTouches[0].clientY - this.inset.top;
        const {height} = this.position;
        const {width} = this.position;
        const bottom = top + height;
        // 固定只能上下移动
        left = this.positionOld.left;
        // const right = left + width;
        // if (left < this.ballContainerPosition.left) {
        //   left = this.ballContainerPosition.left;
        // } else if (left > (window.innerWidth - this.dragBall.offsetWidth)) {
        //   left = window.innerWidth - this.dragBall.offsetWidth;
        // }

        if (top < this.ballContainerPosition.top) {
          top = this.ballContainerPosition.top;
        } else if (top > (window.innerHeight - this.dragBall.offsetHeight)) {
          top = window.innerHeight - this.dragBall.offsetHeight;
        }

        if (bottom > this.ballContainerPosition.top + this.ballContainerPosition.height) {
          top = this.ballContainerPosition.top
              + this.ballContainerPosition.height - this.position.height;
        }
        //
        // if (right > this.ballContainerPosition.left + this.ballContainerPosition.width) {
        //   left = this.ballContainerPosition.left
        //       + this.ballContainerPosition.width - this.position.width;
        // }

        this.dragBall.style.left = `${left}px`;
        this.dragBall.style.top = `${top}px`;
        this.move = {
          x: left - this.positionOld.left,
          y: top - this.positionOld.top,
        };
        this.position = {
          left, top, height, width,
        };
      }
    },
    getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getYMinParams(index) {
      if ([1, 2].includes(index)) {
        return 0.9
      } else if ([3, 4, 5].includes(index)) {
        return 0.8
      } else {
        return 0.7
      }
    },
    touchend(e) {
      if (!this.canStart) return;
      if (this.canDrag) {
        // 时间可以用来计算加速度（可能用不到）
        this.endTime = e.timeStamp;
        // console.log(this.move);
        // 判断如果是向上滑动，那么开始套圈
        console.log(this.position.top, this.positionOld.top);
        const topMove = this.positionOld.top - this.position.top;
        const maxMove = this.positionOld.top - this.ballContainerPosition.top;
        if (topMove > maxMove / 2) {
          console.log('弹出小圈');
          createjs.Sound.play("circleStartMusic")
          // this.dragBall.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          // 随机生成一个奖品，然后飞到对应位置
          const result = this.getRandomArbitrary(1, 10);
          this.currentPrizeIndex = result;
          const position = this.getPosition(this.$refs[`prize${result}`]);
          const randomLeft = position.left + position.width / 2
              - this.positionOld.width / 2;
          const randomTop = position.top + position.height / 2
              - this.positionOld.height / 2;
          const that = this;
          // 初始化系数
          const yMinParams = this.getYMinParams(result);
          const parabola = new Parabola({
            startPos: {
              left: this.positionOld.left,
              top: this.positionOld.top
            },
            endPos: {
              left: randomLeft,
              top: randomTop
            },
            yMinParams,
            duration: 1000,
            onStep(pos, progress) {
              that.dragBall.style.left = pos.left + 'px';
              that.dragBall.style.top = pos.top + 'px';
              that.dragBall.style.transform = `scale(${1 - 0.3 * progress}) rotate3d(${16*progress}, 1, 0, ${40*progress}deg)`; // 0 1 ; 1 0.7
            },
            onFinish() {
              that.dragBall.style.left = `${randomLeft}px`;
              that.dragBall.style.top = `${randomTop}px`;
              // that.dragBall.classList.add('scaleAnimation');
              console.log('Animation Finished!');
              that.dragBall.style.animationName = 'upAnimation';
              that.dragBall.style.animationDuration = '0.5s';

              setTimeout(() => {
                that.dragBall.style.animationName = '';
                that.dragBall.style.animationDuration = '0s';
                if (result !== 8) {
                  that.showCurrentPrize = true;
                } else {
                  that.handleReset();
                }
              }, 700)
            }
          });
          parabola.start();
          console.log(randomLeft, randomTop)
          // this.dragBall.style.left = `${randomLeft}px`;
          // this.dragBall.style.top = `${randomTop}px`;
          // this.dragBall.style.transform = 'scale(0.7)';
          this.canStart = false;
          // todo 随机奖励怎么处理？
          // setTimeout(() => {
          //   if (result !== 8) {
          //     this.showCurrentPrize = true;
          //   }
          // }, 1500)
          return;
        }
        // 如果不是向上的，那么回到原来的位置
        this.dragBall.style.transition = 'all 0.2s';
        this.dragBall.style.left = `${this.positionOld.left}px`;
        this.dragBall.style.top = `${this.positionOld.top}px`;
        this.inset = {};
        this.move = {};
        this.position = {};
        this.canDrag = false;
        this.$refs.circleTips.style.opacity = '1';
        this.$refs.touzhi.style.opacity = '1';
      }
    },
    // 获取dom的绝对位置
    getPosition(source) {
      let left = source.offsetLeft; // 获取元素相对于其父元素的left值var left
      let top = source.offsetTop;
      const width = source.offsetWidth;
      const height = source.offsetHeight;
      let current = source.offsetParent; // 取得元素的offsetParent // 一直循环直到根元素
      while (current != null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
      }
      return {
        left,
        top,
        width,
        height,
      };
    },
  },
  computed: {
    dragBall() {
      return this.$refs.dragBall;
    },
    ballContainer() {
      return this.$refs.ballContainer;
    },
  },
  beforeDestroy() {
    createjs.Sound.removeAllSounds();//停止背景音乐播放
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url("../assets/images/circle/bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: -106px;
  opacity: 0;

  .bg-bottom {
    position: fixed;
    z-index: 2;
    bottom: 0;
    width: 100%;
  }

  .times-tips {
    position: absolute;
    z-index: 1;
    bottom: 29px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 212px;
    height: 37px;
    background-image: url("../assets/images/circle/times-tips.png");
    background-repeat: no-repeat;
    background-size: 212px 37px;
    font-size: 22px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 37px;
    text-align: center;
  }

  header {
    .back {
      position: absolute;
      top: 28px;
      left: 8px;
      width: 50px;
      height: 50px;
    }

    .my-prize {
      position: absolute;
      top: 40px;
      left: 66px;
      width: 113px;
      height: 125px;
    }

    .title {
      position: absolute;
      top: 40px;
      left: 207px;
      width: 336px;
      height: 89px;
    }

    .game-instructions {
      position: absolute;
      top: 40px;
      left: 571px;
      width: 114px;
      height: 125px;
    }
  }

  .get-prize-tips-container {
    position: absolute;
    left: 266px;
    top: 208px;
  }
  .ball-container {
    position: fixed;
    left: 236px;
    bottom: 76px;
    width: 281px;
    height: 281px;
    //background: rgba(0, 0, 0, 0.1);
    background-image: url("../assets/images/circle/circle-bg.png");
    background-repeat: no-repeat;
    background-size: 281px 281px;
    border-radius: 50%;
    z-index: 3;

    .touzhi {
      position: fixed;
      width: 103px;
      height: 103px;
      transition: .2s;
    }

    .circle-tips {
      position: relative;
      top: -205px;
      width: 265px;
      height: 206px;
      transition: .2s;
    }
  }

  .prize-container {
    img {
      z-index: 2;
    }
    .prize-1 {
      position: absolute;
      top: 377px;
      left: 252px;
      width: 90px;
      height: 116px;
    }

    .prize-2 {
      position: absolute;
      top: 414px;
      left: 392px;
      width: 126px;
      height: 80px;
    }

    .prize-3 {
      position: absolute;
      top: 503px;
      left: 170px;
      width: 96px;
      height: 124px;
    }

    .prize-4 {
      position: absolute;
      top: 504px;
      left: 328px;
      width: 96px;
      height: 124px;
    }

    .prize-5 {
      position: absolute;
      top: 531px;
      left: 464px;
      width: 140px;
      height: 98px;
    }

    .prize-6 {
      position: absolute;
      top: 636px;
      left: 90px;
      width: 96px;
      height: 124px;
    }

    .prize-7 {
      position: absolute;
      top: 636px;
      left: 248px;
      width: 96px;
      height: 124px;
    }

    .prize-8 {
      position: absolute;
      top: 636px;
      left: 404px;
      width: 96px;
      height: 124px;
    }

    .prize-9 {
      position: absolute;
      top: 636px;
      left: 563px;
      width: 96px;
      height: 124px;
    }
  }
  .shadow-container {
    img {
      z-index: 1;
      width: 111px;
      height: 20px;
    }
    .prize-1-shadow {
      position: absolute;
      top: 473px;
      left: 241px;
    }
    .prize-2-shadow {
      position: absolute;
      top: 473px;
      left: 399px;
    }
    .prize-3-shadow {
      position: absolute;
      top: 606px;
      left: 163px;
    }
    .prize-4-shadow {
      position: absolute;
      top: 606px;
      left: 320px;
    }
    .prize-5-shadow {
      position: absolute;
      top: 606px;
      left: 478px;
    }
    .prize-6-shadow {
      position: absolute;
      top: 739px;
      left: 84px;
    }
    .prize-7-shadow {
      position: absolute;
      top: 739px;
      left: 241px;
    }
    .prize-8-shadow {
      position: absolute;
      top: 739px;
      left: 399px;
    }
    .prize-9-shadow {
      position: absolute;
      top: 739px;
      left: 556px;
    }
  }
}

.reset {
  position: absolute;
  top: 70%;
  right: 30px;
}

.drag-ball {
  position: fixed;
  z-index: 10003;
  left: 282px;
  top: 70%;
  width: 188px;
  height: 202px;
  background: url("../assets/images/circle/circle.png") no-repeat;
  background-size: 188px 202px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition-timing-function: cubic-bezier(.17, .67, .59, 1.08);
  will-change: auto;
}

.drag-ball .drag-content {
  overflow-wrap: break-word;
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
}
</style>
