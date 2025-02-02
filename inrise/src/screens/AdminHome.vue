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
import { isAdminTokenValid } from '@/utils/auth'; 

export default {
  name: 'AdminHome',
  components: {
    AdminSidebar,
  },
  data() {
    return {
      tokenValid: true,
    };
  },
  created() {
    this.checkTokenValidity();
  },
  mounted() {
    this.tokenCheckInterval = setInterval(this.checkTokenValidity, 5000);
  },
  beforeUnmount() {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  },
  methods: {
    checkTokenValidity() {
      if (!isAdminTokenValid()) {
        this.handleTokenExpiry();
      }
    },
    handleTokenExpiry() {
      alert('Tempo de sessão expirado. Por favor, entre novamente.');
      this.$router.push('/adminLogin');
    },
  },
};
</script>
