<template>
    <div class="home-steps">
      <div class="square">
        <div class="gray-square"></div>
        <p class = "p1">PASSO 1</p>
        <p class = "p2">Selecione a finalidade
            do seu computador entre jogos, trabalho ou estudo</p>
      </div>
      <div class="square">
        <div class="gray-square"></div>
        <p class = "p1">PASSO 2</p>
        <p class = "p2">Escolha os programas
que pretende usar
no seu computador</p>
      </div>
      <div class="square">
        <div class="gray-square"></div>
        <p class = "p1">PASSO 3</p>
        <p class = "p2">Monte e compre
seu futuro 
computador com 
a InRise!</p>
      </div>
    </div>
  </template>
  
<script>
 export default {
    name: 'HomeSteps'
  }
</script>

  <style scoped>
  .home-steps {
    display: flex;
    justify-content: center;
  }
  
  .p1{
    font-size:24px;
    font-weight: 700;
    margin:0px;
    padding: 10px;
  }
  .p2{
    font-size:14px;
    font-weight: 400px;
    padding-left: 60px;
    padding-right: 60px;
  }
  .square {
    padding: 30px;
    width: 33%;
    display:flex;
    flex-direction: column;
    align-items: center;

  }
  
  .gray-square {
    right:50%;
    width: 150px;
    height: 150px;
    background-color: #ccc; /* Cinza */
  }
  
  .square p {
    margin-top: 5px;
  }
  </style>
  