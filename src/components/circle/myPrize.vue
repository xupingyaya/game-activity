<template>
  <div>
    <van-popup v-model="modalShow" :close-on-click-overlay="false" :lazy-render="false">
      <div class="container">
        <img class="close" @click="cancel" src="../../assets/images/circle/prizeResultClose.png" alt="">
        <img class="title" src="../../assets/images/circle/prizeResultTitle.png" alt="">
        <div class="result-container">
          <div class="item-container">
            <div class="item">
              <img src="../../assets/images/circle/prizeResult1.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/100</span>
              </div>
            </div>
            <div class="item">
              <img src="../../assets/images/circle/prizeResult2.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/100</span>
              </div>
            </div>
          </div>
          <div class="item-container">
            <div class="item">
              <img src="../../assets/images/circle/prizeResult3.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/80</span>
              </div>
            </div>
            <div class="item">
              <img src="../../assets/images/circle/prizeResult4.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/80</span>
              </div>
            </div>
          </div>
          <div class="item-container">
            <div class="item">
              <img src="../../assets/images/circle/prizeResult5.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/50</span>
              </div>
            </div>
            <div class="item">
              <img src="../../assets/images/circle/prizeResult6.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/50</span>
              </div>
            </div>
          </div>
          <div class="item-container">
            <div class="item">
              <img src="../../assets/images/circle/prizeResult7.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 50%"></div>
                <span class="process-text">0/30</span>
              </div>
            </div>
            <div class="item">
              <img src="../../assets/images/circle/prizeResult8.png" alt="">
              <div class="process-content">
                <div class="process-bar" style="width: 100%"></div>
                <span class="process-text">30/30</span>
              </div>
              <div class="tips">
                <p>点击即可提现</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';

Vue.use(Popup);
export default {
  name: "myPrize",
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
.container {
  position: relative;
  overflow: auto;
  width: 749px;
  height: 1100px;
  background-image: url("../../assets/images/circle/prizeResultBg.png");
  background-repeat: no-repeat;
  background-size: 794px 1100px;
  .close {
    position: absolute;
    top: 31px;
    right: 29px;
    width: 61px;
    height: 60px;
  }
  .title {
    display: block;
    width: 363px;
    height: 79px;
    margin: 46px auto 40px;
  }
  .result-container {
    padding: 0 20px;
    .item-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .item {
        position: relative;
        img {
          width: 341px;
          height: 181px;
        }
        .process-content {
          position: absolute;
          top: 128px;
          left: 130px;
          width: 180px;
          height: 28px;
          border: 2px solid #00DC86;
          border-radius: 14px;
          .process-bar {
            height: 24px;
            background: linear-gradient(90deg, #F83600 0%, #F86900 100%);
            border-radius: 14px;
          }
          .process-text {
            position: absolute;
            top: 1px;
            left: 66px;
            font-size: 18px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 21px;
          }
        }
        .tips {
          position: absolute;
          bottom: -40px;
          right: 55px;
          width: 126px;
          height: 41px;
          background-image: url("../../assets/images/circle/getPrizeTips.png");
          background-repeat: no-repeat;
          background-size: 126px 41px;
          p {
            position: absolute;
            bottom: 6px;
            left: -63px;
            width: 252px;
            font-size: 16px;
            font-weight: 400;
            color: #F03838;
            line-height: 16px;
            transform: scale(0.7);
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
