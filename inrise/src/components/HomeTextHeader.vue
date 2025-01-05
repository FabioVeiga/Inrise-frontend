<template>
  <div class="home-text-header relative inline-block m-3">
    <span class="gray-text text-[#979696] text-xl font-normal">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextWithHover',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.home-text-header::before {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 50%;
  background: #979696;
  transition: all 0.3s ease;
}

.home-text-header:hover::before {
  width: 100%;
  left: 0;
}
</style>
