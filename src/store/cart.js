import axios from 'axios';
import router from '../router';
import '../bus';
import $ from "jquery";

export default {
  // state 屬於模組區域變數
  // actions, mutations, getters 屬於模組全域變數
  // namespaced: true, // 更改 actions, mutations, getters 為區域變數
  state: {
    // 資料
    cart: {
      carts: [],
    },
  },
  actions: {
    // 方法跟 method 差不多
    getCart(context) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/cart`;
      axios.get(api).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data);
        }
        context.commit('LOADING', false, { root: true });
        console.log('取得購物車', response.data.data);
      });
    },
    addtoCart(context, { id, qty }) {
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const item = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: item }).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('getCart');
        context.dispatch('updateMessage', {
          message: response.data.message,
          status: 'success',
        },);
        console.log('加入購物車:', response);
        $("#productModal").modal("hide");
      });
    },
    removeCart(context, id) {
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
        context.dispatch('updateMessage', {
          message: response.data.message,
          status: 'danger',
        },);
        // bus.$emit("message:push", response.data.message, "danger");
      });
    },   
    goConnection() {
      router.push("/connection");
    },
  },
  mutations: {
    // 把資料傳到state儲存，類似 computed
    CART(state, payload) {
      state.cart = payload;
    }, 
  },
  getters: {
    cart(state) {
      return state.cart;
    }, 
  },
};
