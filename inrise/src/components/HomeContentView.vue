<template>
    <div class="content-view">
      <!-- Conteúdo da view aqui -->
       <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeContentView'
  }
  </script>
  
  <style scoped>
  .content-view {
    flex: 1; /* Ocupa todo o espaço restante */
    padding-left: 176px;
    padding-bottom: 87px;
    box-sizing: border-box;
  }
  </style>
  