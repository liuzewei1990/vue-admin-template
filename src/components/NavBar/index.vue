
<template>
  <!-- layout顶部 公司名与用户信息操作区域-->
  <div class="my-header">
    <!-- 导航收缩 -->
    <div @click="isCollapsefn" class="head-l">
      <span :class="[isCollapseicon?'isCollapseicon':'','icon-recycling','collapse-button']"></span>
    </div>

    <!-- 标签页 -->
    <tags-view></tags-view>

    <div class="head-r">

      <!-- 全屏显示 -->
      <i title="全屏显示" class="el-icon-rank fullpage-icont" @click="fullPageHandle()"></i>

      <!-- 换肤 -->
      <!-- <theme-picker class="theme-picker"></theme-picker> -->

      <!-- 通知 -->
      <el-popover popper-class="msg-tooltip" placement="bottom-start" ref="popover2" width="300" trigger="click">
        <el-tabs v-model="msgName" @tab-click="msgFn">
          <el-tab-pane :label="'通知 ('+noticeCount+')'" name="notice">
            <div v-if="noticeCount>0?false:true" class="nomsg-box">
              <img :src="require('@src/assets/images/noNotice-pc.png')" alt="">
              <p>你已查看所有通知</p>
            </div>
            <div v-if="noticeCount>0?true:false" class="msg-list">
              <div v-for="(item,index) in noticeList" :key="index" class="list notice">
                <div class="icon-box">
                  <i class="el-icon-message"></i>
                </div>
                <div class="content">
                  <p>{{item.content}}</p>
                  <p class="time">{{item.time}}</p>
                </div>
              </div>
              <div @click="clearmgsFn" class="but">
                清空信息
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-popover>

      <div v-popover:popover2 title="信息" class="hover-back message-box">
        <el-badge :value="noticeCount" :max="999" class="item" id="messageIcon">
          <span class="icon-news"></span>
        </el-badge>
      </div>

      <myp-admin-operation></myp-admin-operation>
    </div>

  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
// msg start
.nomsg-box {
  padding: 73px 0 88px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}
.msg-list {
  .list {
    padding: 10px 10px;
  }
  .notice {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: stretch;
    .icon-box {
      font-size: 24px;
      width: 40px;
      flex-basis: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content {
      flex: 1;
      .title {
      }
      .time {
        font-size: 12px;
        padding: 5px 0;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .but {
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #eee;
    cursor: pointer;
  }
}
.msg-tooltip {
  padding: 0px !important;
}
.el-tabs__nav-scroll {
  padding: 0 10px;
}
// msg end
</style>
<style lang='scss' scoped>
/*重置样式*/
@mixin my-transition($attr, $section) {
  transition: $attr $section;
  -moz-transition: $attr $section;
  -webkit-transition: $attr $section;
  -o-transition: $attr $section;
} //声明一个带有参数$radius的混合宏
.my-header {
  // z-index: 10;
  // background-color: #fff;
  // box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
  color: #333;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  // padding: 0px !important;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;
  // height: 54px !important;

  .theme-picker {
    margin-right: 10px;
  }
  .tags-box {
    flex: 1;
    height: 100%;
    .tags-view-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .fullpage-icont {
    font-size: 25px;
    transform: rotate(45deg);
    margin-right: 10px;
    cursor: pointer;
  }
  .color-picker {
    display: inline-block;
  }
  .hover-back {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    padding: 0 5px;
    min-width: 50px;
    &.message-box {
      margin-right: 10px;
    }
    &:hover,
    &.message-box.active {
      outline: none;
      @include my-transition(background, 0.8s);
      background: rgba(0, 193, 223, 0.2);
      cursor: pointer;
    }
  }

  .head-l {
    width: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    vertical-align: middle;
    .isCollapseicon {
      transform: rotate(180deg); /* Safari 和 Chrome */
    }
    &:hover {
      @include my-transition(background, 0.8s);
      background: rgba(0, 193, 223, 0.2);
      cursor: pointer;
    }
    .collapse-button {
      font-size: 25px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .tagbox {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .head-r {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding-right: 20px;
    .icon-news {
      font-size: 18px;
    }
    .el-badge {
      line-height: 0;
      // padding: 0 10px;
      // margin-right: 30px;
      &.active {
        animation: tada 3s infinite !important;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .el-header {
    display: none;
  }
}
</style>

<script>
import $ from "jquery";
import screenfull from "screenfull";
import TagsView from "@src/components/TagsView"; // 面包屑
import ThemePicker from "@src/components/ThemePicker"; // 选色器
import AdminOperation from "@src/components/AdminOperation"; // 管理员信息操作
export default {
  name: "navbar",
  components: {
    TagsView,
    ThemePicker,
    "myp-admin-operation": AdminOperation
  },
  data() {
    return {
      msgName: 'notice',
      noticeList: []
    };
  },
  computed: {
    isCollapseicon() {
      //菜单是否收起
      return this.$store.state.userInfoAndMenu.isCollapse;
    },
    noticeCount() {
      return this.$store.state.acceptMessage.noticeCount;
    },
    noticeData() {
      return this.$store.state.acceptMessage.noticeData;
    }
  },
  created() {
    this.noticeFn()
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        if (this.$route.name == "message-list") {
          $(".hover-back").addClass('active')
        } else {
          $(".hover-back").removeClass('active')
        }
      })
    },
    noticeCount(value) {
      // alert('有新通知！');
      this.$nextTick(() => {
      })
    },
    // 新通知内容
    noticeData(val) {
      this.noticeFn();
    },
  },
  methods: {
    isCollapsefn() {
      this.$store.commit("SidebarHandle");
    },
    clearmgsFn() {
      this.$store.commit("noticeClear");
    },
    noticeFn() {
      let arr = [];
      this.noticeData.forEach(item => {
        let obj = JSON.parse(item.data);
        arr.push({
          content: JSON.parse(obj.content).data,
          time: obj.triggerTime,
          receiveBusinessNo: obj.receiveBusinessNo
        })
        this.noticeList = arr
      });
    },
    // 全屏幕显示
    fullPageHandle(element) {
      if (!screenfull.enabled) {
        this.$message({
          message: "很抱歉，您的浏览器不支持次功能",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    msgFn(tab, event) {
    }
  }
};
</script>