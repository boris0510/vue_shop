<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";

export default {
  components: {
    Sidebar,  
  },
  data() {
    return {
    }
  },
};
</script>