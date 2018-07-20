import loading from "@src/router/loading"
export default [
  {
    name: 'customerInfo',
    path: '/customerInfo',
    meta: {
      title: '商户信息',
      keepAlive: true,
      requiresAuth: true
    },
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/userInfo/customerInfo")) }, "customer-info")
    },
  },
  // 产品费率
  {
    name: 'productInfo',
    path: '/productInfo',
    meta: {
      title: '产品费率',
      keepAlive: true,
      requiresAuth: true,
    },
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/userInfo/productInfo")) }, "product-info")
    }
  }
]