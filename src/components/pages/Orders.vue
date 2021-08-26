<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="200">購買時間</th>
          <th width="200">Email</th>
          <th>購買項目</th>
          <th width="200">應付金額</th>
          <th width="150">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in sortOrder"
          :key="key"
          :class="{ 'text-secondary': !item.is_paid }"
        >
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination @passFunction="getOrders"></Pagination>

  </div>
</template>

<script>
import Pagination from "../Pagination";

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(Page = 1) {      
      const api = `${process.env.API_PATH}/api/${process.env.VUETEST_PATH}/admin/orders?page=${Page}`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoading", false);
        // console.log(response);
        vm.$bus.$emit("page:change", response.data.pagination);
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
