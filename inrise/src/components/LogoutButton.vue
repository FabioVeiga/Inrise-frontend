<template>
    <button @click="handleLogout" class="logout-button">Logout</button>
  </template>
  
  <script>
import { logout } from '@/utils/auth';  

  export default {
    name: 'LogoutButton',
    methods: {
      handleLogout() {
        logout(); 
        this.$router.push('/adminLogin'); 
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
  