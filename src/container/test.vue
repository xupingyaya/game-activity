<template>
  <div class="home" :style="{ height: Height+'px'}">>
    <div class ='bg2'>
      <img src="../assets/images/gold/newb.png" alt="背景图">
    </div>
    <header>
    </header>
    <div class="left">
        <img class="my-prize" @click="handleGameIns"  src="../assets/images/gold/arules@2x.png" alt="">
        <img class="game-instructions" @click="handleDisMyPrize"  src="../assets/images/gold/moneyac.png" alt="">
        <img :class="[{shaking: toShake},'game-btn']"  @click="handleGameInsType" src="../assets/images/gold/mbtn.png" alt="">
        <img :class="[{ganzishaking: ganziToShake},'ganzi']" src="../assets/images/gold/arr.png" alt="">
        <img class="game-pai" @click="handleGameInsTypePai" src="../assets/images/gold/bg-gd.png" alt="">
        <div class="icon-img numbers" HALO-NUMBER-SCROLL>
           <input type="hidden" :value="randomNumber" />
            <!-- <img   :class="[{moveIcon: moveIcon},'blue-img']"  src="../assets/images/gold/blue.png" alt="蓝钻">
            <img :class="[{moveIcon: moveIcon},'gold-img']"   src="../assets/images/gold/gold-c.png" alt="金币">
            <img :class="[{moveIcon: moveIcon},'red-img']"   src="../assets/images/gold/red.png" alt="红钻"> -->

        </div>
        <img class="game-shape" id='GameShape' @click="handleGameInsTypeShape" src="../assets/images/gold/shape.png" alt="">
    </div>
    <div ref="guidao" class="guidao-container" v-html="imgHtml">
    </div>
    <!-- <div  id='test' :style="{'display': display }">
          <img  v-for="index in 5" :key="index"   :id="'test'+index" src="../assets/images/gold/gold.png" style='height:auto' alt="">
    </div> -->
    <img :class="[{slotshaking: slotshaking},'game-slot']" @click="handleGameInsTypeShape" src="../assets/images/gold/slot.png" alt="">
    <gameInstructions :show.sync="showGameIns"></gameInstructions>
    <InitMoney :show.sync="showMoneyIns"></InitMoney>
    <getMoney :show.sync="showMoney"></getMoney>
  </div>
</template>
<script>
import gameInstructions from "../components/gold/gameInstructions.vue";
import InitMoney from "../components/gold/InitMoney.vue";
import getMoney from "../components/gold/getMoney.vue";
import gold from '../assets/images/gold/gold.png'
import numberscroller from '../assets/js/numberscroller.js'
import blue from '../assets/images/gold/blue.png'; // 蓝钻
import goldc from '../assets/images/gold/gold-c.png'; // 金币
import red from '../assets/images/gold/red.png'; // 红钻
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
    getMoney
  },
  data() {
    return {
      randomNumber: 102,
      showGameIns: false,
      showMoneyIns:false,
      toShake: false,
      anboxclass:true,
      ganziToShake:false,
      showMoney:false,
      slotshaking:false,
      moveIcon:false,
      display:'none',
      returnObj:[{
    "x": 50,
    "y": 30,
    "rotate": 346,
    "height": "auto"
  }, {
    "x": 190,
    "y": 0,
    "rotate": 269,
    "height": "auto"
  }, {
    "x": 100,
    "y": 140,
    "rotate": 82,
    "height": "auto"
  }, {
    "x": 160,
    "y": 220,
    "rotate": 179,
    "height": "auto"
  }, {
    "x": 20,
    "y": 40,
    "rotate": 292,
    "height": "auto"
  }, {
    "x": 80,
    "y": 110,
    "rotate": 200,
    "height": "auto"
  }, {
    "x": 210,
    "y": 110,
    "rotate": 28,
    "height": "auto"
  }, {
    "x": 50,
    "y": 200,
    "rotate": 312,
    "height": "auto"
  }, {
    "x": 80,
    "y": 160,
    "rotate": 128,
    "height": "auto"
  }, {
    "x": 150,
    "y": 130,
    "rotate": 33,
    "height": "auto"
  }, {
    "x": 140,
    "y": 110,
    "rotate": 281,
    "height": "auto"
  }, {
    "x": 120,
    "y": 10,
    "rotate": 279,
    "height": "auto"
  }, {
    "x": 100,
    "y": 230,
    "rotate": 234,
    "height": "auto"
  }, {
    "x": 180,
    "y": 70,
    "rotate": 46,
    "height": "auto"
  }, {
    "x": 60,
    "y": 170,
    "rotate": 322,
    "height": "auto"
  }, {
    "x": 170,
    "y": 10,
    "rotate": 140,
    "height": "auto"
  }, {
    "x": 70,
    "y": 130,
    "rotate": 114,
    "height": "auto"
  }, {
    "x": 210,
    "y": 210,
    "rotate": 198,
    "height": "auto"
  }, {
    "x": 50,
    "y": 40,
    "rotate": 76,
    "height": "auto"
  }, {
    "x": 40,
    "y": 100,
    "rotate": 207,
    "height": "auto"
  }, {
    "x": 50,
    "y": 170,
    "rotate": 42,
    "height": "auto"
  }, {
    "x": 50,
    "y": 0,
    "rotate": 8,
    "height": "auto"
  }, {
    "x": 170,
    "y": 120,
    "rotate": 312,
    "height": "auto"
  }, {
    "x": 220,
    "y": 0,
    "rotate": 242,
    "height": "auto"
  }, {
    "x": 210,
    "y": 0,
    "rotate": 72,
    "height": "auto"
  }, {
    "x": 100,
    "y": 70,
    "rotate": 37,
    "height": "auto"
  }, {
    "x": 190,
    "y": 120,
    "rotate": 237,
    "height": "auto"
  }, {
    "x": 210,
    "y": 90,
    "rotate": 338,
    "height": "auto"
  }, {
    "x": 190,
    "y": 160,
    "rotate": 182,
    "height": "auto"
  }, {
    "x": 20,
    "y": 110,
    "rotate": 319,
    "height": "auto"
  }],
      world:'',
      imgHtml: '',
      Height:window.innerHeight,
      animaFlag:true,
    };
  },
  mounted() {
    this.Height = window.innerHeight;
    // this.myGod('bulue',10)
    this.$nextTick(() => {
      this.putico(50);
    })
    this.initNumberScroller();
    // this.initIcon()
  },
  methods: {
    initNumberScroller() {
      numbersIns = numberscroller({
        round:3,//默认三圈
        duration: 1,//默认1s
        direction: 'alternate',//方向，有三个值，up,down,alternate。默认是alternate
        l2r:1,//滚动顺序，如果为1表示 从左到右 如果为0表示 从右到左
        delay: .3,//组之间的时间延迟，默认.3s
        groupNum:1,//默认2个一组
        diffrentiation:1,//差异化滚动，默认是差异化滚动
        undreg:'^xxx', //强制无差异化匹配 ^ooxx 表示开头第3，4为无差异化滚动 xxx$ 表示倒数的后三们为无差异滚动
        numList: [ // 数字列表
          `<img src='${blue}'>`,
          `<img src='${goldc}'>`,
          `<img src='${red}'>`,
        ], 
        numHolder: `<img src='${goldc}'>`
      })
      numbersIns.show();
    },
    // rand(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // },
    initIcon(){
      const _returnObj =this.returnObj
      let imgtest=''
       _returnObj.forEach((item)=>{
      // _returnObj1.push({x: item.x, y: item.y, rotate:item.rotate, height: item.height});
          let ystart= item.y
          let  xstart =item.x
          // width:${ystart*0.047+ 27.5}px;height:auto;
          imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${ystart}px;left: ${xstart}px;-webkit-transform:rotate(${item.rotate}deg)'/>`;
      })
      this.imgHtml = imgtest;
      this.returnObj  =_returnObj
    },
    putico(num) {
      const icowidth = 10;
      const icoheight = 10;
      const myHeight = this.$refs.guidao.clientHeight;
      const myWidth = this.$refs.guidao.clientWidth;
      const _tmpArray = [], _returnObj = [];
      let imgtest = '';
      if (myWidth < icowidth || myHeight < icoheight) return false;
      const xnum = parseInt(myWidth / icowidth, 10);
      const ynum = parseInt(myHeight / icoheight, 10);
      const allnum = xnum * ynum;
      if (num >= allnum) return 'all';
      for (let i = 0; i < allnum; i++) {
        _tmpArray.push(i);
      }
      let xstart = 0, ystart = 0, rotate=0,height=0;
      while (num) {
        var pointer = Math.floor(Math.random() * allnum);
        if (!_tmpArray[pointer]) continue;
        delete _tmpArray[pointer];
        ystart = parseInt(pointer / xnum, 10) * icowidth;
        xstart = (pointer % xnum) * icoheight;
        
        rotate = Math.ceil(Math.random()*360)
        // if(ystart<60){
        //   height =  ystart*0.047+ 27.5-2 +'px'
        // }else{
        //   height = 'auto'
        // }
        height = 'auto'
        _returnObj.push({x: xstart, y: ystart,rotate: rotate, height: height});
        // width:${ystart*0.047+ 27.5}px;height:${height};
        //这是一个加入图片的测试
        imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${ystart}px;left: ${xstart}px; -webkit-transform:rotate(${rotate}deg)'/>`;
        num--;
      }
      this.imgHtml = imgtest;
      console.log('_returnObj---', JSON.stringify(_returnObj))
      this._returnObj =_returnObj
      return _returnObj;
    },

    boxLine(){
    var timer=null;
    let div1=document.getElementById("GameShape");
    let initTop=div1.offsetTop
        clearInterval(timer);//如果多次点击，那么会有多个定时器同时工作，移动速度不是设置的10,会有叠加效果，故应该清除
        timer= setInterval( ()=> {
          console.log('div1.offsetTop, initTop--', div1.offsetTop, initTop,div1.offsetTop-initTop )
            this.coinMove(div1.offsetTop, initTop);
            if(div1.offsetTop-initTop>52)
            {
                // 动画结束
                this.animaFlag=false
                setTimeout(()=>{
                   this.showMoney=true
                },1000)
                this.slotshaking=false
                clearInterval(timer);
            }
            else
              div1.style.top=div1.offsetTop+1+'px';
        },100);
    },
    coinMove(top,inittop){
      let _returnObj=this._returnObj
      let motop = top-inittop
      let _returnObj1 =[]
      let imgtest =''
      let flag =false
      let ystart=0,xstart=0;
      _returnObj.forEach((item)=>{
          if(item.y === motop){
            console.log(222)
            // console.log('motop---', motop)
            if(top-inittop>50){
              // _returnObj1.map((item,index)=>{

              // })
              flag=true
               _returnObj1.push({x: item.x, y: item.y + 1, rotate:item.rotate,height: item.height});
               ystart= item.y + 1
              xstart =item.x
              console.log(333)
            }else{
               _returnObj1.push({x: item.x, y: item.y + 1, rotate:item.rotate,height: item.height});
               ystart= item.y + 1
                    xstart =item.x
            }
          }else{
            if(flag){
               let x=Math.floor((Math.random()*5)+1)
               let y =Math.floor((Math.random()*13)+1)
               if( x<3){
                    _returnObj1.push({x: item.x-1, y: item.y+y, rotate:item.rotate, height: item.height});
                            xstart =item.x-1
               }else{
                    _returnObj1.push({x: item.x+1, y: item.y+y, rotate:item.rotate, height: item.height});
                      xstart =item.x+1
               }
               ystart= item.y+y
      
            }else{
                _returnObj1.push({x: item.x, y: item.y, rotate:item.rotate, height: item.height});
               ystart= item.y
                    xstart =item.x
            }
             
          }
     
          // width:${ystart*0.047+ 27.5}px;height:auto;
          imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${ystart}px;left: ${xstart}px;-webkit-transform:rotate(${item.rotate}deg)'/>`;
      })
      this.imgHtml = imgtest;
      this._returnObj =_returnObj1
      return _returnObj1;
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
      const first = this.getRandomArbitrary(1,2); // 第一位不能是0， todo 待改造
      const second = this.getRandomArbitrary(0,2);
      const third = this.getRandomArbitrary(0,2);
      return `${first}${second}${third}`

    },
    handleGameInsType(){
      // 随机产生一个数字，然后滚动按照这个数字来转
      this.randomNumber = this.getRandomNumber();
      numbersIns.scroll();
      if(!this.animaFlag){
        // 当前游戏进行中，不可以点击
        Toast('当前游戏进行中，稍后点击')
        return false
      }
      

      this.toShake= true;
      this.moveIcon=true
      this.ganziToShake = true
      setTimeout(() => {
          this.ganziToShake= false
          this.slotshaking=true
          this.display='block'
          // this.throwCoin()
          this.boxLine()
          setTimeout(()=>{
            this.display='none'
          },1000)
          this.animaFlag=false
      }, 2000)
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
        console.log('box.innerHTML--', box.innerHTML)
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
    throwCoin(){
      var $ball = document.getElementById("test").getElementsByTagName("img")
            let arr =[ {x: 90, y: 140},
              {x: 160, y: 150},
              {x: 190, y: 50},
              {x: 210, y: 160},
              {x: 10, y: 100}]
      $ball.forEach((ele,index)=>{
        console.log(ele.offsetLeft,ele.offsetTop)
        ele.style.top = ele.offsetTop+'px';
        ele.style.left = ele.offsetLeft+'px';
        ele.style.transition = 'top 4s ease-in';
        setTimeout(()=>{
           ele.style.top = arr[index].y+'px';
            ele.style.left = arr[index].x+'px';
            ele.style.position = 'absolute';
            ele.style.transition = 'top 2s ease-in';
        }, 20)
      })
   
      this._returnObj =this._returnObj.concat([
        {x: 90, y: 40},
              {x: 160, y: 0},
              {x: 190, y: 50},
              {x: 210, y: 160},
              {x: 10, y: 100}
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

.numbers{

  }
  .numbers img {
    display: block; 
    width: 100%; 
    height: 100%; 
  }

#test{
    position: absolute;
    bottom: 810px;
    left: 120px;
  img{
    width: 55.5px;
    height: 54px;
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
  background-image: url("../assets/images/gold/newbg.png");
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
    bottom: 260px;
    left: 120px;
    width: 440px;
    height: 470px;
  }

  /deep/ .gold-item {
    position: absolute;
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
       animation: slot 4s linear 0s infinite;
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
    .game-shape{
        position: absolute;
        top: 340px;
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
        left: 550px;
        top: 4px;
        width: 81px;
        height: 228px;
      
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
        top: 40px;
        left: 167px;
        width: 413.4px;
        height: 298.6px;
    }
    .icon-img{
      position: absolute;
      top: 210px;
      left: 167px;
      width: 420px;
      height: 100px;
      overflow: hidden;
      /deep/ img{
        width: 75px;
        height: auto;
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
