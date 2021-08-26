<template>
  <div>
    <Banner />
    <!-- cart list -->
    <h1 class="text-center my-5">購物車清單</h1>
    <div class="my-2 row justify-content-center">
      <div class="my-2 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th width="250">品名</th>
            <th width="100">數量</th>
            <th width="120">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCatrItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.final_total | currency }} 元
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計:</td>
              <td class="text-right">{{ cart.total | currency }} 元</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">
                {{ cart.final_total | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入優惠碼"
            v-model="coupon_code"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
        <button
          class="btn btn-primary my-5"
          @click="goConnection"
          v-if="cart.final_total !== 0"
        >
          下一步
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Banner from "../Banner";
import Footer from "../Footer";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    Banner,
    Footer,
  },
  data() {
    return {
      coupon_code: "",
    };
  },
  methods: {
    removeCatrItem(id) {
      this.$store.dispatch("removeCart", id);
    },
    addCouponCode() {
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      this.$store.dispatch("updateLoading", true);
      this.$http.post(api, { data: coupon }).then((response) => {
        // console.log(response);
        vm.$store.dispatch("getCart");
        this.$store.dispatch("updateLoading", false);
        if (response.data.success) {
          vm.$store.dispatch("updateMessage", {
            message: response.data.message,
            status: "success",
          });
        } else {
          vm.$store.dispatch("updateMessage", {
            message: response.data.message,
            status: "danger",
          });
        }
      });
    },
    ...mapActions(["getCart", "goConnection"]),
  },
  computed: {
    // 動態資料，有資料更動畫面就更新
    ...mapGetters(["cart"]),
  },
  created() {
    this.getCart();
    this.getStatus();
  },
};
</script>