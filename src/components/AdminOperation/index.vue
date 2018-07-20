<template>
  <!-- 管理员信息操作 -->
  <div class="admin-operation-box hover-back">
    <el-dropdown trigger="click" :show-timeout="0" :hide-timeout="0">
      <span class="el-dropdown-link">
        <div class="user-img">
          <img :src="require('@src/assets/images/logo.png')" alt="">
          <span></span>
        </div>
        <div class="user-text">
          <i class="userimg"></i>{{userMsg.realname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
      <el-dropdown-menu class="dropdown-menu" slot="dropdown">
        <el-dropdown-item @click.native="dialogFormVisiblefn">
          <div class="icon-back">
            <i class="iconfont icon-Password"></i>
          </div>
          <span class="icon-text">密码修改</span>
        </el-dropdown-item>
        <el-dropdown-item @click.native="dialogUserVisiblefn">
          <div class="icon-back">
            <i class="iconfont icon-geren11"></i>
          </div>
          <span class="icon-text">个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item class="esc-item" :show-timeout="100" divided @click.native="escloginfn">
          <div class="icon-back">
            <i class="iconfont icon-tuichu"></i>
          </div>
          <span class="icon-text">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 管理员信息弹出框 -->
    <el-dialog center title="用户信息" :visible.sync="dialogUserVisible" :modal="ifmodal" :close-on-click-modal="ifmodalclose" :modal-append-to-body="ifappendbody" :append-to-body="ifappendbody" width="280px">
      <div class="detail-content">
        <div class="line-label-box">
          <span class="line-label">名称:</span> {{userMsg.realname}}
        </div>
        <div class="line-label-box">
          <span class="line-label">登录账号:</span> {{userMsg.username}}
        </div>
      </div>
    </el-dialog>
    <!-- 修改管理员密码 start -->
    <el-dialog :show-close="closeVisible" center title="修改密码" :visible.sync="dialogFormVisible" :modal="ifmodal" :close-on-click-modal="ifmodalclose" :modal-append-to-body="ifappendbody" :append-to-body="ifappendbody" width="450px">
      <el-form :model="resetPwform" ref="resetPwform" :rules="passwordRules">
        <el-form-item label="旧密码" prop="oldPassword" :label-width="formLabelWidth">
          <el-input id="oldPassword" type="password" v-model="resetPwform.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPwform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPwform.repassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="closeVisible" @click="resetFormfn('resetPwform')">取 消</el-button>
        <el-button type="primary" @click="submitFormfn('resetPwform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改管理员密码 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@mixin my-transition($attr, $section) {
  transition: $attr $section;
  -moz-transition: $attr $section;
  -webkit-transition: $attr $section;
  -o-transition: $attr $section;
} //声明一个带有参数$radius的混合宏
// .detail-content {
//   .line-label-box {
//     padding: 4px 2px;
//     .line-label {
//       // max-width: 100px;
//       display: inline-block;
//       padding: 0 10px;
//     }
//     &:nth-child(odd) {
//       // background-color: rgba(0, 193, 223, 0.1);
//       background: #fafafa;
//     }
//     &:nth-child(even) {
//       background-color: #fff;
//     }
//   }
// }
.admin-operation-box {
  .el-dropdown {
    height: 100%;
    display: flex;
    .el-dropdown-link {
      outline: none;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .user-img {
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
        outline: none;
        display: flex;
        &:focus,
        &:hover {
          outline: none;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          outline: none;
          &:focus,
          &:hover {
            outline: none;
          }
        }
      }
      .user-text {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
.dropdown-menu {
  padding: 0px !important;
  // display: flex;
  // align-items: stretch;
  .icon-back {
    display: inline-block;
    background: #f8f7f7;
    width: 30px;
    line-height: 35px;
    text-align: center;
    .iconfont {
      font-size: 14px;
    }
  }
  .icon-text {
    // border-left: 1px solid #e6ebf5;
    display: inline-block;
    padding-left: 10px;
    padding-right: 20px;
  }
  .el-dropdown-menu__item {
    white-space: nowrap;
    // line-height: 30px;
    border-bottom: 1px solid #e6ebf5;
    padding: 0px;
  }
  .el-dropdown-menu__item--divided {
    border-top: 0px;
    &:before {
      height: 1px;
    }
  }
  .esc-item {
    margin-top: 0px !important;
  }
}
@media screen and (max-width: 500px) {
  .el-header {
    display: none;
  }
}
</style>
<script>
export default {
  name: "AdminOperation",
  data() {
    var oldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var newPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度必须6到12位!"));
      } else if (value === this.resetPwform.oldPassword) {
        callback(new Error("新密码与旧密码不允许相同!"));
      } else {
        callback();
      }
    };
    var confirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else if (value !== this.resetPwform.password) {
        callback(new Error("输入的新密码请保持一致!"));
      } else {
        callback();
      }
    };
    return {
      closeVisible: true,//关闭按钮
      defaultPickerColor: "#00c1df",
      realname: "",
      dialogUserVisible: false, //管理员信息弹出框
      dialogFormVisible: false, // 密码修改窗口显示
      ifmodalclose: false, // 点击modal是否关闭
      ifmodal: true, //弹出框是否需要遮罩
      ifappendbody: true,
      formLabelWidth: "80px", //密码修改窗口大小
      resetPwform: {
        oldPassword: "", // 旧密码
        password: "", //新密码
        repassword: "" //确认密码
      },
      passwordRules: {
        oldPassword: [{ validator: oldPass, trigger: "blur,change" }],
        password: [{ validator: newPass, trigger: "blur,change" }],
        repassword: [{ validator: confirmPass, trigger: "blur,change" }]
      }
    };
  },

  methods: {

    dialogUserVisiblefn() {
      // 管理员信息弹出框
      this.dialogUserVisible = true;
    },
    dialogFormVisiblefn() {
      // 修改密码弹出框
      this.dialogFormVisible = true;
      this.closeVisible = true;
    },
    submitFormfn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("调用接口");
        } else {
          return false;
        }
      });
    },
    escloginfn() {
      localStorage.setItem("isLogin", "0");
      window.location.reload();
    },
    resetFormfn(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    // 按钮权限
    adminFilter(fileterName) {
      let fileter = this.$store.state.userInfoAndMenu.userMessage.all[fileterName]
      if (fileter == "TRUE") {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    userMsg() {
      return this.$store.state.userInfoAndMenu.userMessage;
    }
  },
  mounted() {
    if (this.adminFilter('resetPasswordStatus')) {
      this.closeVisible = false;
      this.dialogFormVisible = true;
    }
  }
};
</script>
