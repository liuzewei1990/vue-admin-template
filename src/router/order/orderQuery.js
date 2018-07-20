
import loading from "@src/router/loading"
export default [
  {
    name: 'orderQuery',
    path: '/orderQuery',
    meta: {
      title: '订单查询',
      keepAlive: true,
      requiresAuth: true
    },
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/orders/orderQuery")) }, "order")
    }
  }
]