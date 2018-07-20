<template>
  <el-container class="layout-full-page">
    <!-- 左侧导航 -->
    <side-bar :isCollapse="isCollapse" class="layout-sldebar"></side-bar>
    <!-- 右侧内容 -->
    <el-container>
      <el-header height="54px" class="myp-header">
        <nav-bar></nav-bar>
      </el-header>
      <el-main class="myp-el-main">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!-- <keep-alive :include="$store.state.tagsView.cachedViews">
          <router-view></router-view>
        </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import NavBar from "@src/components/NavBar";
import SideBar from "@src/components/SideBar";

export default {
  name: "layout",
  components: {
    NavBar,
    SideBar
  },
  data() {
    return {
      isCollapse: true
    }
  },
  mounted() {
  }
};
</script>

<style lang='scss'>
.myp-header {
  padding: 0px !important;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
  color: #333;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0px !important;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 54px !important;
}
.el-main.myp-el-main {
  position: relative;
  padding: 0px !important;
  text-align: left;
}
.layout-full-page {
  height: 100vh;
}
.layout-page {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  align-items: stretch;
  .layout-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: stretch;
  }
}
.layout-fade-enter-active,
.layout-fade-leave-active {
  transition: opacity 0.5s;
}
.layout-fade-enter,
.layout-fade-leave-to {
  opacity: 0;
}

.table-main {
  width: 100%;
  height: 100%;
}

.el-header,
.el-footer {
  color: #333;
  text-align: center;
}

.el-aside {
  color: #333;
  text-align: center;
}

.el-main {
  color: #333;
  text-align: center;
}
</style>
