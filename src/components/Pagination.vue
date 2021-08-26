<template>
  <div>
    <!-- 分頁 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center mt-5">
        <!-- 往前頁 -->
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="previousPage()"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 各分頁 -->
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{ active: pagination.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage(page)">{{
            page
          }}</a>
        </li>
        <!-- 往後頁 -->
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="nextPage()"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      pagination: {},
    };
  },
  methods: {
    previousPage() {      
      this.pagination.current_page = this.pagination.current_page - 1; 
      //向products傳遞事件     
      this.$emit("passFunction", this.pagination.current_page);
    },
    nextPage() {
      this.pagination.current_page = this.pagination.current_page + 1;
      //向products傳遞事件        
      this.$emit("passFunction", this.pagination.current_page);
    },
    currentPage(currentPage) {
      this.pagination.current_page = currentPage;
      //向products傳遞事件  
      this.$emit("passFunction", this.pagination.current_page);
    },
  },
  created() {
    const vm = this;
    this.$bus.$on("page:change", (pagination) => {
      vm.pagination = pagination;
    });
  },
};
</script>