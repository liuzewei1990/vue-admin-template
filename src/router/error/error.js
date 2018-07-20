
export default {
  name: "error",
  path: "/error",
  meta: {
    title: '页面404'
  },
  component: r => require.ensure([], () => { return r(require("@src/views/error/error")) }, "error")
}

