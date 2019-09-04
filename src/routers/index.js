
// 【基础路由】 它们是默认注册到路由表中，且不需要登录即可访问的
import login from "./login/login";
export const defaultRouters = [
    ...login
];
console.log("defaultRouters:", defaultRouters)




// 【权限路由】 它们是异步注册到路由表中，需要登录之后即可访问的
import home from "./home/home";
import error from "./error";
export const authRouters = [
    ...home,
    ...error
]
console.log("authRouters:", authRouters)




// 【异步路由】 它们是异步注册到路由表中，需要登录之后即可访问的，需要根据API返回的菜单列表匹配注册
import customer from "./customer";
import refund from "./refund";
import admin from "./admin";
export const asyncRouters = [
    ...refund,
    ...customer,
    ...admin
];
console.log("asyncRouters:", asyncRouters)
