<template>
  <div class="sidebar">
    
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>

<style scoped>
.sidebar {
  width: 176px;
  height: 100vh;
  background-color: grey; 
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100px; /* Ajuste conforme necessário */
  margin-bottom: 20px;
}
</style>
