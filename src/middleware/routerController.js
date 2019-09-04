import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex';
import NProgress from 'nprogress';
import { defaultRouters, authRouters, asyncRouters } from "@src/routers";

// 主布局
import layout from '@src/layout/main.vue';

Vue.use(Router)
const router = new Router({
    routes: [
        { path: '/', redirect: "/home" },
        ...defaultRouters,
        // ...authRouters,
        // ...asyncRouters,
    ]
})


router.beforeEach((to, redirect, next) => {
    NProgress.start()
    let menuList = store.state.userInfoAndMenu.menuList;
    if (localStorage.getItem("isLogin") == "100") {

        if (to.path == "/login") {
            next('/home')
            NProgress.done()
        }

        else if (!menuList.some((r) => r)) {
            document.body.className = "document-loading";

            // store.dispatch('UserGetFetch').then((res) => {
            // }).catch((error) => {
            //     if (error == 'error') {
            //         console.log('出错了');
            //         localStorage.setItem("isLogin", "0");
            //         next("/login");
            //     }
            // })

            // 调用API接口获取menu数据
            store.dispatch('userMenulistFetch').then(menuList => {
                if (menuList instanceof Array) {
                    // menuList数据 与 异步路由进行匹配 返回可访问路由
                    console.log("menuList:", menuList)
                    filterRouter(menuList, asyncRouters, (thisrouter) => {
                        console.log("thisrouter:", thisrouter)
                        thisrouter = thisrouter.concat(authRouters);
                        thisrouter.push({ path: "*", redirect: "/error" })
                        let rou = [{
                            path: '',
                            component: layout,
                            children: thisrouter
                        }]
                        document.body.className = document.body.className + " document-loading-top";
                        router.addRoutes(rou)
                        setTimeout(() => {
                            next({ ...to, replace: true })
                            document.body.className = "";
                        }, 500)
                    })
                } else {
                    alert("请联系管理员配置菜单权限")
                    localStorage.removeItem("isLogin");
                    location.reload();
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            next()
        }
    } else {
        if (to.path == "/login") {
            next()
            NProgress.done()
        } else {
            next("/login")
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})


// 路由过滤
function filterRouter (menuList, asyncRouter, callback) {
    let newMenulist = [];
    let thisrouter = [];
    if (menuList.length > 0) {
        menuList.forEach((item, index) => {
            let hasChild = 0;
            let childArr = [];
            for (var i = 0; i < item.child.length; i++) {
                asyncRouter.forEach((item2, index) => {
                    if (item2.path.replace(/\//, "") == item.child[i].menuCode) {
                        hasChild++;
                        thisrouter.push(item2);
                        //菜单处理
                        // hasChild++;
                        childArr.push(item.child[i])
                    }
                })
            }
            if (hasChild > 0) { //路由配置的跟菜单的显示
                let parentMenu = { ...item };
                parentMenu.child = [...childArr];
                newMenulist.push(parentMenu)
            }
            if (index == menuList.length - 1 && thisrouter.length != 0) {
                callback(thisrouter)
            }
        });
    }
    if (newMenulist.length == 0) {
        alert("请检查 “异步路由” 与 “权限列表” 是否匹配！");
        localStorage.setItem("isLogin", 0);
        location.reload();
    } else {
        store.commit('setMenuList', [...newMenulist]);
    }
}


export default router;