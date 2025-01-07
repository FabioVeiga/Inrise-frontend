<template>
  <div class="sidebar">
    <img src="@/assets/InRise logo.png" alt="Logo" class="logo">
  </div>
</template>

<script>
export default {
  name: 'AppSidebar'
};
</script>

<style scoped>
.sidebar {
  width: 176px;
  height: 100%;
  background-color: #191919;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}
</style>
