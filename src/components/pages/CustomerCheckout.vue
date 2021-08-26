<template>
  <div>
    <Banner />
    <h1 class="text-center my-5">購物清單</h1>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.final_total.toFixed(0) | currency }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">
                {{ order.total.toFixed(0) | currency }}
              </td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right justify-content-center" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
        <div class="text-center" v-if="order.is_paid !== false">
          
          <button class="btn btn-primary my-5" @click="goCustomerOrder">
            繼續選購
          </button>
        </div>
      </form>
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
      order: {
        user: {},
      },
      orderId: "",
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/order/${vm.orderId}`;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        // console.log(response);
        vm.$store.dispatch("updateLoading", false);
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/pay/${vm.orderId}`;
      vm.$store.dispatch("updateLoading", true);
      this.$http.post(url).then((response) => {
        // console.log(response);
        if (response.data.success) {
          vm.getOrder();
          vm.$store.dispatch("updateMessage", {
            message: response.data.message,
            status: "success",
          });
        }
        vm.$store.dispatch("updateLoading", false);
      });
    },
    goCustomerOrder() {
      const vm = this;
      vm.$router.push("/");
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    this.getStatus();
    // console.log(this.orderId);
  },
};
</script>
