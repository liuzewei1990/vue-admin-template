
export default [
    {
        name: 'home',
        path: "/home",
        meta: {
            title: '首页',
            requiresAuth: true,
            keepAlive: true,
        },
        component: r => require.ensure([], () => r(require("@src/views/home/home")), "home")

    }
]