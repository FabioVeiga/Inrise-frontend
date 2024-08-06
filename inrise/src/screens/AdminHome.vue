<template>
  <div id="admin-home" class="app">
    <!-- Admin-specific content here -->
    <AdminSidebar></AdminSidebar>
  </div>
</template>

<script>
import AdminSidebar from '@/components/AdminSidebar.vue';

export default {
name: 'AdminHome',  
components: {
  AdminSidebar,
}
}
</script>

<style scoped>
</style>
