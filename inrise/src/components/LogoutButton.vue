<template>
  <button @click="handleLogout" class="logout-button">Logout</button>
</template>

<script>
import { logoutAdmin } from '@/utils/auth';  

export default {
  name: 'LogoutButton',
  methods: {
    async handleLogout() {
      try {
        await logoutAdmin();
        this.$router.push('/adminLogin'); 
      } catch (error) {
        console.error('Logout failed:', error);
        alert('An error occurred during logout.');
      }
    }
  }
}
</script>

<style scoped>
.logout-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px; 
}

.logout-button:hover {
  background-color: #aa0000;
}
</style>
