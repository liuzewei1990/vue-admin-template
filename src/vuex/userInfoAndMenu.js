
import menujson from "@src/data/menu.json"
import { getMenu } from "@src/apis"
const userInfoAndMenu = {
    state: {
        userMessage: { // 管理员信息
            all: "",
            realname: "用户名", // 登录名称
            username: "" //登录账号
        },
        isAdmin: false,
        isOperate: false,
        isBranchOffice: false,
        menuList: [], // 菜单列表信息
        menuListApp: [], // 菜单列表信息-移动端用
        isCollapse: false,//菜单收起
    },
    getters: {
    },
    mutations: {
        //菜单收起展开操作
        SidebarHandle (state) {
            state.isCollapse = !state.isCollapse
        },
        modifyData (state, data) { // 接受后台接口数据并传给state
            var data = data.data;
            state.userMessage.realname = data.realname //管理员名称
            state.userMessage.username = data.username // 登录账号
            state.userMessage.bussinessNo = data.bussinessNo // 登录账号
            state.userMessage.resetPasswordStatus = data.resetPasswordStatus // 登录账号
            state.menuList = data.menuList
        },
        //设置路由对应的菜单
        setMenuList (state, menuList) {
            state.menuList = menuList;
        }
    },
    actions: {

        // 获取menu菜单
        userMenulistFetch (context) {
            return new Promise((resolve, reject) => {
                getMenu().then((res) => {
                    if (res.code === "00" && res.data instanceof Object) {
                        context.commit('modifyData', res);
                        resolve(res.data.menuList);
                    } else {
                        reject({})
                        alert(res.msg)
                    }
                })
            })
        }
    },
    modules: {
    }
};

export default userInfoAndMenu
