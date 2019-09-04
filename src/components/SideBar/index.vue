<template>
  <div class="aside-box">
    <div class="scroll-view-box">
      <!-- background-color="#001529" -->
      <el-menu class="el-menu-vertical" :collapse-transition="false" :unique-opened="true" text-color="#878d99" background-color="#001529" :router="isrouter" :default-openeds="defaultOpeneds" :default-active="defaultActive" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
        <!-- <el-menu  :show-timeout="200" :hide-timeout="200" class="el-menu-vertical" :unique-opened="true" text-color="#878d99" :router="isrouter" :default-openeds="defaultOpeneds" :default-active="defaultActive" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse" > -->
        <div :class="'logo-box'" ref="logoBox">
          <div class="img-box">
            <img :src="require('@src/assets/images/logo.png')" alt="">
          </div>
          <h1 v-if="!isCollapse" :class="'home-title'">
            <h3>
              <router-link to="/home">Admin管理系统</router-link>
            </h3>
          </h1>
        </div>
        <!-- <iscroll-view class="scroll-view" ref="iscroll" :options="iscrollOptions"> -->
        <el-submenu v-for="(item, index) in menuList" :index="item.menuCode" :key="index">
          <template slot="title">
            <i :class="'icon icon-'+item.menuCode"></i>
            <span v-if="!isCollapse" slot="title">{{item.menuName}}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.menuCode">
            {{item2.menuName}}
          </el-menu-item>
        </el-submenu>
        <!-- </iscroll-view> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import IScrollView from "vue-iscroll-view";
import IScroll from "iscroll";
Vue.use(IScrollView, IScroll);

export default {
  data() {
    //密码修改表单内容
    return {
      defaultActive: "", //
      defaultOpeneds: [],
      isrouter: true, // 开启路由
      iscrollOptions: {
        scrollbars: true,
        mouseWheel: true,
        useTransform: true, //CSS转化
        useTransition: true //CSS过渡
      },
      isCollapseSize: "",
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.userInfoAndMenu.isCollapse;
    },
    menuList() {
      return this.$store.state.userInfoAndMenu.menuList;
    }
  },
  mounted() {
    this.defaultActiveOpen();
    this.resetScrollViewHeight();
  },
  methods: {
    handleOpen(key, keyPath) {
      this.resetScrollViewHeight();
    },
    handleClose(key, keyPath) {
      this.resetScrollViewHeight();
    },
    handleSelect(key, keyPath) { },
    resetScrollViewHeight() {
      setTimeout(() => {
        // this.$refs.iscroll.refresh();
      }, 500);
    },
    defaultActiveOpen() {
      // 默认展开菜单
      let activePath = this.$route.path.replace("/", "");
      this.defaultActive = activePath;
    }
  },
  watch: {
    isCollapse(value) {
      if (value) {
        // 菜单横向收缩
        this.isCollapseSize = "isCollapseSmall"
      } else {
        // 菜单横向打开
        this.defaultActiveOpen();
        this.resetScrollViewHeight();
        this.isCollapseSize = "isCollapseBig"
      }
    }
  }
};
</script>


<style lang='scss' scoped>
.aside-box {
  position: relative;
  height: 100%;
  box-shadow: 2px 3px 8px rgba(105, 105, 105, 0.8);
  z-index: 1000;
  .logo-box {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: start;
    box-sizing: border-box;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    background: #002240;
    color: #fff;
    box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
    position: relative;
    z-index: 1;
    height: 80px;
    .img-box {
      display: inline-block;
      img {
        height: 30px;
      }
    }
    .home-title {
      padding: 0px;
      line-height: 0;
      display: inline-block;
      padding-left: 5px;
      font-size: 16px;
      font-weight: 400;
      white-space: nowrap;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Chrome/Safari/Opera */
      -khtml-user-select: none; /* Konqueror */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      a {
        color: #fff;
      }
    }
  }

  .scroll-view-box {
    height: 100%;
    width: 100%;
    display: flex;
    .scroll-view {
      width: 100%;
      top: 60px;
      position: absolute;
      bottom: 0px;
      z-index: 100;
    }
  }
  .el-menu--collapse {
    .el-submenu:hover {
      background: #000c17 !important;
    }
    .el-submenu__icon-arrow {
      display: none;
    }
    .icon {
      padding-right: 17px;
    }
  }

  // /*重置样式 start*/
  .el-menu-vertical:not(.el-menu--collapse) {
    /*设置宽度才会有缓动动画*/
    width: 200px;
    min-height: 400px;
    position: relative;
    height: 100%;
  }
  .myp-menu-active {
    li {
      background: #00c1df;
      &:hover,
      &:focus {
        background: #00c1df;
        color: #fff;
      }
    }
  }

  .el-menu {
    border-right: 0;
    .el-dropdown-link {
      cursor: pointer;
    }
    .el-submenu__title {
      text-indent: 10px;
      padding-left: 8px !important;
      i {
        padding-right: 5px;
      }
      &:hover {
        background: transparent !important;
        color: #fff !important;
        .icon {
          color: #fff !important;
        }
      }
    }
    .icon {
      font-size: 30px;
    }
    .el-menu-item {
      background: #000c17 !important;
      color: #878d99 !important;
      text-indent: 18px;
      &:hover {
        color: #fff !important;
        transition: color 0.8s;
      }
      &.is-active {
        background: #1890ff !important;
        color: #fff !important;
      }
    }
  }
  // 重置样式end
}
</style>
