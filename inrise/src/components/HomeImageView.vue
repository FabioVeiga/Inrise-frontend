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
    width: 32vw; /* Ocupa 32% da largura da tela */
    height: 100vh; /* Ocupa toda a altura da tela */
    background-color: #000; /* Cor de fundo para teste */
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    overflow: hidden; /* Evita que a imagem cause rolagem horizontal */
  }
  
  .right-image {
    width: auto;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  </style>
  