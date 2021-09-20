<template>
  <div>
    <van-popup v-model="modalShow" :close-on-click-overlay="false" :lazy-render="false">
      <div class="container">
        <img class="close" @click="cancel" src="../../assets/images/circle/closePrizeFragment.png" alt="">
        <img class="current-prize" :src="list[`prizeFragment${currentPrize}`]" alt="">
        <img class="continue-btn scale-animation" @click="cancel" src="../../assets/images/circle/continueGame.png" alt="">
        <span class="process">3/30</span>
        <div class="process-bar-container">
          <div class="process-bar" style="width: 10%;"></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
import prizeFragment1 from '../../assets/images/circle/prizeFragment1.png'
import prizeFragment2 from '../../assets/images/circle/prizeFragment2.png'
import prizeFragment3 from '../../assets/images/circle/prizeFragment3.png'
import prizeFragment4 from '../../assets/images/circle/prizeFragment4.png'
import prizeFragment5 from '../../assets/images/circle/prizeFragment5.png'
import prizeFragment6 from '../../assets/images/circle/prizeFragment6.png'
import prizeFragment7 from '../../assets/images/circle/prizeFragment7.png'
import prizeFragment9 from '../../assets/images/circle/prizeFragment9.png'

Vue.use(Popup);
export default {
  name: "currentPrize",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentPrize: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      list: {
        prizeFragment1,
        prizeFragment2,
        prizeFragment3,
        prizeFragment4,
        prizeFragment5,
        prizeFragment6,
        prizeFragment7,
        prizeFragment9,
      },
    }
  },
  computed: {
    modalShow: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      },
    },
  },
  methods: {
    cancel() {
      this.modalShow = false;
      this.$emit('continue');
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  .current-prize {
    margin-top: 60px;
    width: 647px;
    height: 666px;
  }
  .close {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 0;
    right: 0;
  }
  .continue-btn {
    position: absolute;
    width: 360px;
    height: 126px;
    bottom: 65px;
    right: 0;
    left: 0;
    margin: 0 auto;
    transition: all;
  }

  .process {
    position: absolute;
    bottom: 251px;
    left: 302px;
    height: 20px;
    line-height: 20px;
    transform: scale(0.8);
    color: #010101;
    z-index: 2;
  }
  .process-bar-container {
    position: absolute;
    bottom: 251px;
    left: 154px;
    height: 20px;
    width: 308px;
    .process-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 20px;
      background: #FF5050;
    }
  }
}

</style>
