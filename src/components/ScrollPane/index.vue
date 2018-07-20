
<template>
  <!-- 面包屑滚动区域-->
  <!-- <div> -->
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>

  </div>
  <!-- <slot name="preBut"></slot> -->
  <!-- <slot name="nextBut"></slot> -->
  <!-- </div> -->
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .scroll-wrapper {
    position: absolute;
  }
}
</style>

<script>
const padding = 15; // tag's padding
export default {
  name: "scrollPane",
  data() {
    return {
      left: 0
    };
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      const $container = this.$refs.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperWidth = $wrapper.offsetWidth;
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta);
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left;
          } else {
            this.left = Math.max(
              this.left + eventDelta,
              $containerWidth - $wrapperWidth - padding
            );
          }
        } else {
          this.left = 0;
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $targetLeft = $target.offsetLeft;
      const $targetWidth = $target.offsetWidth;
      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding;
      } else if (
        $targetLeft + padding > -this.left &&
        $targetLeft + $targetWidth < -this.left + $containerWidth - padding
      ) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding);
      }
    },
    preFn(targetWidth) {
      const $container = this.$refs.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $wrapper = this.$refs.scrollWrapper; // 内部滚动的
      const $wrapperLeft = this.$refs.scrollWrapper.offsetLeft; // 内部滚动的
      const $wrapperWidth = $wrapper.offsetWidth;
      if (this.left < 0) {
        let count = 0;
        let timer = setInterval(() => {
          if (count <= targetWidth) {
            count++;
            this.left = this.left + 1;
          } else {
            // this.left = 0;
            clearInterval(timer);
          }
        }, 0.1);
        // this.left = this.left + targetWidth
      }
    },
    preNext(targetWidth) {
      const $container = this.$refs.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperWidth = $wrapper.offsetWidth;
      if (this.left > ($containerWidth - $wrapperWidth)) {
        let count = 0;
        let timer = setInterval(() => {
          if (count <= targetWidth) {
            count++;
            this.left = this.left - 1;
          } else {
            // this.left = $containerWidth - $wrapperWidth;
            clearInterval(timer);
          }
        }, 0.1);
        // this.left = this.left - targetWidth
      }
    },
    scrollPaneInit() {
      this.left = 0;
    }
  }
};
</script>
