<template>
  <div>
    <van-popup v-model="modalShow" >
      <div class="ins-container">
        <img class="detail" src="../../assets/images/gold/mn.png" alt="">
        <p class='lq'>领0.03元</p>
        <img class="ins-btn scale-animation" @click="openMoney" src="../../assets/images/gold/lq.png" alt="">
        <img class="close-btn" @click="cancel" src="../../assets/images/gold/mc.png" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
import { Toast } from 'vant';

Vue.use(Popup);
export default {
  name: "getMoney",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
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
    },
    openMoney(){
      this.modalShow = false;
      Toast('成功领取0.03元');
    }
  }

}
</script>

<style lang="less" scoped>
.van-popup--center{
  overflow-y: unset;
}
.ins-container {
  position: relative;
  .detail {
    margin-top: 25px;
    width: 659px;
    height: 629px;
  }
  .lq{
     position: absolute;
     bottom: 502px;
     left: 130px;
      color: #F08537;
      width: 427px;
      height: 90px;
      font-size: 94px;
      font-family: FZLanTingHeiS-H-GB;
      font-weight: 700;
      color: #F08537;
      line-height: 463px;
  }
  .close-btn {
    position: absolute;
    width: 26px;
    height: 26px;
    top: 50px;
    right: 20px;
  }
  .ins-btn {
    position: absolute;
    width: 528px;
    height: 150px;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 52px;
  }
}
</style>
