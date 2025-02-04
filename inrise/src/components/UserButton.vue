<template>
  <button 
    class="user-button flex items-center justify-center bg-purple-500 text-white p-2 rounded-lg w-full mt-5 hover:bg-green-600" 
    @click="goToRoute"
  >
    <i :class="icon" class="mr-2"></i> {{ label }}
  </button>
</template>

<script>
export default {
  name: 'UserButton',
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    targetRoute: {
      type: String,
      required: true
    }
  },
  methods: {
    goToRoute() {
      console.log(this.targetRoute)
      this.$router.push(this.targetRoute);
    }
  }
};
</script>

<style scoped>
</style>
