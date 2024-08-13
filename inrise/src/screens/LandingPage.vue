<template>
    <div class="landing-page font-spaceGrotesk">
      <!-- Menu Preto -->
      <nav class="navbar w-max h-36 bg-black">
        <ul class="flex justify-around items-center h-full">
          <li><a href="#o-que-e">O que é a InRise</a></li>
          <li><a href="#sobre-o-beta">Sobre o Beta</a></li>
          <li><a href="#como-participar">Como Participar</a></li>
          <li><a href="#inscreva-se">Inscreva-se</a></li>
        </ul>
      </nav>
  
      <!-- Conteúdo da Página -->
      <section id="o-que-e">
        <h2>O que é a InRise</h2>
        <p>Descrição sobre o que é a InRise.</p>
      </section>
  
      <section id="sobre-o-beta">
        <h2>Sobre o Beta</h2>
        <p>Informações sobre o programa beta.</p>
      </section>
  
      <section id="como-participar">
        <h2>Como Participar</h2>
        <p>Passos para participar da InRise.</p>
      </section>
  
      <section id="inscreva-se">
        <h2>Inscreva-se</h2>
        <p>Formulário de inscrição ou call-to-action.</p>
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
  
  section {
    padding: 50px;
    margin-top: 30px;
    border-top: 1px solid #ddd;
  }
  
  h2 {
    color: #333;
  }
  </style>
  