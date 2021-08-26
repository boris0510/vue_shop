<template>
  <div id="app">
    <Alert/>    
    <Loading :active.sync="isLoading"></Loading>
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Alert from "./components/AlertMessage";
import Navbar from "./components/Navbar";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {    
    Alert,
    Navbar,
  },
  data() {
    return {};
  },
  computed: {
    // 動態資料，有資料更動畫面就更新
    ...mapGetters(["isLoading", "status", "cart"]),
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)Token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
