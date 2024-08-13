<template>
  <div class="landing-page font-spaceGrotesk">
    <!-- Menu Preto -->
    <nav class="navbar flex justify-between w-full h-[100px] bg-black text-xl items-center my-9">
      <!-- Logo à esquerda -->
      <div class="flex-shrink-0 pl-8">
        <img src="@/assets/InRise logo horizontal.png" alt="Logo" class="object-scale-down w-72">
      </div>
      <!-- Itens do menu à direita -->
      <ul class="flex justify-end items-center h-full space-x-8 pr-8">
        <li><a href="#o-que-e">O que é a InRise</a></li>
        <li><a href="#sobre-o-beta">Sobre o Beta</a></li>
        <li><a href="#como-participar">Como Participar</a></li>
        <li><a href="#inscreva-se">Inscreva-se</a></li>
      </ul>
    </nav>

  
      <!-- Conteúdo da Página -->
      <section id="o-que-e" class="flex">
        <div class="flex flex-1 justify-between">
          <div class="flex flex-1 flex-col max-w-[700px] mx-4">
            <span class="text-6xl font-medium">
              Descobre o poder do Beta da InRise: O teu PC gaming personalizado<br>
            </span>

            <span class="text-xl">
              Já imaginaste ter um PC gaming que não apenas atenda às tuas expectativas, mas as supere? 
              Na InRise, estamos prestes a tornar esse sonho realidade com o nosso Beta exclusivo. 
              Prepara-te para uma experiência única e personalizada, com preços especiais e benefícios incríveis!
            </span>

          </div>
          <div class="flex flex-1 flex-col max-w-[500px] bg-red-500 mx-4">
            asdasd
          </div>
        </div>
      </section>
  
      <section id="sobre-o-beta">
        
      </section>
  
      <section id="como-participar">
        
      </section>
  
      <section id="inscreva-se">
        
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
  };
  </script>
  
  <style scoped>
  .landing-page {
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .navbar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }
  
  .navbar li {
    display: inline;
  }
  
  span{
    margin-top: 16px;
    margin-bottom: 16px;
  }
  
  .navbar a {
    color: #fff; /* Branco para contraste */
    text-decoration: none;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .navbar a:hover {
    background-color: #333; /* Cinza escuro ao passar o mouse */
  }
  
  div { 
    text-align: left;
  }
  section {
    padding-right: 100px;
    padding-left: 100px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-top: 1px solid #ddd;
  }
  

  h2 {
    color: #333;
  }
  </style>
  