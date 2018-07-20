<template>
  <div class="login-page">
    <div class="progressive-box">
    </div>
    <div class="login-main">
      <div class="content-box">
        <header class="header">
          <div class="logo-box">
            <img src="../../assets/images/logo.png" alt="">
          </div>
          <div class="slogen-box">Admin管理系统</div>
        </header>
        <!-- form start -->
        <div class="login-form">
          <el-form v-if="loginVisible" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm form-r">
            <el-form-item prop="username">
              <el-input class="input-reset" v-model="ruleForm.username" prefix-icon placeholder="请输入易票账号/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input class="input-reset" v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')" :loading="loading" size="medium" type="danger" class="login-button">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- form end -->
      </div>
    </div>
    <el-footer class="login-footer">
      <p>版权说明</p>
    </el-footer>
  </div>

</template>
<script>

import $ from "jquery";
var backImgUrl = "@src/assets/images/LoginBackSmall.png"
export default {
  name: "Login",
  data() {
    return {
      modifyPwdVisible: false,// 修改密码界面
      loginVisible: true,// 登录界面
      oaIpZf: "",
      backImg: backImgUrl,
      verificImgSrc: "",
      imgs: [
        {
          src: require('@src/assets/images/LoginBack.png'),
          preview: require('@src/assets/images/LoginBackSmall.png')
        }
      ],
      loading: false,
      ruleForm: {
        username: "",
        password: "",
        username: "admin",
        password: "123456",
        verification: ""
      },
      modifyPwdForm: {
        passWordOrg: '',
        loginPwd: '',
        confirmLoginPwd: ''
      },
      modifyPwdRules: {
        passWordOrg: [
          { required: true, message: "请输入有效密码", trigger: "change" }
        ],
        loginPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if (this.modifyPwdForm.confirmLoginPwd !== '') {
                  this.$refs.modifyPwdForm.validateField('confirmLoginPwd');
                }
                callback();
              }
            }, trigger: 'blur'
          }
        ],
        confirmLoginPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.modifyPwdForm.loginPwd) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      },
      rules: {
        username: [
          { required: true, message: "请输入易票账号/手机号", trigger: "blur,change" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur,change" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "change" }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    document.onkeydown = event => {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        this.submitForm("ruleForm");
      }
    };
    this.verificImgReload();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data_ = this.ruleForm;
          this.loading = true;
          localStorage.setItem("isLogin", "100");
          location.reload();
        }
        this.loading = false;
      });
    },
    verificImgReload() {
      this.verificImgSrc = `${this.oaIpZf + '/customerAdmin/code?' + Math.random()}`;
    },
    enterHandle() {
      this.$nextTick(() => {
        $(".login-button").click();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    console.log(process.env.NODE_ENV);
  }
};
</script>

<style lang='scss'>
$default-color: rgb(12, 11, 11); // 字体颜色
$center-width: 280px; // 表单宽度
html,
body {
  height: 100%;
  overflow: hidden;
}
.login-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/LoginBack.png) no-repeat center;
  background-size: cover;
  color: $default-color;
  display: flex;
  flex: 1;
  box-sizing: border-box;
  flex-direction: column;
  .login-main {
    padding: 0px;
    position: relative;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px;
  }
  .header {
    margin: 100px 0;
  }
  .logo-box {
    text-align: center;
    img {
      height: 80px;
      width: 80px;
    }
  }

  .slogen-box {
    margin-top: 20px;
    text-align: center;
    font-size: 30px;
    // font-family: slogenFont;
    color: #333333;
    letter-spacing: 2px;
    user-select: none; // font-weight: bold;
    img {
      width: 220px;
    }
  }
  .form-r {
    width: $center-width;
    margin: 0 auto;
  }
  .login-footer {
    text-align: center;
    z-index: 999;
    p {
      text-align: center;
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 30px;
    }
  }
  .login-button {
    width: 100%;
    margin-top: 15px;
    height: 40px;
    font-size: 18px;
    border-radius: 20px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    background: #e60012;
  }

  .input-reset {
    border-bottom: 1px solid $default-color;
    input {
      background: transparent;
      outline: none;
      border: 0px;
      color: $default-color;
      padding: 0;
      font-size: 18px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      &:focus,
      &:hover {
        background: none;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 18px;
        color: $default-color;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 18px;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 18px;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 18px;
      }
    }
  }
}

/*渐进式背景start*/

.progressive-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: block;
  overflow: hidden;
  height: 100%;
  .progressive {
    height: 100%;
    width: 100%;
    img {
      display: block;
      max-width: 100%;
      min-height: 100%;
      border: 0;
    }
  }
} // }
</style>