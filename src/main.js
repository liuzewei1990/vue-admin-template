import Vue from "vue";
import router from "./middleware/routerController.js";
import store from "./vuex";
import App from "./App";

import "element-ui/lib/theme-chalk/index.css"; // 默认的皮肤
// import './assets/scss-pc/theme-change.scss' // 更改皮肤
import element from "element-ui";
import contentLayout from "@src/layout/content-layout";
import filter from "@src/common/filter";
import directives from "@src/common/directives";
import zh from "@src/lang/zh";
import en from "@src/lang/en";
import "@src/assets/scss/reset.scss";
import "@src/assets/icons/style.css";

Vue.use(filter);
Vue.use(directives);
Vue.component(contentLayout.name, contentLayout);
Vue.use(element);

var vue = new Vue({
    el: "#app",
    store: store,
    router: router,
    template: "<App/>",
    components: { App }
});
