<template>
  <div class="home" :style="{ height: Height+'px'}">
    <div class ='bg2'>
      <img id='bg' src="../assets/images/gold/newb.png" alt="背景图">
    </div>
    <tipsSwipe class="get-prize-tips-container" :list="swipeList"></tipsSwipe>
    <header>
      <img class="header-close" src="../assets/images/gold/header-close.png" alt="">
      <img class="header-coin" src="../assets/images/gold/header-coin.png" alt="">
      <img class="header-tips swing-animation" src="../assets/images/gold/header-tips.png" alt="">
      <div class="header-tips-b">
        <span class="header-tips-b-text">今日可提</span>
      </div>
      <span class="current-process">7.5</span><span class="sum"> / 8元</span>
    </header>
    <div class="left">
        <img class="my-prize" @click="handleGameIns"  src="../assets/images/gold/arules@2x.png" alt="">
        <img class="game-instructions" @click="handleDisMyPrize"  src="../assets/images/gold/moneyac.png" alt="">
        <img :class="[{shaking: toShake},'game-btn']"  @click="handleGameInsType" src="../assets/images/gold/mbtn.png" alt="">
        <div class='tips'>剩余次数<span>1</span>次</div>
        <img :class="[{ganzishaking: ganziToShake},'ganzi']" src="../assets/images/gold/arr.png" alt="">
      <img class="ganzi-dizuo" src="../assets/images/gold/dizuo.png" alt="">

      <img class="game-pai" @click="handleGameInsTypePai" src="../assets/images/gold/bg-gd.png" alt="">
         <div class="icon-img numbers" HALO-NUMBER-SCROLL>
           <input type="hidden" :value="randomNumber" />
         </div>
      <!-- <div class="icon-img-tips">
        <span class="first">+{{iconNumber.first}}</span>
        <span class="second">+{{iconNumber.second}}</span>
        <span class="third">+{{iconNumber.third}}</span>
      </div> -->
        <img class="game-shape" id='GameShape' @click="handleGameInsTypeShape" src="../assets/images/gold/shape.png" alt="">
    </div>
    <div ref="guidao" class="guidao-container" id='Guidao' v-html="imgHtml">
    </div>
   <div  id='test' :style="{'display': display }">
          <img  v-for="index in 3" :key="index"   :id="'test'+index" src="../assets/images/gold/smgold.png" style='height:30px;width:30px;transition: top 6s ease-out;position:absolute; top:0; z-index:-1' alt="">
    </div>
    <slot-img class="game-slot" @slotPostion="slotpostion"></slot-img>
<!--    <img :class="[{slotshaking: slotshaking},'game-slot']" @click="handleGameInsTypeShape" src="../assets/images/gold/slot.png" alt="">-->
    <gameInstructions :show.sync="showGameIns"></gameInstructions>
    <InitMoney :show.sync="showMoneyIns"></InitMoney>
    <getMoney :show.sync="showMoney"></getMoney>
  </div>
</template>
<script>
import gameInstructions from "../components/gold/gameInstructions.vue";
import tipsSwipe from "../components/common/tipsSwipe.vue";
import InitMoney from "../components/gold/InitMoney.vue";
import getMoney from "../components/gold/getMoney.vue";
import gold from '../assets/images/gold/smgold.png'
import numberscroller from '../assets/js/numberscroller.js'
import blue from '../assets/images/gold/blue.png'; // 蓝钻
import goldc from '../assets/images/gold/gold-c.png'; // 金币
import red from '../assets/images/gold/red.png'; // 红钻
import slotImg from "../components/gold/slotImg";
import bgMusic from "../assets/mp4/gold/bg.mp3";
import buttomMusic from "../assets/mp4/gold/buttom.mp3";
import coinClashMusic from "../assets/mp4/gold/coinClash.wav";
import goldFallMusic from "../assets/mp4/gold/goldFall.mp3";
import multGoldFallMusic from "../assets/mp4/gold/multGoldFall.mp3";
import shakeMusic from "../assets/mp4/gold/shake.mp3";
import loadFile from "../assets/js/loadFile.js";
// import { setTimeout } from 'timers';
import createjs from "createjs-npm";
let numbersIns;

import { Toast } from 'vant';
// 为了解决兼容的效果
import decomp from 'poly-decomp'
import { setTimeout } from 'timers';
window.decomp = decomp
export default {
  name: 'drag-ball',
  components: {
    gameInstructions,
    InitMoney,
    getMoney,
    tipsSwipe,
    slotImg
  },
  data() {
    return {
      randomNumber: 123,
      showGameIns: false,
      showMoneyIns:true,
      toShake: false,
      anboxclass:true,
      ganziToShake:false,
      showMoney:false,
      slotshaking:false,
      moveIcon:false,
      display:'block',
      arr:[],
      arr1:[],
      world:'',
      imgHtml: '',
      Height:window.innerHeight,
      animaFlag:true,
      returnObj:[],
      iconNumber: {
        first: 0,
        second: 0,
        third: 0
      },
      throwCoinarr:[],
      randomCoinCount: 0,
      swipeList: [
          '恭喜132****5642获得（1元）奖励',
          '恭喜132****5642获得（2元）奖励',
          '恭喜132****5642获得（8元）奖励',
          '恭喜132****5642获得（16元）奖励',
      ]
    };
  },
  mounted() {
    this.Height = window.innerHeight;
    this.initMusic();
    // this.myGod('bulue',10)
    this.$nextTick(() => {
         // this.initIcon()
          this.startDrawing()
    })
    // this.initIcon()
    this.initNumberScroller();
    // 性能数据统计相关
  },
  methods: {
    slotpostion(e){
      console.log('e---555x--', e)
      this.slotpostiondata = e
    },
    initMusic() {
      createjs.Sound.stop();//停止背景音乐播放
      const fileList = [
        {
          id: "bgMusic",
          src: bgMusic
        },
        {
          id: "buttomMusic",
          src: buttomMusic
        },
        {
          id: "coinClashMusic",
          src: coinClashMusic
        },
        {
          id: "goldFallMusic",
          src: goldFallMusic
        },
        {
          id: "multGoldFallMusic",
          src: multGoldFallMusic
        },
        {
          id: "shakeMusic",
          src: shakeMusic
        },
      ]
      loadFile(fileList, false).then(() => {
        this.$nextTick(() => {
          this.initBgMusic();
        })
      })
    },
    initBgMusic() {
      const bgInstance = createjs.Sound.play("bgMusic");
      bgInstance.on("complete", this.handleBgComplete, this);
      bgInstance.volume = 0.8;
    },
    handleBgComplete() {
      this.initBgMusic();
    },
      // 生成随机点
    randomPoint ({w, h}) {
    const x = parseInt(Math.random() * w)
    const y = parseInt(Math.random() * h)
    return {x, y}
    },

    // 判断两个区域是否重叠
    testOverlay (pointA, pointB, radius) {
    const x = Math.abs(pointA.x - pointB.x)
    const y = Math.abs(pointA.y - pointB.y)
    const distance = Math.sqrt((x * x) + (y * y))
    if (distance >= radius * 2) {
        return false
    } else {
        return true
    }
    },

    // 判断新生成的点是否有效
    testAvailable (pointArr, newPoint, radius) {
    let arr = Array.from(pointArr)
    let aval = true
    while(arr.length > 0) {
        let lastPoint = arr.pop()
        if (this.testOverlay(lastPoint, newPoint, radius)) {
        aval = false
        break;
        }
    }
    return aval
    },
    // 开始
    startDrawing () {
    const size = {w: this.$refs.guidao.clientWidth, h: this.$refs.guidao.clientHeight}
    const radius = 11
    const max = 55
    let pointArr = []
    let imgtest = '';
    let count = 0
    while(count <= max) {
        let newPoint = this.randomPoint(size)
        if (this.testAvailable(pointArr, newPoint, radius)) {
        imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${newPoint.y}px;left: ${newPoint.x}px;width:${30}px;height:30px;transition:top 2s ease-out'/>`;
        pointArr.push(newPoint)
        count = 0
        } else {
        count += 1
        }
    }
      this.imgHtml = imgtest;
      this.returnObj =pointArr
      return pointArr;
    },
    initNumberScroller() {
      numbersIns = numberscroller({
        round:3,//默认三圈
        duration: 1,//默认1s
        direction: 'alternate',//方向，有三个值，up,down,alternate。默认是alternate
        l2r:1,//滚动顺序，如果为1表示 从左到右 如果为0表示 从右到左
        delay: 0,//组之间的时间延迟，默认.3s
        groupNum:1,//默认2个一组
        diffrentiation:1,//差异化滚动，默认是差异化滚动
        undreg:'^xxx', //强制无差异化匹配 ^ooxx 表示开头第3，4为无差异化滚动 xxx$ 表示倒数的后三们为无差异滚动
        numList: [ // 数字列表
          `<img src='${goldc}'>`,
          `<img style="width: 0.97rem" src='${blue}'>`,
          `<img style="width: 1rem" src='${goldc}'>`,
          `<img style="width: 1.05rem" src='${red}'>`,
        ],
        numHolder: `<img src='${goldc}'>`
      })
      numbersIns.show();
    },
    boxLine(){
    var timer=null;
    let div1=document.getElementById("GameShape");
    let initTop=div1.offsetTop
        clearInterval(timer);//如果多次点击，那么会有多个定时器同时工作，移动速度不是设置的10,会有叠加效果，故应该清除
        timer= setInterval( ()=> {
            this.coinMove1(div1.offsetTop, initTop);
            if(div1.offsetTop-initTop>72)
            {
                // 动画结束
                setTimeout(()=>{
                    this.throwCoin1()
                    setTimeout(()=>{
                        let int =  this.slotpostiondata.left -100
                        let flag =false
                        let div6=document.getElementById("Game2");
                        console.log(' this.slotpostiondata--',  this.slotpostiondata)
                        console.log(' this.slotpostiondata--',   this.throwCoinarr)
                        this.throwCoinarr.forEach((item)=>{
                          if(int < item.x && item.x <  int + div6.offsetWidth){
                            flag =true
                          }
                        })
                        if(flag){
                           this.showMoney=true
                        }else{
                           Toast('没有接住金币请重新开始' )
                        }
                        setTimeout((
                        )=>{
                            div1.style.top=initTop+'px';
                            this.startDrawing()
                        },1000)
                    },1000)
                },100)

                this.animaFlag=true

                this.slotshaking=false

                clearInterval(timer);
            }
            else
              div1.style.top=div1.offsetTop+1+'px';
        },100);
    },
    coinMove1(top,inittop){
      let _returnObj=this.returnObj
      let motop = top-inittop
      let _returnObj1 =[]
      let imgtest =''
      let ystart=0,xstart=0;
      let arr=[]
      _returnObj.forEach((item)=>{
          if(item.y === motop){
            arr.push({x: item.x, y: item.y+1, rotate:item.rotate, height: item.height})
            ystart= item.y+2
            xstart =item.x
            imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${ystart}px;left: ${xstart}px; width:30px;height:30px;transition:top 2s ease-out'/>`;
          }else{
              _returnObj1.push({x: item.x, y: item.y, rotate:item.rotate, height: item.height});
          }
      })
      //  获得运动的数组
      let arr3 = _returnObj.filter((item)=>{
        return item.flag
      })
    //   this.throwCoin1()
      this.returnObj =this.newFun(_returnObj1, arr.concat(arr3))._returnObj2.concat(arr)
      this.imgHtml = this.newFun(_returnObj1,  arr.concat(arr3)).imgtest+imgtest;
    },
    // 先判断需要走的
    // 在判断不需要走的7
    newFun(_returnObj1,arr){
      let _returnObj2=[]
      let imgtest =''
      let ystart=0,xstart=0;
      let min= 2
      _returnObj1.forEach((item)=>{
              let flag = false
              arr.forEach(c => {
              let xSpan = c.x-item.x
              let ySpan = c.y-item.y

              let len= Math.floor(Math.sqrt(Math.pow(xSpan,2) + Math.pow(ySpan,2)))
              if((len === 0 || len<31 && len >29) && Math.abs(ySpan) > Math.abs(xSpan)){
                  flag =true
                  }
              })
                if(flag){
                    // const myHeight = this.$refs.guidao.clientHeight;
                    ystart= item.y+1
                    xstart =item.x
                    min = 2
                     _returnObj2.push({x: item.x, y: ystart, rotate:item.rotate, height: item.height,flag:true});
                }else{
                    _returnObj2.push({x: item.x, y: item.y, rotate:item.rotate, height: item.height});
                    ystart= item.y
                    xstart =item.x
                }
            imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${ystart}px;left:${xstart}px;width:30px;height:30px;transition:top ${min}s ease-out'/>`;
          })
          return{
            _returnObj2:_returnObj2,
            imgtest:imgtest
          }
    },
    handleContinue() {
      this.handleReset();
    },
    handleDisMyPrize() {
      this.$router.push({path: '/circle'})
    },
    getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomNumber() {
      const first = this.getRandomArbitrary(1,4);
      let second = this.getRandomArbitrary(1,4);
      const third = this.getRandomArbitrary(1,4);
      console.log(`${first}${second}${third}`);
      // 如果没有一个是2，那么将second设置为2
      if(![first,second,third].includes(2)) {
        second = 2;
      }
      this.randomCoinCount = 0;
      if (first === 2) {
        this.randomCoinCount++;
      }
      if (second === 2) {
        this.randomCoinCount++;
      }
      if (third === 2) {
        this.randomCoinCount++;
      }
      return {
        res: `${first}${second}${third}`,
        first,
        second,
        third
      }

    },
    handleGameInsType(){
      // 随机产生一个数字，然后滚动按照这个数字来转
       if(!this.animaFlag){
   // 当前游戏进行中，不可以点击
          Toast('当前游戏进行中，稍后点击' )
          return false
      }
    createjs.Sound.play("buttomMusic");
      createjs.Sound.play("shakeMusic");
      const res = this.getRandomNumber();
      this.randomNumber = res.res;
      this.iconNumber.first = 0;
      this.iconNumber.second = 0;
      this.iconNumber.third = 0;
      setTimeout(() => {
        this.iconNumber.first = res.first === 2 ? this.getRandomArbitrary(1,2) : 0
        this.iconNumber.second = res.second === 2 ? this.getRandomArbitrary(1,2) : 0
        this.iconNumber.third = res.third === 2 ? this.getRandomArbitrary(1,2) : 0
      }, 1000)
      this.$nextTick(() => {
        numbersIns.scroll();
      })
      this.toShake= true;
      this.moveIcon=true
      this.ganziToShake = true
      setTimeout(() => {
          this.ganziToShake= false
          this.slotshaking=true
          this.display='block'
          this.throwCoin()
          setTimeout(()=>{
             this.throwCoin2()
            // this.display='none'
            this.boxLine()
          },2000)
      }, 2000)
    this.animaFlag=false
      setTimeout(() => {
        this.toShake= false
        this.moveIcon=false
      }, 1000)
    },
    myGod(id,w,n){
        var box=document.getElementById(id),can=true,fq=fq||10;
        w=w||1500;
        n=n==-1?-1:1
        box.innerHTML+=box.innerHTML;
        box.onmouseover=function(){can=false};
        box.onmouseout=function(){can=true};
        var max=parseInt(box.scrollHeight/2);
        new function (){
          var stop=box.scrollTop%18==0&&!can;
          if(!stop){
            var set=n>0?[max,0]:[0,max];
            box.scrollTop==set[0]?box.scrollTop=set[1]:box.scrollTop+=n;
          }
          setTimeout(fq);
        };
      },
    // 实现抛物线的效果
    throwCoin1(){
     var $ball = document.getElementById("Guidao").getElementsByTagName("img")
     const myHeight = this.$refs.guidao.clientHeight;
     let arr =[]
    //  let arr =[]
    $ball.forEach((ele)=>{
       if(ele.offsetTop>  myHeight-10){
              arr.push({y:ele.offsetTop,x:ele.offsetLeft})
              ele.style.top = myHeight+100+'px';
              ele.style.transform = 'rotate(180deg)';
                // ele.style.position = 'absolute';
              ele.style.transition = 'top 2s ease-out';
       }
      })
      this.throwCoinarr=arr
    },
    throwCoin2(){
        var $ball = document.getElementById("test").getElementsByTagName("img")
        $ball.forEach((ele)=>{
            ele.style.top = '0px';
            ele.style.zIndex = -1;
      })
    },
    throwCoin(){
      var $ball = document.getElementById("test").getElementsByTagName("img")
            let arr =[]
        arr.push({x: 154, y: 59})
        arr.push({x: 107, y: 78})
        arr.push({x:47,y:78})
      $ball.forEach((ele,index)=>{
           ele.style.top = '68px';
           ele.style.left = arr[index].x+'px';
           ele.style.transition = 'top 2s ease-out';
           ele.style.zIndex = 6;
      })
         this.returnObj =this.returnObj.concat([
                    {x: 170, y: 2},
                    {x: 122, y: 21},
                    {x:63,y:21}
                  ])

    },
    handleGameInsTypePai(){
      console.log('2----')
    },

    handleGameInsTypeShape(){
      console.log('3----')
    },
    handleGameIns() {
      this.showGameIns = true;
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
};
</script>
<style lang="less" scoped>

.get-prize-tips-container {
  position: absolute;
  top: 105px;
  left: 38px;
  z-index: 0;
}
header {
  position: absolute;
  top: 23px;
  left: 51px;
  width: 652px;
  height: 60px;
  background-image: url("../assets/images/gold/header-bg.png");
  background-repeat: no-repeat;
  background-size: 652px 60px;
  font-size: 0px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #FFFFFF;
  line-height: 60px;
  text-align: center;

  .header-close {
    position: absolute;
    top: 5px;
    left: 8px;
    width: 50px;
    height: 50px;
  }

  .header-coin {
    position: absolute;
    top: 6px;
    left: 204px;
    width: 50px;
    height: 50px;
  }

  .header-tips {
    position: absolute;
    top: -18px;
    left: 597px;
    width: 69px;
    height: 93px;
    z-index: 1;
  }

  .header-tips-b {
    position: absolute;
    top: 76px;
    right: -28px;
    width: 104px;
    height: 36px;
    background-image: url("../assets/images/gold/header-tips-b.png");
    background-repeat: no-repeat;
    background-size: 104px 36px;
    text-align: center;
  }
  .header-tips-b-text {
    position: absolute;
    bottom: 6px;
    left: 0;
    right: 0;
    font-size: 16px;
    font-family: FZLanTingHei-M-GBK;
    font-weight: 400;
    color: #EA370C;
    line-height: 16px;
    transform: scale(0.8);
  }

  .current-process {
    font-size: 30px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #F6D900;
    line-height: 60px;
  }

  .sum {
    font-size: 30px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 60px;
  }

}
  .numbers img {
    display: block;
    width: 100%;
    height: 100%;
  }
#test{
    left: 150px;
    position: absolute;
    bottom: 810px;
    img{
        position: absolute;
        top:0;
        // bottom: 810px;
        // position: absolute;
        transition :top 6s ease-out;
    }

}
.shaking {
  animation: scaleDrew 2.5s ease-in-out infinite;
}
@keyframes scaleDrew {
/* 定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称 */
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(0.9);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1);
    }
  }
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url("../assets/images/gold/newbg1.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #5c4839 !important;
  .bg2{
    position: absolute;
    bottom: 0;
    img{
      width: 100%;
    }
  }
  .guidao-container {
    position: absolute;
    bottom: 230px;
    left: 120px;
    width: 440px;
    height: 465px;
  }

  /deep/ .gold-item {
    position: absolute;
    z-index: 5;
    width: 79px;
    height: 83px;
  }
  .game-slot{
        position: absolute;
        bottom: 0px;
        left: 50%;
        width: 156px;
        margin-left: -78px;
        height: 160px;
    }
    .slotshaking{
       animation: slot 1.5s linear 0s infinite;
    }
    @keyframes slot {
        0% {
          transform:translateX(0px) scale(1); }
        25% { transform:translateX(200px) scale(1.04); }
        50% {
          transform:translateX(0px) scale(1); }
        75% {
          transform:translateX(-200px) scale(1); }
        100%{ transform:translateX(0px) scale(1); }
    }
  .left {
      position: absolute;
      bottom: 1191px;

    .back {
      position: absolute;
      top: 28px;
      left: 8px;
      width: 50px;
      height: 50px;
    }
    .my-prize {
      position: absolute;
      top: 100px;
      left: 26px;
      width: 113px;
      height: 125px;
    }
    .game-instructions {
      position: absolute;
      top: 280px;
      left: 26px;
      width: 114px;
      height: 125px;
    }
    .game-btn {
      position: absolute;
      top: 260px;
      left: 576px;
      width: 180px;
      height: 170px;
    }
    .tips{
      position: absolute;
      top: 190px;
      left: 576px;
      width: 185px;
      height: 76px;
      background-image: url("../assets/images/gold/tips.png");
      background-repeat: no-repeat;
      background-size: 100%;
      z-index: 999;
      text-align: center;
      font-size: 24px;
      font-family: FZLanTingHei-M-GBK;
      font-weight: 400;
      color: #3B0801;
      line-height: 55px;
      transform-style: preserve-3d;
      transform: translateZ(120px);
      // background-color: #5c4839 !important;
      span{
        color: #EA370C;
      }
    }

    .game-shape{
        position: absolute;
        top: 358px;
        left: 167px;
        width: 403px;
        height: 141px;
        // animation: game 2s linear 0s infinite;
    }
    @keyframes game {
        from { transform:translateY(0px) scale(1); }
        50% { transform:translateY(150px) scale(1.04); }
        to { transform:translateY(0px) scale(1); }
    }
    .ganzi {
      position: absolute;
      left: 575px;
      top: 0px;
      width: 81px;
      height: 228px;
      z-index: 1;
    }

    .ganzi-dizuo {
      position: absolute;
      left: 578px;
      top: 189px;
      width: 55px;
      height: 105px;
    }
  .ganzishaking{
      transform-origin: 0% bottom;
      animation: circle 2s linear 0s infinite;
  }
  @keyframes circle {
    from { transform:rotateX(0deg); }
    50% { transform:rotateX(-50deg); }
    to { transform:rotateX(0deg); }
  }
    .game-pai {
        position: absolute;
        top: -14px;
        left: 167px;
        width: 420px;
        height: 350px;
    }
    .icon-img{
      position: absolute;
      top: 180px;
      left: 184px;
      width: 380px;
      height: 100px;
      overflow: hidden;
      /deep/ img{
        width: 75px;
        height: auto;
        vertical-align: middle;
      }
      .moveIcon{
          /* 设置默认样式，开启3d硬件加速 */
        -webkit-transform:translate3d(0,0,0);
        -moz-transform:translate3d(0,0,0);
        transform:translate3d(0,0,0);
        /* 设置动画，animation:动画名称 动画播放时长单位秒或微秒 动画播放的速度曲线linear为匀速 动画播放次数infinite为循环播放; */
        -webkit-animation: 50ms rowup linear infinite normal;
        animation: 500ms rowup linear infinite normal;
      }
      @-webkit-keyframes rowup {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            25% {
                -webkit-transform: translate3d(0, -30px, 0);
                transform: translate3d(0, 50px, 0);
            }
            50% {
                -webkit-transform: translate3d(0, 0px, 0);
                transform: translate3d(0, -60px, 0);
            }
            75% {
                -webkit-transform: translate3d(0, 30px, 0);
                transform: translate3d(0, 0px, 0);
            }
            100% {
                -webkit-transform: translate3d(0, 0px, 0);
                transform: translate3d(0, 30px, 0);
            }
        }
        @keyframes rowup {
        0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            25% {
                -webkit-transform: translate3d(0, 30px, 0);
                transform: translate3d(0, 30px, 0);
            }
            50% {
                -webkit-transform: translate3d(0, -60px, 0);
                transform: translate3d(0, -60px, 0);
            }
            75% {
                -webkit-transform: translate3d(0, 0px, 0);
                transform: translate3d(0, 0px, 0);
            }
            100% {
                -webkit-transform: translate3d(0, 30px, 0);
                transform: translate3d(0, 30px, 0);
            }
        }
      .blue-img{
          position: absolute;
          left: 50px;
      }
      .gold-img{
          position: absolute;
          left: 180px;
      }
      .red-img{
          position: absolute;
          left: 300px;
      }
    }
    .icon-img-tips {
      position: absolute;
      top: 250px;
      left: 184px;
      width: 380px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #F86766;
    }
    .title {
      position: absolute;
      top: 40px;
      left: 207px;
      width: 336px;
      height: 89px;
    }

  }

  .right{
      position: absolute;
      top: 313px;
     .game-btn {
      position: absolute;
      top: 180px;
      left: 66px;
      width: 180px;
      height: 170px;
    }
  }
  .ball-container {
    position: fixed;
    left: 236px;
    top: 70%;
    width: 281px;
    height: 281px;
    //background: rgba(0, 0, 0, 0.1);
    background-image: url("../assets/images/circle/circle-bg.png");
    background-repeat: no-repeat;
    background-size: 281px 281px;
    border-radius: 50%;
    z-index: 1;
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
    .prize-1 {
      position: absolute;
      top: 383px;
      left: 259px;
      width: 74px;
      height: 100px;
    }
    .prize-2 {
      position: absolute;
      top: 420px;
      left: 400px;
      width: 110px;
      height: 64px;
    }
    .prize-3 {
      position: absolute;
      top: 509px;
      left: 177px;
      width: 81px;
      height: 107px;
    }
    .prize-4 {
      position: absolute;
      top: 510px;
      left: 342px;
      width: 67px;
      height: 107px;
    }
    .prize-5 {
      position: absolute;
      top: 538px;
      left: 471px;
      width: 125px;
      height: 79px;
    }
    .prize-6 {
      position: absolute;
      top: 642px;
      left: 97px;
      width: 81px;
      height: 107px;
    }
    .prize-7 {
      position: absolute;
      top: 641px;
      left: 255px;
      width: 81px;
      height: 107px;
    }
    .prize-8 {
      position: absolute;
      top: 652px;
      left: 394px;
      width: 107px;
      height: 97px;
    }
    .prize-9 {
      position: absolute;
      top: 641px;
      left: 570px;
      width: 81px;
      height: 107px;
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
  transition-timing-function: cubic-bezier(.55,0,.85,.36);
  will-change: auto;
}
.drag-ball .drag-content {
  overflow-wrap: break-word;
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
}
</style>
