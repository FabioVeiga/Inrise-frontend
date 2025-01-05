<template>
  <button @click="goToActivity" class="home-large-button" @mouseover="hover = true" @mouseleave="hover = false">
    MONTAR COMPUTADOR
  </button>
</template>

<script>
export default {
  name: 'HomeLargeButton',
  data() {
    return {
      hover: false
    }
  },
  methods: {
    goToActivity() {
      this.$router.push({ name: 'ClientActivity' });
    }
  }
}
</script>

<style scoped>
.home-large-button {
  font-size: 36px;
  font-weight: 900;
  width: 524px;
  height: 57px;
  cursor: pointer;
  border: 10px;
  border-image: linear-gradient(to bottom, #60B5EF, #DB3AFD);
  transition: all 0.3s ease;
  color: #000;

}

.home-large-button:hover {
  background-image: linear-gradient(to bottom, #60B5EF, #DB3AFD);
  color: #fff;
}
</style>