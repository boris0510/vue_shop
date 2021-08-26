<template>
  <div>
    <Banner />
    <div class="container main-content mb-3">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ active: searchText === '' }"
            >
              全部顯示
            </a>
            <a
              class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="searchText = item"
              :class="{ active: item === searchText }"
              v-for="item in categories"
              :key="item"
            >
              <i class="fas fa-caret-right" aria-hidden="true"></i>
              {{ item }}
            </a>
          </div>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="searchText"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="searchText = ''"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
            <button
              class="btn btn-outline-primary ml-auto"
              type="button"
              @click="getProducts"
            >
              重新整理
            </button>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div
                class="col-md-4 mb-4"
                v-for="item in filterData"
                :key="item.id"
              >
                <div class="card border-0 box-shadow text-center h-100">
                  <div
                    style="
                      height: 200px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>
                  <div class="card-body">
                    <h4 class="card-title">{{ item.title }}</h4>
                    <p class="card-text text-left">{{ item.content }}</p>
                    <div class="h4 text-primary" v-if="!item.price">
                      原價{{ item.origin_price | currency }}元
                    </div>
                    <del class="h6" v-if="item.price"
                      >原價{{ item.origin_price | currency }}元</del
                    >
                    <div class="h4 text-danger py-2" v-if="item.price">
                      現在只要{{ item.price | currency }}元
                    </div>
                  </div>
                  <div class="card-footer d-flex">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      @click="getProduct(item.id)"
                    >
                      查看更多
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm ml-auto"
                      @click="addtoCart(item.id)"
                    >
                      <i class="fa fa-cart-plus" aria-hidden="true"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price | currency }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price | currency }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price | currency }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ (product.num * product.price) | currency }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <Pagination @passFunction="getProducts"></Pagination> -->
    <Footer />
  </div>
</template>

<script>
import Banner from "./Banner";
import Footer from "./Footer";
// import Pagination from "./Pagination";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    // Pagination,
    Banner,
    Footer,
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    addtoCart(id, qty = 1) {
      // 傳參數只能傳一個，傳多個要使用物件
      this.$store.dispatch("addtoCart", { id, qty });
    },
    getProducts(page = 1) {
      this.$store.dispatch("getProducts", page);
    },
    getProduct(id) {
      this.$store.dispatch("getProduct", id);
    },
    ...mapActions("productsModules", ["getProducts","getProduct"]),
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.category
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
    ...mapGetters("productsModules", ["products", "product", "categories"]),
  },
  created() {
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sticky-top {
  top: 100px;
}
</style>
