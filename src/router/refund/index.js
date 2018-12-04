import loading from "@src/router/loading"
export default [
    {
        name: 'refund',
        path: '/refund',
        meta: {
            title: '交易退款',
            keepAlive: true,
            requiresAuth: true
        },
        component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views/refund/refund")) }, "refund")
        },
    },
    // 产品费率
    {
        name: 'refundQuery',
        path: '/refundQuery',
        meta: {
            title: '退款查询',
            keepAlive: true,
            requiresAuth: true,
        },
        component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views/refund/refundQuery")) }, "refundQuery")
        }
    }
]