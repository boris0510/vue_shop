import axios from 'axios';

export default {
  // state 屬於模組區域變數
  // actions, mutations, getters 屬於模組全域變數
  namespaced: true, // 更改 actions, mutations, getters 為區域變數
  state: {
    // 資料
    user: {
      username: "",
      password: "",
    },
  },
  actions: {
    // 方法跟 method 差不多
    login(context) {
      const api = `${process.env.API_PATH}/admin/signin`;
      const vm = this;
      context.commit('LOADING', true, { root: true });
      axios.post(api, vm.user).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          context.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success',            
          });
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `Token=${token};expires=${new Date(expired)};`;
          vm.$router.push("/admin/products");
          context.commit('LOADING', false, { root: true });
        }
      });
    },
  },
};
