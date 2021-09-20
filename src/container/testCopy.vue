<template>
  <div class="home">
    <div ref="guidao" class="guidao-container" v-html="imgHtml">

    </div>
    <img class="tuiban" src="../assets/images/gold/shape.png" alt="">
  </div>
</template>
<script>
import gold from '../assets/images/gold/gold.png'
// 为了解决兼容的效果
import decomp from 'poly-decomp'

window.decomp = decomp
export default {
  name: 'drag-ball',
  components: {},
  data() {
    return {
      showGameIns: false,
      showMoneyIns: false,
      world: '',
      imgHtml: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.putico(50);
    })
  },
  methods: {
    handleContinue() {
      this.handleReset();
    },
    handleDisMyPrize() {
      // this.showMyPrize = true;
      this.$router.push({path: '/gold'})
    },
    handleGameInsType() {
      this.$router.push({path: '/circle'})
    },
    handleGameIns() {
      this.showGameIns = true;
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
      let xstart = 0, ystart = 0;
      while (num) {
        var pointer = Math.floor(Math.random() * allnum);
        if (!_tmpArray[pointer]) continue;
        delete _tmpArray[pointer];
        ystart = parseInt(pointer / xnum, 10) * icowidth;
        xstart = (pointer % xnum) * icoheight;
        _returnObj.push({x: xstart, y: ystart});
        //这是一个加入图片的测试
        imgtest = imgtest + `<img class="gold-item" src='${gold}' style='top: ${ystart}px;left: ${xstart}px'/>`;
        num--;
      }
      this.imgHtml = imgtest;
      return _returnObj;
    }
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
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url("../assets/images/gold/bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 bottom;

  .tuiban {
    position: fixed;
    top: 500px;
    left: 171px;
    width: 403px;
    height: 141px;
    animation: circle 2s linear 0s infinite;
  }

  @keyframes circle {
    from {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(40px) scale(1.04);
    }
    to {
      transform: translateY(0px) scale(1);
    }
  }

  .guidao-container {
    position: fixed;
    top: 670px;
    left: 120px;
    width: 500px;
    height: 460px;
  }

  /deep/ .gold-item {
    position: absolute;
    width: 79px;
    height: 83px;
  }
}
</style>
