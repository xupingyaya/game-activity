<template>
  <div>
    <van-popup v-model="modalShow" >
      <div class="ins-container">
        <img class="detail" src="../../assets/images/gold/inthb.png" alt="">
        <img class="ins-btn scale-animation" @click="openMoney" src="../../assets/images/gold/mo.png" alt="">
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
  name: "InitMoney",
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
      Toast('成功领取一元');
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
    width: 560px;
    height: 771px;
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
    width: 200px;
    height: 200px;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 132px;
  }
}
</style>
