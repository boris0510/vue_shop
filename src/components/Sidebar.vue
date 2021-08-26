<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <div>
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span class="h6 font-weight-bold">管理員</span>
            <a class="d-flex align-items-center text-muted" href="#">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <router-link
                class="nav-link h5 font-weight-bold"
                to="/admin/products"
              >
                <i class="fas fa-box-open"></i>
                產品列表
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link h5 font-weight-bold"
                to="/admin/orders"
              >
                <i class="fas fa-list"></i>
                訂單列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link h5 font-weight-bold"
                to="/admin/coupons"
              >
                <i class="fas fa-ticket-alt"></i>
                優惠券
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },  
};
</script>

<style scoped>
.body{
  background-color: #FFD1A4;
}
</style>