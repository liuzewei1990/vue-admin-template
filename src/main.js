
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import router from './router';
import store from './vuex';
import App from './App';

import 'element-ui/lib/theme-chalk/index.css'; // 默认的皮肤
// import './assets/scss-pc/theme-change.scss' // 更改皮肤
import element from "element-ui";
import locale from 'element-ui/lib/locale/lang/en';

import contentLayout from '@src/view-layout/content-layout';
import filter from '@src/common/filter';
import zh from '@src/lang/zh';
import en from '@src/lang/en';
import "@src/assets/scss/reset.scss";
import "@src/assets/icons/style.css";

Vue.use(filter);
Vue.component(contentLayout.name, contentLayout);
Vue.use(element, { locale });
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || 'en', // 语言标识
  messages: {
    "zh": zh,
    "en": en
  }
})

var vue = new Vue({
  el: '#app',
  store,
  i18n,
  router: router,
  template: '<App/>',
  components: { App }
})
