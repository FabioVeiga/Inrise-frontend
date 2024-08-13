<template>
  <div class="landing-page font-spaceGrotesk">
    <!-- Menu Preto -->
    <nav class="navbar flex justify-between w-full h-[100px] bg-black text-xl items-center my-9 px-16">
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
        <div class="flex flex-1 justify-center">
          <div class="flex flex-1 flex-col max-w-[700px] mx-4">
            <span class="text-6xl font-medium my-4 text-black">
              Descobre o poder do Beta da InRise: O teu PC gaming personalizado<br>
            </span>

            <span class="text-xl my-4 text-black">
              Já imaginaste ter um PC gaming que não apenas atenda às tuas expectativas, mas as supere? 
              Na InRise, estamos prestes a tornar esse sonho realidade com o nosso Beta exclusivo. 
              Prepara-te para uma experiência única e personalizada, com preços especiais e benefícios incríveis!
            </span>
            <button class="w-[355px] h-[68px] rounded-[14px] mt-4 bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl">
              Participar do pré-lançamento
            </button>
          </div>
          <div class="flex flex-1 flex-col justify-center items-center max-w-[500px] max-h-[500px] bg-red-500 mx-4">
            <img src="@/assets/homeScreenPic.jpg" alt="Image" class="w-full h-full object-cover">
          </div>
        </div>
        
      </section>
  
      <section id="sobre-o-beta" class="flex justify-center">
        <div class = "flex flex-1 justify-between items-center max-w-[1240px] h-[569px] rounded-[45px] bg-[#191A23]">  
          <div class="flex flex-1 justify-center items-center w-1/2 max-w-[500px] max-h-[500px] mx-[100px]">
            <img src="@/assets/placeholder1.png" alt="Image" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-1 justify-center items-center w-1/2 mx-[100px]">
            <div class="flex flex-col w-auto flex-1">
              <span class="text-3xl text-[#FFFFFF]">
                O que é o Beta da InRise?
              </span>
              <span class="text-lg text-[#FFFFFF] mt-4">O Beta da InRise é muito mais do que um teste. É a tua chance de ser pioneiro, de 
                experimentar em primeira mão os nossos PCs de alto desempenho, projetados especialmente 
                para gamers e profissionais exigentes. As inscrições estarão abertas de 15 a 31 de outubro 
                de 2024, e os players terão acesso a:
              </span>
              <span class="text-lg text-[#FFFFFF] ml-4">
                • Preços exclusivos<br>
                • Brindes incríveis<br>
                • Suporte técnico prioritário<br>
                • Participação em passatempos<br>
                • Contribuição no desenvolvimento futuro dos produtos
              </span>
              <button class="w-[355px] h-[68px] rounded-[14px] mt-4 bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl">
                Participar do pré-lançamento
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <section id="como-participar" class="flex flex-col items-center justify-center">
        <span class="text-3xl text-bold text-black my-4">
          Como participar do beta?
        </span>
        <div class="flex justify-between max-w-[1240px] mx-auto my-4">
          <div class="flex flex-col justify-between items-center w-64 h-72 mx-4 mb-4">
            <img src="@/assets/beta.png" alt="Logo" class="object-scale-down w-[200px]">
            <span class="text-center mt-2 px-2">
              1. Inscreva-se no Beta Teste <br> através do nosso newsletter.
            </span>
        </div>
          <div class="flex flex-col justify-between items-center w-64 h-72 mx-4 mb-4">
            <img src="@/assets/discord.png" alt="Logo" class="object-scale-down w-[200px]">
            <span class="text-center mt-2 px-2">             
              2. Aceda ao servidor do <br> discord da InRise.
            </span>
          </div>
          <div class="flex flex-col justify-between items-center w-64 h-72 mx-4 mb-4">
            <img src="@/assets/socials.png" alt="Logo" class="object-scale-down w-[200px]">
            <span class="text-center mt-2 px-2">
              3. Siga a InRise nas Redes <br> Sociais para acompanhar <br> as novidades.
            </span>
          </div>
          <div class="flex flex-col justify-between items-center w-64 h-72 mx-4 mb-4">            
            <img src="@/assets/message.png" alt="Logo" class="object-scale-down w-[200px]">
            <span class="text-center mt-2 px-2">
              4. Recebe atualizações pela <br> nossa newsletter.
            </span>
          </div>
        </div>
      </section>
      <section id="quem-somos" class="flex justify-center">
        <div class = "flex flex-1 justify-between items-center max-w-[1240px] h-[569px] rounded-[45px] bg-[#FFFFFF]">
          <div class="flex flex-1 justify-center">
          <div class="flex flex-1 flex-col max-w-[700px] mx-4">
            <span class="text-6xl font-medium my-4">
              Quem somos?<br>
            </span>

            <span class="text-xl my-4">
              A InRise Computadores transforma a busca pelo computador perfeito, ao oferecer mais do que tecnologia: 
              um movimento pela democratização da informação técnica e acesso a infinitas possibilidades. Com uma equipa 
              de especialistas apaixonados por tecnologia e gamers dedicados, ajudamos a encontrar o computador dos teus sonhos.
            </span>
            <span class="text-xl my-4">
              Escolher a InRise é optar por uma experiência descomplicada, acessível e transparente, onde as tuas necessidades 
              estão sempre em primeiro lugar. Junta-te a nós e descobre como é fácil explorar todo o potencial do mundo digital 
              com um computador feito à medida para ti.
            </span>
            
          </div>
          <div class="flex flex-1 flex-col justify-center items-center max-w-[500px] max-h-[500px] bg-red-500 mx-4">
            <img src="@/assets/homeScreenPic.jpg" alt="Image" class="w-full h-full object-cover">
          </div>
        </div>
        </div>
      </section>

      <section id="passos" class="flex justify-center">
        <div class = "flex flex-1 flex-col justify-between items-center max-w-[1240px] rounded-[45px]">
          <div class="flex justify-between">
            <div class="flex justify-between w-[600px] h-[450px] rounded-[45px] bg-[#F3F3F3] m-4 p-10">
              <div class="">
                <div class="">
                  <span class="text-medium text-3xl bg-[#B9FF66] p-1 rounded-[7px]">
                    Passo 1
                  </span>
                </div>
                <div class="my-8">
                  <span class="text-normal text-xl rounded-[7px]">
                    Passo 1: Este é o teu<br>
                    momento. Nesta etapa,<br> 
                    deverás escolher qual<br> 
                    tipo de computador<br> 
                    precisas, seja para gaming,<br> 
                    uso profissional ou casual<br> 
                    (estudo e trabalhos simples).
                  </span>
                </div>
              </div>
              <div class="flex self-center h-52 w-52">
                <img src="@/assets/passo1.png" alt="Logo" class="object-scale-down">
              </div>
            </div>
            <div class="flex justify-between w-[600px] h-[450px] rounded-[45px] bg-[#B9FF66] m-4 p-10">
              <div class="">
                <div>
                  <span class="text-medium text-3xl bg-[#FFFFFF] p-1 rounded-[7px]">
                    Passo 2
                  </span>
                </div>
                <div class="my-8">
                  <span class="text-normal text-xl ">
                    Passo 2: Parabéns! Estás um<br>
                    passo mais próximo de <br>
                    encontrar o computador <br>
                    perfeito. Neste momento, <br>
                    deves escolher o tipo de <br>
                    software que utilizarás. <br>
                    Através de menus interativos, <br>
                    conseguirás localizar facilmente <br>
                    o programa desejado.<br>
                  </span>
                </div>
              </div>
              <div class="flex self-center h-52 w-52">
                <img src="@/assets/passo2.png" alt="Logo" class="object-scale-down">
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex justify-between w-[600px] h-[450px] rounded-[45px] bg-[#B9FF66] m-4 p-10">
              <div class="">
                <div>
                  <span class="text-medium text-3xl bg-[#FFFFFF]  p-1 rounded-[7px]">
                    Passo 3
                  </span>
                </div>
                <div class="my-8">
                  <span class="text-normal text-xl ">
                    Passo 3: É hora de escolher<br>
                    os componentes do teu PC! <br>
                    Na InRise, temos peças <br>
                    perfeitas para todos os <br>
                    bolsos e necessidades, <br>
                    garantindo compatibilidade <br>
                    e visualização do teu setup. <br>
                    Finaliza a compra e deixa o <br>
                    resto connosco!
                  </span>
                </div>
              </div>
              <div class="flex self-center h-52 w-52">
                <img src="@/assets/passo3.png" alt="Logo" class="object-scale-down">
              </div>
            </div>
            <div class="flex justify-between w-[600px] h-[600px] rounded-[45px] bg-[#B9FF66] m-4 p-10">
              <div class="">
                <div>
                  <span class="text-medium text-3xl bg-[#FFFFFF]  p-1 rounded-[7px]">
                    Passo 4
                  </span>
                </div>
                <div class="my-8">
                  <span class="text-normal text-xl ">
                    Após o processamento do<br>
                    pagamento, o teu <br>
                    computador será montado <br>
                    por nossos profissionais com <br>
                    os componentes escolhidos. <br>
                    <br>
                    Cada equipamento é <br>
                    personalizado e enviado com <br>
                    sistema operativo e drivers <br>
                    pré-instalados, prontos para <br>
                    serem utilizados!<br>
                    <br>
                    Junta-te ao movimento <br>
                    InRise e venha desbravar o <br>
                    mundo da tecnologia.<br>
                  </span>
                </div>
              </div>
              <div class="flex self-center h-52 w-52">
                <img src="@/assets/passo4.png" alt="Logo" class="object-scale-down">
              </div>

            </div>
          </div>
          

        </div>
      </section>

      <section id="inscreva-se" class="flex justify-center">
        
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
  
  div { 
    text-align: left;
    color: #000
  }
  section {
    padding-right: 100px;
    padding-left: 100px;
    padding-top: 30px;
    padding-bottom:0px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-top: 1px solid #ddd;
  }
  

  h2 {
    color: #333;
  }


  </style>
  