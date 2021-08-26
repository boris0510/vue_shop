<template>
  <div>
    <nav class="navbar navbar-light fixed-top bg-light flex-md-nowrap shadow">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-tshirt text-info" aria-hidden="true"></i>
        好好買服飾網
      </router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button
          class="btn btn-primary"
          @click.prevent="goSignin"
          v-if="!status"
        >
          登入
        </button>
        <button class="btn btn-danger" @click.prevent="logout" v-if="status">
          登出
        </button>
        <button
          class="btn btn-primary"
          @click.prevent="goProducts"
          v-if="status"
        >
          進入後台
        </button>
        <button
          class="btn btn-sm btn-cart"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{
            cart.carts.length
          }}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle text-center">
                  <a
                    href="#"
                    class="text-muted"
                    @click.prevent="removeCart(item.id)"
                  >
                    <i
                      class="fas fa-trash-alt text-danger"
                      aria-hidden="true"
                    ></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">
                  {{ item.qty }}{{ item.product.unit }}
                </td>
                <td class="align-middle text-right">
                  {{ item.total | currency }}
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary btn-block" @click="goCart">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    removeCart(id) {
      this.$store.dispatch("removeCart", id);
    },
    ...mapActions(["getStatus", "getCart"]),
    ...mapActions("navbarModules", ["logout", "goProducts", "goCart"]),

    goSignin() {
      this.$store.dispatch("updateLoading", true);
      this.$router.push("/login");
      setTimeout(() => {
        this.$store.dispatch("updateLoading", false);
      }, 500);
    },
  },
  computed: {
    // 動態資料，有資料更動畫面就更新
    ...mapGetters(["status", "cart"]),
  },
  created() {
    this.getCart();
    this.getStatus();
  },
};
</script>

<style scoped>
/* 購物車按鈕 */
.btn-cart {
  background-color: transparent;
  position: relative;
}
/* 購物車按鈕定位 */
.btn-cart .badge {
  position: absolute;
  top: 1px;
  right: 1px;
}
.main-content {
  min-height: calc(100vh - 56px - 176px);
}
.box-shadow {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.3s linear;
}
.box-shadow:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
}
.dropdown-menu-right {
  right: 0;
  left: auto;
}
.alert-rounded {
  border-radius: 50px;
}
</style>