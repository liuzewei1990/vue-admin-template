import Vue from "vue";
import Vuex from "vuex";

import userInfoAndMenu from "@src/vuex/userInfoAndMenu";
import tagsView from "@src/vuex/tagsView";
import acceptMessage from "@src/vuex/acceptMessage";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: false,
    state: {
        loadingBar: 0,
        md5Key: "RSGUVWXYZ0123456",
        //退货订单号
        refundMerOrderNo: "",
        publicParams: {
            version: "1.0.0",
            customerNo: "",//20034585
            companyNo: "10077777"
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        //右侧菜单
        userInfoAndMenu,
        //顶部标签
        tagsView,
        //消息通知
        acceptMessage
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;
