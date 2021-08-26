import axios from 'axios';
import router from '../router';

export default {
  // state 屬於模組區域變數
  // actions, mutations, getters 屬於模組全域變數
  namespaced: true, // 更改 actions, mutations, getters 為區域變數
  state: {
    // 資料
  },
  actions: {
    // 方法跟 method 差不多
    logout(context) {
      const api = `${process.env.API_PATH}/logout`;
      context.commit('LOADING', true, { root: true });
      axios.post(api).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          context.commit('LOADING', false, { root: true });
          context.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          },{root: true});
          router.push('/');    
          // bus.$emit("message:push", response.data.message, "success");
          context.dispatch('getStatus', '', { root: true });          
        }
      });
    },
    goProducts() {
      router.push('/admin/products');
    },
    goCart() {
      router.push('/cart');
    },
    goConnection() {
      router.push('/connection');
    },
  },
};
