<template>
     <!-- <img ref="slot" class="game-slot"
       @touchstart.stop.prevent="touchstart"
       @touchmove.stop.prevent="touchmove"
       @touchend.stop.prevent="touchend"
       src="../../assets/images/gold/slot.png" alt=""> -->
  <div ref="slot" class="game-slot" id='Game2' @touchstart.stop.prevent="touchstart"
       @touchmove.stop.prevent="touchmove"
       @touchend.stop.prevent="touchend">
       <img  src="../../assets/images/gold/bgold.png" alt="" class='bgold'>
       <img  src="../../assets/images/gold/tgold.png" alt="" class='tgold'>
  </div>
</template>

<script>

export default {
  name: "slotImg",
  data() {
    return {
      canDrag: false,
      // 偏移
      inset: {
        left: 0,
        top: 0,
      },
      // 移动
      move: {},
      // 位置
      position: {
        left: 0,
        top: 0,
      },
      // 初始位置
      positionOld: {},
    }
  },
  mounted() {
    this.initPosition();
  },
  methods: {
    initPosition() {
      this.positionOld = this.getPosition(this.dragSlot);
      this.$emit('slotPostion', {...this.positionOld})
    },
    touchstart() {
      if (!this.canDrag) {
        // 获取ball-container位置
        this.positionOld = this.getPosition(this.dragSlot);
        this.position = {...this.positionOld};
        console.log(this.position);
        this.$emit('slotPostion', this.position)
        this.canDrag = true;
      }
    },
    touchmove(e) {
      if (this.canDrag) {
        let left = e.targetTouches[0].clientX;
        let top = e.targetTouches[0].clientY;
        const {height} = this.position;
        const {width} = this.position;
        // const bottom = top + height;
        // 固定只能左右移动
        // left = this.positionOld.left;
        top = this.positionOld.top;
        // const right = left + width;
        if (left < 80) {
          left = 80;
        } else if (left > (window.innerWidth - this.dragSlot.offsetWidth)) {
          left = window.innerWidth - this.dragSlot.offsetWidth;
        }

        // if (top < this.ballContainerPosition.top) {
        //   top = this.ballContainerPosition.top;
        // } else if (top > (window.innerHeight - this.dragSlot.offsetHeight)) {
        //   top = window.innerHeight - this.dragSlot.offsetHeight;
        // }
        //
        // if (bottom > this.ballContainerPosition.top + this.ballContainerPosition.height) {
        //   top = this.ballContainerPosition.top
        //       + this.ballContainerPosition.height - this.position.height;
        // }
        //
        // if (right > this.ballContainerPosition.left + this.ballContainerPosition.width) {
        //   left = this.ballContainerPosition.left
        //       + this.ballContainerPosition.width - this.position.width;
        // }

        this.dragSlot.style.left = `${left}px`;
        this.dragSlot.style.top = `${top}px`;
        this.move = {
          x: left - this.positionOld.left,
          y: top - this.positionOld.top,
        };
        this.position = {
          left, top, height, width,
        };
        this.$emit('slotPostion', this.position)
        console.log(' this.position---', this.position)

      }
    },
    touchend() {
      this.dragSlot.style.left = `${this.position.left}px`;
      this.dragSlot.style.top = `${this.position.top}px`;
      this.inset = {};
      this.move = {};
      // this.position = {};
      this.canDrag = false;
    },
    // 获取dom的绝对位置
    getPosition(source) {
      let left = source.offsetLeft; // 获取元素相对于其父元素的left值var left
      let top = source.offsetTop;
      const width = source.offsetWidth;
      const height = source.offsetHeight;
      let current = source.offsetParent; // 取得元素的offsetParent // 一直循环直到根元素
      while (current != null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
      }
      return {
        left,
        top,
        width,
        height,
      };
    },
  },
  computed: {
    dragSlot() {
      return this.$refs.slot;
    },
  },
}
</script>

<style scoped lang="less" >
.game-slot{
  position: relative;
  .tgold{
   width: 156px;
   height: auto;
   position: absolute;
  z-index: 66;
 }
 .bgold{
   width: 103px;
   height: auto;
   position: absolute;
   left: 25px;
   top: 2px;
   z-index: 1;
 }
}

</style>