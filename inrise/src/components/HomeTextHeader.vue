<template>
    <div class="home-text-header">
      <span class="gray-text">{{ text }}</span>
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
  .home-text-header {
    margin: 10px;
    display: inline-block; /* Permite que o retângulo se ajuste ao tamanho do texto */
    position: relative; /* Permite posicionar o retângulo cinza */
  }
  
  .gray-text {
    font-size: 24px;
    font-weight:400;
    color: #979696; 
  }
  
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
  