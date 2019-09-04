
export default [
    {
        name: 'role',
        path: '/role',
        component: r => require.ensure([], () => r(require("@src/views/admin/role")), "role"),
        meta: {
            title: '角色管理',
            keepAlive: true,
            requiresAuth: true
        },
    },
    {
        name: 'user',
        path: '/user',
        component: r => require.ensure([], () => r(require("@src/views/admin/user")), "user"),
        meta: {
            title: '用户管理',
            keepAlive: true,
            requiresAuth: true,
        },
    },
    {
        name: 'menu',
        path: '/menu',
        component: r => require.ensure([], () => r(require("@src/views/admin/menu")), "menu"),
        meta: {
            title: '菜单管理',
            keepAlive: true,
            requiresAuth: true,
        },
    }
]