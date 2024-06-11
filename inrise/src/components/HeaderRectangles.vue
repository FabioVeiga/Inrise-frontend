<template>
    <div class="headerRectangles">
      <img src="@/assets/bar.png" alt="Bar" class="bar">
      <div class="overlay-text">
            <p style="white-space: nowrap">VOCÊ MONTA <br> A SUA MÁQUINA</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderRectangles'
  }
  </script>
  
  <style>
  .headerRectangles {
    padding: 30px;
    position: relative; /* Para que a posição absoluta do texto seja relativa a este elemento */
  }
  
  .bar {
    width: 630px;
    height: 145px;
  }
  
  .overlay-text {
    position: absolute; /* Posição absoluta em relação ao elemento pai */
    top: 50%; /* Ajuste vertical para centrar o texto */
    left: 50%; /* Ajuste horizontal para centrar o texto */
    transform: translate(-50%, -50%); /* Centralizar o texto */
    font-size: 60px;
    font-weight: 900;
    color: white; /* Cor do texto */
    text-align: center; /* Centralizar o texto horizontalmente */
  }
  </style>
  