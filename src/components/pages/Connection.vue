<template>
  <div>
    <Banner />
    <!-- 寄送資訊 -->
    <h1 class="text-center my-5">寄送資訊</h1>
    <div class="my-5 row justify-content-center">
      <validation-observer class="col-md-6" v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(createOrder)">
          <validation-provider
            rules="required|email"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                name="Email"
                placeholder="請輸入Email"
                class="form-control"
                v-model="form.user.email"
                :class="classes"
              />
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="username">收件人姓名</label>
              <input
                id="username"
                type="text"
                name="收件人姓名"
                placeholder="請輸入姓名"
                class="form-control"
                v-model="form.user.name"
                :class="classes"
              />
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider
            rules="required|numeric|min:10"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                name="收件人電話"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
                :class="classes"
              />
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="useraddress">收件人地址</label>
              <input
                id="useraddress"
                type="address"
                name="收件人地址"
                placeholder="請輸入地址"
                class="form-control"
                v-model="form.user.address"
                :class="classes"
              />
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea
              name=""
              id=""
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary" @click="backToCart">
              上一步
            </button>
            <button type="submit" class="btn btn-danger" :disabled="invalid">
              送出訂單
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
    <Footer />
  </div>
</template>

<script>
import Banner from "../Banner";
import Footer from "../Footer";

export default {
  components: {
    Banner,
    Footer,
  },
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    createOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/order`;
      const order = vm.form;
      vm.$store.state.isLoading = true;
      this.$http.post(url, { data: order }).then((response) => {
        // console.log("訂單已建立", response);
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
          vm.$store.dispatch('getCart');
        }
        vm.$store.state.isLoading = false;
      });
    },
    backToCart() {
      const vm = this;
      vm.$router.push("/cart");
    },
  },
};
</script>