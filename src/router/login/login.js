import loading from "@src/router/loading"

/**
 * 登录模块
 */
export default {
  name: "login",
  path: "/login",
  meta: {
    title: '登陆',
    requiresAuth: true,
    keepAlive: true
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/login/login")) }, "login")
  }
}

