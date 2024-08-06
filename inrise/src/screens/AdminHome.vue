<template>
  <div id="admin-home" class="app">
    <AdminSidebar class="admin-sidebar" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/AdminSidebar.vue';

export default {
  name: 'AdminHome',
  components: {
    AdminSidebar
  }
}
</script>

<style scoped>
#admin-home {
  display: flex;
}

.admin-sidebar {
  width: 200px;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
