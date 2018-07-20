import Vue from "vue";
import Vuex from "vuex";

import userInfoAndMenu from "@src/vuex/userInfoAndMenu";
import tagsView from "@src/vuex/tagsView";
import acceptMessage from "@src/vuex/acceptMessage";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {},
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
