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
    position: relative;
  }  
  .bar {
    width: 630px;
    height: 145px;
  }
  
  .overlay-text {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    font-size: 64px;
    font-weight: 900;
    line-height: 66px;
    color: white; 
    text-align: center; 
  }
  </style>
  