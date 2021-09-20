<template>
  <div class="get-prize-tips">
    <van-swipe
        vertical
        :autoplay="3000"
        style="height: 0.53rem;"
        :show-indicators="false"
    >
      <van-swipe-item class="item" v-for="(item, index) in list" :key="index">{{item}}</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { NoticeBar, Swipe, SwipeItem } from 'vant';
import Vue from "vue";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);
export default {
  name: "tipsSwipe",
  props: {
    list: {
      type: Array,
      default() {
        return [
            '恭喜132****5642获得（1元）红包奖励',
            '恭喜132****5642获得（1元）红包奖励',
            '恭喜132****5642获得（1元）红包奖励',
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.get-prize-tips {
  z-index: 9;
  width: 330px;
  height: 40px;
  background-image: url("./tipsBg.png");
  background-repeat: no-repeat;
  background-size: 330px 40px;

  .item {
    font-size: 20px;
    font-family: FZLanTingHei-M-GBK;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.53rem;
    //transform: scale(0.9);
    text-align: center;
  }
}
</style>
