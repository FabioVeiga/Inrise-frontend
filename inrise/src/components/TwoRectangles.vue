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
    width: 630px; 
    height: 144px; 
  }
  
  .rectangle {
    width: 600px;
    height: 77px;
    background-color: linear-gradient(to bottom, #54C0ED, #E431FE);

  }
  
  .rectangle1 {
    background-color: red;
    background: linear-gradient(to bottom, #54C0ED, #E431FE);

    transform: translate(30px, 0px);

  }
  
  .rectangle2 {
    background: linear-gradient(to bottom, #54C0ED, #E431FE);

    background-color: blue;
  }

  .gradient-overlay {
  position: absolute;
  top: 0; 
  left: 0;
  width: 1000px; 
  height: 1000px;
  background: linear-gradient(to bottom, #54C0ED, #E431FE);
}
  </style>
  