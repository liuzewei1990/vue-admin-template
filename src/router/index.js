import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex';

// 布局模块
import layout from '@src/views/layout/layout';

//基础模块
import login from "./login/login";
import home from "./home/home";
import error from "./error/error";
const route404 = { path: "*", redirect: "/error" };

// 业务模块
import orderQuery from "./order/orderQuery";
// import userinfo from "./userinfo/userinfo";
import refund from "./refund";

Vue.use(Router)
const router = new Router({
    routes: [

        { path: '/', redirect: "/home" },
        login
    ]
})

const asyncRouter = [
    ...refund
];

function filterRouter(data, asyncRouter, back) {
    let menuList = data || [];
    let newMenulist = [];
    console.log(menuList);
    let thisrouter = []
    if (menuList.length > 0) {
        menuList.forEach((item, index) => {
            // 根据路径匹配到的router对象添加到routers中即可
            // 因permission数据格式不一定相同，所以不写详细逻辑了
            let hasChild = 0;
            let childArr = [];
            for (var i = 0; i < item.child.length; i++) {
                asyncRouter.forEach((item2, index) => {
                    if (item2.path.replace(/\//, "") == item.child[i].menuCode) {
                        hasChild++;
                        thisrouter.push(item2);
                        //菜单处理
                        hasChild++;
                        childArr.push(item.child[i])
                    }
                })
            }
            // if (hasChild > 0) {
            // 该判断为是：菜单显示是否受路由限制（某菜单的路由配置好了，才会显示某菜单）
            let parentMenu = { ...item };
            parentMenu.child = [...childArr];
            newMenulist.push(parentMenu)
            // }
            if (index == menuList.length - 1 && thisrouter.length != 0) {
                back(thisrouter)
            }
        });
    }
    store.commit('setMenuList', [...newMenulist]);
}
/**
 * 根据异步路由表中的path字段进行匹配，生成需要添加的路由对象
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter, back) {
    var menuList = permission;
    filterRouter(menuList, asyncRouter, (thisrouter) => {
        back(thisrouter);
    })
}
router.beforeEach((to, redirect, next) => {
    let menuList = store.state.userInfoAndMenu.menuList;

    //进入检测用户是否登录
    if (localStorage.getItem("isLogin") == "100") {
        if (to.path == "/login") {
            next('/home')
        } else if (!menuList.some((r) => r)) {
            document.body.className = "document-loading";
            // 获取权限路由
            store.dispatch('UserMenulistFetch').then(menuList => {
                if (menuList instanceof Array) {
                    routerMatch(menuList, asyncRouter, (thisrouter) => {
                        let rou = [{
                            path: '',
                            component: layout,
                            children: [home, error, ...thisrouter, route404]
                        }]
                        // rou.push(route404)
                        router.addRoutes(rou)
                        setTimeout(() => {
                            next({ ...to, replace: true })
                            document.body.className = "";
                        }, 500)
                    })
                } else {
                    alert("数据出错啦~ 请尝试重新登录或联系管理员！code:menu")
                    localStorage.setItem("isLogin", 0);
                    location.reload();
                }
            })
        } else {
            next()
        }
    } else {
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    }
})


export default router;
