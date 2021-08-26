// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
// AJAX 資料
import axios from 'axios';
import VueAxios from 'vue-axios';
//表單驗證
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';
// 讀取畫面
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


//bootstrap
import 'bootstrap';
//路由
import router from './router';
//Vuex
import store from './store';

import App from './App';
import './bus';
// 數字千分號
import currencyFilter from './filters/currency';
//日期轉換
import dateFilter from './filters/date';


Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(Vuex);

// 表單
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

// 讀取畫面
Vue.component('Loading', Loading);
// 數字千分號
Vue.filter('currency', currencyFilter);
//日期轉換
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})


//驗證登入
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.API_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {        
        next();
      }else{
        next({
          path:'/login'
        });
      }
    });
  } else {
    next();
  }
})