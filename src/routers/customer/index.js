
export default [
    {
        name: 'customerlist',
        path: '/customerlist',
        meta: {
            title: '商户信息',
            keepAlive: true,
            requiresAuth: true
        },
        component: r => require.ensure([], () => r(require("@src/views/customer/customerInfo")), "customerInfo")
    },
    // 产品费率
    {
        name: 'bankCustomer',
        path: '/bankCustomer',
        meta: {
            title: '产品费率',
            keepAlive: true,
            requiresAuth: true,
        },
        component: r => require.ensure([], () => r(require("@src/views/customer/bankCustomer")), "bankCustomer")
    }
]