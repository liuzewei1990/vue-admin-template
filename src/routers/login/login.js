

/**
 * 登录模块
 */
export default [
    {
        name: "login",
        path: "/login",
        meta: {
            title: '登陆',
            requiresAuth: true,
            keepAlive: true
        },
        component: r => require.ensure([], () => r(require("@src/views/login/login")), "login")
    }
]

