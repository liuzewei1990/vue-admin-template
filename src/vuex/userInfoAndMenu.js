
import menujson from "@src/data/menu.json"
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
        SidebarHandle(state) {
            state.isCollapse = !state.isCollapse
        },

        //设置路由对应的菜单
        setMenuList(state, menuList) {
            state.menuList = menuList;
        }
    },
    actions: {
        // 根据路由过滤菜单
        UserMenulistFetch(context) { // 获取‘用户信息‘与‘菜单列表‘数据
            return new Promise((resolve, reject) => {
                resolve(menujson)
            })
        }
    },
    modules: {
    }
};

export default userInfoAndMenu
