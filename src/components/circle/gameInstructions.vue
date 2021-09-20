<template>
  <div>
    <van-popup v-model="modalShow" :close-on-click-overlay="false" :lazy-render="false">
      <div class="ins-container">
        <img class="detail" src="../../assets/images/circle/active-detail.png" alt="">
        <img class="close-btn" @click="cancel" src="../../assets/images/circle/close.png" alt="">
        <img class="ins-btn" @click="cancel" src="../../assets/images/circle/ins-btn.png" alt="">
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
.ins-container {
  position: relative;
  .detail {
    margin-top: 25px;
    width: 644px;
    height: 1168px;
  }
  .close-btn {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
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
