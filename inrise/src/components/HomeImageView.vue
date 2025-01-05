<template>
  <div class="image-view">
    <img src="@/assets/homeScreenPic.jpg" alt="Image" class="right-image">
  </div>
</template>

<script>
export default {
  name: 'HomeImageView'
}
</script>

<style scoped>
.image-view {
  width: 32vw; 
  height: 100vh; 
  background-color: #000; 
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
}

.right-image {
  width: 1000px;
  height: 100%;
  display: block;
  object-fit: cover;
 
}
</style>
