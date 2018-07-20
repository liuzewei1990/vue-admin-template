
import Vue from 'vue';
import router from './router';
import store from './vuex';
import App from './App';

import "@src/assets/icons/style.css";
import "@src/assets/scss-pc/reset.scss";

import 'element-ui/lib/theme-chalk/index.css' // 默认的皮肤
// import './assets/scss-pc/theme-change.scss' // 更改皮肤
import element from "element-ui";
Vue.use(element)

var vue = new Vue({
  el: '#app',
  store,
  router: router,
  template: '<App/>',
  components: { App }
})
