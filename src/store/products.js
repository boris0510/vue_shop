import axios from 'axios';
import $ from "jquery";

export default {
  // state 屬於模組區域變數
  // actions, mutations, getters 屬於模組全域變數
  namespaced: true, // 更改 actions, mutations, getters 為區域變數
  state: {
    // 資料
    products: [],  
    product: {},
    categories: [],
  },
  actions: {
    // 方法跟 method 差不多
    getProducts(context, page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('CATEGORIES', response.data.products);
        console.log('取得產品列表:', response);
        context.commit('LOADING', false, { root: true });
      });
    },
    getProduct(context, id) {
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/product/${id}`;
      axios.get(api).then((response) => {
        context.commit('PRODUCT', response.data.product);
        $("#productModal").modal("show");
      });
    },
  },
  mutations: {
    // 把資料傳到state儲存，類似 computed
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    product(state) {
      return state.product;
    },
    categories(state) {
      return state.categories;
    },
  },
};
