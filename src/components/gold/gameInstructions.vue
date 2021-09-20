<template>
  <div>
    <van-popup v-model="modalShow" >
      <div class="ins-container">
        <img class="detail" src="../../assets/images/gold/infobg.png" alt="">
        <img class="close-btn" @click="cancel" src="../../assets/images/gold/acclose.png" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';

Vue.use(Popup);
export default {
  name: "gameInstructions",
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
    width: 664px;
    height: auto;
  }
  .close-btn {
    position: absolute;
    width: 74px;
    height: 74px;
    top: 30px;
    right: -30px;
  }
  .ins-btn {
    position: absolute;
    width: 165px;
    height: 58px;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 132px;
  }
}
</style>
