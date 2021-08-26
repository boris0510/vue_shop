import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import alertModules from './alertMessage';
import navbarModules from './navbar';
import productsModules from './products';
import cartModules from './cart';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 資料
    isLoading: false,  
    status: false,
  },
  actions: {
    // 方法跟 method 差不多
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getStatus(context) {
      context.commit('LOADING', true);
      const api = `${process.env.API_PATH}/api/user/check`;
      axios.post(api).then((response) => {
        if (response.data.success) {
          context.commit('STATUS', response.data.success);
        }else{
          context.commit('STATUS', response.data.success);
        }
        context.commit('LOADING', false);  
      });
    },
    
  },
  mutations: {
    // 把資料傳到state儲存 ， 類似 computed
    STATUS(state, payload) {
      state.status = payload;
    },
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    
  },
  getters: {
    status(state) {
      return state.status;
    },
    isLoading(state) {
      return state.isLoading;
    },
    
  },
  modules: {
    alertModules, 
    navbarModules,
    productsModules,
    cartModules,
  },
});
