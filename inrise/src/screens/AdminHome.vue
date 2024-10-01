<template>
  <div id="admin-home" class="flex h-screen overflow-hidden">
    <AdminSidebar class="admin-sidebar bg-gray-100" />
    <div class="main-content flex-1 ml-52 p-5 overflow-y-auto">
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
