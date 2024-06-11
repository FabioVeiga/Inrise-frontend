<template>
    <div class="rectangle-container">
      <div class="rectangle rectangle1"></div>
      <div class="gradient-overlay"></div>
      <div class="rectangle rectangle2"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TwoRectangles'
  }
  </script>
  
  <style scoped>
  .rectangle-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 630px; /* Ajuste conforme necessário */
    height: 144px; /* Ajuste conforme necessário */
  }
  
  .rectangle {
    width: 600px; /* Ajuste conforme necessário */
    height: 77px; /* Ajuste conforme necessário */
    background-color: linear-gradient(to bottom, #54C0ED, #E431FE);

  }
  
  .rectangle1 {
    background-color: red;
    background: linear-gradient(to bottom, #54C0ED, #E431FE);

    transform: translate(30px, 0px); /* Ajuste a desalinhamento conforme necessário */

  }
  
  .rectangle2 {
    background: linear-gradient(to bottom, #54C0ED, #E431FE);

    background-color: blue;
  }

  .gradient-overlay {
  position: absolute;
  top: 0; /* Alinha o topo do gradiente ao topo do segundo retângulo */
  left: 0;
  width: 1000px; /* Ajuste conforme necessário */
  height: 1000px; /* Ajuste conforme necessário */
  background: linear-gradient(to bottom, #54C0ED, #E431FE);
}
  </style>
  