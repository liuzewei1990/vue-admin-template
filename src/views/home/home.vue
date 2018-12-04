<template>
  <div class="welcome-page">
    <div class="welcome">
      <h2>{{$t("home.title")}}</h2>
      <ul>
        <li v-for="(item,index) in $t('home.introduce')" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="img-box">
      <img src="http://tm.yeepiao.com/static/img/homeSlogen.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      menuList: "", // 菜单数据
      isrouter: true, // 开启路由
      isCollapse: false, // 菜单收起
      docUrl: "", // 操作手册下载地址
      downloadPower: false,
      // introduce: this.$t('home.introduce')
    };
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.welcome-page {
  padding: 40px;
  // position: relative;
  // width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .welcome {
    text-align: left;
    h2 {
      color: #1890ff;
      font-size: 32px;
      font-weight: normal;
      padding: 20px 0;
    }
    ul {
      li {
        list-style: none;
        line-height: 30px;
        color: #333333;
        &::before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 10px;
          border-radius: 100%;
          background: #1890ff;
        }
        .docUrl {
          color: red;
          text-decoration: underline;
        }
      }
    }
  }
  .img-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40%;
    img {
      width: 100%;
    }
  }
}
</style>
