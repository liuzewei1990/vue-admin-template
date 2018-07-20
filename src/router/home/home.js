
import loading from "@src/router/loading";
export default {
  name: 'home',
  path: "/home",
  meta: {
    title: '首页',
    requiresAuth: true,
    keepAlive: true,
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/home/home")) }, "home")
  }
}