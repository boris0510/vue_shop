<template>
  <div>
    <Banner />
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">登入</h1>
      <label for="inputEmail" class="sr-only">電子信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="輸入信箱"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="輸入密碼"
        required
        v-model="user.password"
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入
      </button>
      <p class="mb-5 mt-4">請使用test111@gmail.com及test123登入</p>
    </form>
    <Footer />
  </div>
  
</template>

<script>
import Banner from "../Banner";
import Footer from "../Footer";

export default {
  name: "Login",
  components: {
    Banner,
    Footer,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = `${process.env.API_PATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `Token=${token};expires=${new Date(expired)};`;
          vm.$router.push("/admin/products");
          vm.$store.dispatch("updateMessage", {
            message: response.data.message,
            status: "success",
          });
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.$store.dispatch("getStatus");
        }
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
