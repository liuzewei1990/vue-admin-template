<template>
  <el-container class="layout-main-page">

    <!-- 左侧导航 -->
    <side-bar></side-bar>

    <!-- 右侧内容 -->
    <el-container>

      <el-header height="54px" class="layout-main-header">
        <nav-bar></nav-bar>
      </el-header>

      <el-main class="layout-main-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
  }
};
</script>

<style lang='scss' scoped>
.layout-main-page {
  height: 100vh;
}

.layout-main-header {
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
.layout-main-content {
  position: relative;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
}
</style>
