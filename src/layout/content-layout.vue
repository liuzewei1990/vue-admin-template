<!-- 内容区通用布局组件,父级需要时flex布局 -->
<template>
  <div class='content-layout' :class="{fluid:!isFluid}">
    <!-- 搜索区域 -->
    <div class="content-search">
      <slot name="search"></slot>
    </div>
    <!-- 操作区域 -->
    <div class="content-action">
      <slot name="action"></slot>
    </div>
    <!-- 主体内容区域 -->
    <div class="content-main">
      <slot></slot>
    </div>
    <!-- 底部footer -->
    <div class="content-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
/**
 * props : 
 * fluid 是否采用流体布局 默认flex布局
*/
export default {
  name: "content-layout",
  components: {},
  props: { isFluid: { type: Boolean, default: false } },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.content-layout {
  padding: 10px;
  box-sizing: border-box;
}

.content-search {
  border-bottom: 1px solid #eee;
}

.content-main {
  padding: 10px 0;
  box-sizing: border-box;
  overflow: hidden;
}

//flex布局方案
.fluid {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  .content-main {
    flex: 1;
    overflow: hidden;
  }
}
</style>