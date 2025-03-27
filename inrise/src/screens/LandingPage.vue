<template>


  <div class="landing-page">
    <!-- Menu Preto -->
    <nav class="navbar flex justify-between w-full h-[100px] bg-black text-xl items-center my-9 px-0 lg:px-16">
      <!-- Logo à esquerda -->
      <div class="flex-shrink-0 pl-8">
        <img src="@/assets/InRise logo horizontal.png" alt="Logo" class="object-scale-down w-48 lg:w-72">
      </div>

      <!-- Itens do menu à direita -->
      <ul class="hidden lg:flex justify-end items-center h-full lg:space-x-8 lg:pr-8">
        <li><a class="hidden lg:flex" @click="scrollToSection('o-que-e')">O que é a InRise</a></li>
        <li><a class="hidden lg:flex" @click="scrollToSection('sobre-o-beta')">Sobre o Beta</a></li>
        <li><a class="hidden lg:flex" @click="scrollToSection('como-participar')">Como Participar</a></li>
        <li><a class="hidden lg:flex" @click="scrollToSection('inscreva-se')">Inscreve-te</a></li>
      </ul>

      <!-- Hamburger Icon -->
      <div class="lg:hidden flex items-center mr-8">
        <button @click="toggleMenu" class=" text-gray-100">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="menuOpen" ref="menu"
        class="lg:hidden absolute top-16 right-0 bg-gray-950 border border-gray-800 shadow-lg w-48 rounded-md"
        @click.self="closeMenu">
        <ul class="flex flex-col space-y-4 p-4">
          <li><a @click="scrollToSection('o-que-e')" class="text-lg text-gray-700">O que é a InRise</a></li>
          <li><a @click="scrollToSection('sobre-o-beta')" class="text-lg text-gray-700">Sobre o Beta</a></li>
          <li><a @click="scrollToSection('como-participar')" class="text-lg text-gray-700">Como Participar</a></li>
          <li><a @click="scrollToSection('inscreva-se')" class="text-lg text-gray-700">Inscreve-te</a></li>
        </ul>
      </div>



    </nav>


    <!-- Conteúdo da Página -->
    <section id="o-que-e" class="flex flex-col lg:flex-row">
      <div class="flex flex-1 flex-col items-center lg:flex-row lg:justify-center">
        <div class="flex flex-1 flex-col justify-center lg:max-w-[700px]  lg:mx-4">
          <span class="text-4xl lg:text-6xl font-medium my-4 text-black">
            Descobre o poder do Beta da InRise: O teu PC gaming personalizado<br>
          </span>

          <span class="text-xl my-4 text-black">
            Já imaginaste ter um PC gaming que não apenas atenda às tuas expectativas, mas as supere?
            Na InRise, estamos prestes a tornar esse sonho realidade com o nosso Beta exclusivo.
            Prepara-te para uma experiência única e personalizada, com preços especiais e benefícios incríveis!
          </span>
          <button @click="scrollToSection('inscreva-se')"
            class="self-center w-[320px] lg:w-[355px] h-[68px] rounded-[14px] mt-4 bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl">
            Participar do pré-lançamento
          </button>
        </div>
        <div
          class="hidden lg:flex flex-1 flex-col justify-center items-center max-w-[500px] max-h-[500px] bg-red-500 mx-4">
          <img src="@/assets/homeScreenPic.jpg" alt="Image" class="w-full h-full object-cover">
        </div>
      </div>

    </section>

    <section id="sobre-o-beta" class="flex justify-center px-4 lg:px-0">
      <div
        class="flex flex-1 justify-between items-center min-w-[350px] lg:max-w-[1240px] h-auto rounded-[45px] w-[100%]  bg-[#191A23] py-8">


        <div
          class="hidden lg:flex flex-1 max-w-[500px] max-h-[500px] ml-16 mx-4 mb-6 lg:mb-0 items-center justify-center">
          <img src="@/assets/betaInrise.svg" alt="Image" class="w-full h-full object-cover rounded-xl">
        </div>




        <div class="flex-1 flex flex-col justify-center items-center text-center lg:text-left lg:mx-[100px]">

          <div class="ml-4 lg:ml-0 flex flex-col"><span class="mx-0 w-52 lg:w-auto text-xl lg:text-3xl text-[#FFFFFF]">
              O que é o Beta da InRise?
            </span>
            <span class="w-auto lg:w-auto text-base whitespace-normal max-w-[80%] lg:text-lg text-[#FFFFFF] mt-4">
              O Beta da InRise é muito mais do que um teste. É a tua oportunidade de ser pioneiro e experimentar em
              primeira mão os nossos PCs de alto desempenho, projetados especialmente para gamers e profissionais
              exigentes. As inscrições antecipadas abrem no dia 26 de março até 06 de abril os players terão acesso a:
            </span>
            <span class="w-auto lg:w-auto text-lg text-[#FFFFFF] ml-4 mt-4">
              • Preços exclusivos<br>
              • Brindes incríveis<br>
              • Suporte técnico prioritário<br>
              • Participação em passatempos<br>
              • Contribuição no desenvolvimento futuro dos produtos
            </span>
            <button @click="scrollToSection('inscreva-se')"
              class="w-[320px] lg:w-[355px] h-[68px] rounded-[14px] mt-4 bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl">
              Participar do pré-lançamento
            </button>
          </div>

        </div>

      </div>
    </section>


    <section id="como-participar" class="flex flex-col w-full items-center justify-center py-8">
      <span class="text-6xl lg:text-3xl text-bold text-black my-4">
        Como participar do beta?
      </span>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1240px] my-4 mx-auto">
        <div class="flex flex-col justify-start items-center w-full max-w-[250px] h-auto">
          <img src="@/assets/beta.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="min-w-[240px] mt-12 text-center">
            1. Inscreve-te no Beta Teste <br> através do nosso newsletter.
          </span>
        </div>

        <div class="flex flex-col justify-start items-center w-full max-w-[250px] h-auto">
          <img src="@/assets/discord.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="min-w-[240px] mt-4 text-center ">
            2. Aceda ao servidor do <br> discord da InRise.
          </span>
        </div>

        <div class="flex flex-col justify-start items-center w-full max-w-[250px] h-auto">
          <img src="@/assets/socials.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="min-w-[240px] mt-10 text-center">
            3. Siga a InRise nas Redes <br> Sociais para acompanhar <br> as novidades.
          </span>

        </div>

        <div class="flex flex-col justify-start items-center w-full max-w-[250px] h-auto mb-12">
          <img src="@/assets/message.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="min-w-[240px] mt-6 text-center">
            4. Recebe atualizações pela <br> nossa newsletter.
          </span>
        </div>
      </div>

    </section>



    <section id="quem-somos" class="flex justify-center">
      <div
        class="flex flex-1 justify-between items-center min-w-[350px] max-w-[1240px] h-[569px] rounded-[45px] bg-[#FFFFFF]">
        <div class="flex flex-1 justify-center">
          <div class="flex flex-1 flex-col max-w-[700px] mx-4">
            <span class="text-4xl lg:text-6xl font-medium my-4">
              Quem somos?<br>
            </span>
            <span class="text-xl my-4">
              A InRise Computadores transforma a busca pelo computador perfeito, ao oferecer mais do que tecnologia:
              um movimento pela democratização da informação técnica e acesso a infinitas possibilidades.
              Com uma equipa de especialistas apaixonados por tecnologia e gamers dedicados, ajudamos a encontrar
              o computador dos teus sonhos.

            </span>
            <span class="text-xl my-4">

              Escolher a InRise é optar por uma experiência descomplicada, acessível e transparente, onde as tuas
              necessidades estão sempre em primeiro lugar. Junta-te a nós e descobre como é fácil explorar todo o
              potencial do mundo digital com um computador feito à medida para ti.
            </span>
          </div>
          <div class="hidden lg:flex flex-1 flex-col justify-center items-center max-w-[500px] max-h-[500px] mx-4">
            <img src="@/assets/quemSomos.svg" alt="Image" class="w-full h-full object-fit">
          </div>
        </div>
      </div>
    </section>

    <section id="passos" class="flex justify-center">
      <div class="flex flex-1 flex-col justify-between items-center min-w-[350px] max-w-[1240px]">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            class="flex items-center justify-between w-[350px] lg:w-[550px] 2xl:w-[600px] h-auto lg:h-[450px] rounded-[45px] bg-[#F3F3F3] p-7  hover:bg-[#BB59F9] ">
            <div class="flex flex-col justify-between w-3/5">
              <div>
                <span class="font-medium text-2xl lg:text-3xl bg-[#FFFFFF] p-1 rounded-[7px]">Passo 1</span>
              </div>
              <div class="my-8">
                <span class="font-normal text-base lg:text-xl rounded-[7px]">
                  Este é o teu
                  momento. Nesta etapa,
                  deverás escolher qual
                  tipo de computador
                  precisas, seja para gaming,
                  uso profissional ou casual
                  (estudo e trabalhos simples).
                </span>
              </div>
            </div>
            <div class="flex self-center h-52 ml-4 w-[40%]">
              <img src="@/assets/passo1.svg" alt="Logo" class="object-scale-down">
            </div>
          </div>

          <div
            class="flex items-center justify-between w-[350px] lg:w-[550px] 2xl:w-[600px] h-auto lg:h-[450px] rounded-[45px] bg-[#B9FF66] p-7  hover:bg-[#BB59F9] ">
            <div class="flex flex-col justify-between w-3/5">
              <div>
                <span class="font-medium text-2xl lg:text-3xl bg-[#FFFFFF] p-1 rounded-[7px]">Passo 2</span>
              </div>
              <div class="my-8">
                <span class="font-normal text-base lg:text-xl rounded-[7px]">
                  Parabéns! Estás um
                  passo mais próximo de
                  encontrar o computador
                  perfeito. Neste momento,
                  deves escolher o tipo de
                  software que utilizarás.
                  Através de menus interativos,
                  conseguirás localizar facilmente
                  o programa desejado.
                </span>
              </div>
            </div>
            <div class="flex self-center h-52 ml-4 w-[40%]">
              <img src="@/assets/passo2.svg" alt="Logo" class="object-scale-down">
            </div>
          </div>

          <div
            class="flex items-center justify-between w-[350px] lg:w-[550px] 2xl:w-[600px] h-auto lg:h-[450px] rounded-[45px] bg-[#B9FF66] p-7  hover:bg-[#BB59F9] ">

            <div class="flex flex-col justify-between w-3/5">
              <div>
                <span class="font-medium text-2xl lg:text-3xl bg-[#FFFFFF] p-1 rounded-[7px]">Passo 3</span>
              </div>
              <div class="my-8">
                <span class="font-normal text-base lg:text-xl rounded-[7px]">
                  É hora de escolher
                  os componentes do teu PC!
                  Na InRise, temos peças
                  perfeitas para todos os
                  bolsos e necessidades,
                  garantindo compatibilidade
                  e visualização do teu setup.
                  Finaliza a compra e deixa o
                  resto connosco!
                </span>
              </div>
            </div>
            <div class="flex self-center h-52 ml-4 w-[40%]">
              <img src="@/assets/passo3.svg" alt="Logo" class="object-scale-down">
            </div>
          </div>

          <div
            class="flex items-center justify-between w-[350px] lg:w-[550px] 2xl:w-[600px] h-auto lg:h-[450px] rounded-[45px] bg-[#B9FF66] p-7  hover:bg-[#BB59F9] ">
            <div class="flex flex-col justify-between w-3/5">
              <div>
                <span class="font-medium text-2xl lg:text-3xl bg-[#FFFFFF] p-1 rounded-[7px]">Passo 4</span>
              </div>
              <div class="my-8">
                <span class="font-normal text-base lg:text-xl rounded-[7px]">
                  Após o processamento do
                  pagamento, o teu
                  computador será montado
                  por nossos profissionais com
                  os componentes escolhidos.
                  <br>
                  Cada equipamento é
                  personalizado e enviado com
                  sistema operativo e drivers
                  pré-instalados, prontos para
                  serem utilizados!
                </span>
              </div>
            </div>
            <div class="flex self-center h-auto ml-4 w-[40%]">
              <img src="@/assets/passo4.svg" alt="Logo" class="object-scale-down">
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="faq" class="flex justify-center flex-col items-center">
      <div class="min-w-[350px] lg:min-w-[1240px] self-center">
        <div class="flex flex-1 flex-col justify-between items-center max-w-[1240px] rounded-[45px]">
          <span
            class="text-4xl lg:text-6xl max-w-[350px] lg:max-w-max text-left self-center lg:self-start font-medium p-1 my-1 rounded-[7px]">

            Perguntas Frequentes
          </span>

          <FaqCard class="mt-[30px]" v-for="(faq, index) in faqs" :key="index" :question="faq.question"
            :answer="faq.answer" :number="formatNumber(index + 1)" />
        </div>
      </div>
    </section>

    <section id="inscreva-se" class="flex flex-col justify-center mt-8">
      <div class="w-[350px] lg:w-[1240px] self-center">

        <span class="text-4xl lg:text-6xl text-left self-start font-medium p-1 my-1 rounded-[7px] bg-[#B9FF66]">
          Inscreve-te na nossa Newsletter!
        </span>

      </div>
      <div
        class="flex flex-row justify-between self-center items-center min-w-[350px] lg:w-[1240px] h-[569px] rounded-[45px] bg-[#F3F3F3] p-8">
        <div class="flex-1">
          <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-6">
            <div>
              <label for="name" class="block text-gray-700 text-base font-medium mb-2">Nome</label>
              <input v-model="formData.name" id="name" type="text" placeholder="Insira seu nome"
                class="w-[100%] lg:w-[556px] h-[60px] p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label for="email" class="block text-gray-700 text-base font-medium mb-2">Email</label>
              <input v-model="formData.email" id="email" type="email" placeholder="Insira seu melhor e-mail"
                class="w-[100%] lg:w-[556px] h-[60px] p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div class="flex items-center">
              <input v-model="formData.privacy" id="privacy" type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="privacy" class="ml-2 text-gray-700 text-sm">
                Ao se inscrever, alega concordas com nossa
                <a href="#" @click.prevent="openPrivacyModal" class="text-blue-600 hover:underline">
                  política de privacidade
                </a>
              </label>
            </div>
            <div>
              <button type="submit"
                class="w-[100%] lg:w-[556px] h-[68px] bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl rounded-[14px] mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Enviar</button>
            </div>
          </form>

        </div>
        <div class="hidden lg:flex">
          <div class="hidden lg:flex flex-1 flex-col justify-center items-center max-w-[500px] max-h-[500px] mx-4">

            <img src="@/assets/inscreva.svg" alt="Logo" class="object-fit">
          </div>
        </div>

      </div>

    </section>
    <div id="social" class="flex justify-center flex-col items-center">
      <div class="mb-12 m-0 flex space-x-12">
        <a href="https://www.facebook.com/inrisept" target="_blank" class="text-blue-600 text-3xl">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/inrise.pt/" target="_blank" class="text-pink-600 text-3xl">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@inrisept" target="_blank" class="text-black text-3xl">
          <i class="fab fa-tiktok"></i>
        </a>
        <a href="https://discord.gg/mFMxa8wHjP" target="_blank" class="text-blue-600 text-3xl">
          <i class="fab fa-discord"></i>
        </a>
      </div>
    </div>


  </div>
  <LpPrivacyPolicy :isVisible="showPrivacyModal" @close="closePrivacyModal" />

</template>


<script>
//import axios from 'axios';
import LpPrivacyPolicy from '../components/LpPrivacyPolicy.vue';
import FaqCard from '../components/FaqCard.vue';
import { submitLandingPage, fetchLandingPage } from '@/api';

export default {
  name: 'LandingPage',
  components: {
    FaqCard,
    LpPrivacyPolicy
  },
  data() {
    return {
      menuOpen: false,
      showPrivacyModal: false,
      formData: {
        name: '',
        email: '',
        privacy: false,
      },
      faqs: [
        { question: 'O que é o BETA da InRise?', answer: 'O BETA da InRise é uma oportunidade exclusiva para testares em primeira mão os nossos serviços e PCs de alto desempenho com preços especiais, brindes e suporte prioritário. Ao participar, ajudas a moldar o futuro da InRise com o teu feedback e ainda garantes um setup de alta performance.' },
        { question: 'Quem pode participar?', answer: 'Qualquer gamer, profissional ou entusiasta que quer um PC sem complicação.' },
        { question: 'Quais são os benefícios exclusivos?', answer: 'Acesso a preços especiais, brindes exclusivos, suporte técnico prioritário e a oportunidade de participar em passatempos e contribuir para o desenvolvimento dos nossos produtos.' },
        { question: 'Quais são as datas importantes?', answer: '• 26 de março a 06 de abril: Período de inscrições.<br>• 07 de abril a 21 de abril: Acesso aos benefícios exclusivos. (Beta se mantém ativo até o dia 21 ou até o limite dos 25 primeiros clientes)' },
        { question: 'Como acompanho as atualizações?', answer: 'Através da nossa newsletter, Discord, e redes sociais (Instagram, Facebook, TikTok).' },
        { question: 'O que acontece após a inscrição?', answer: 'Receberás atualizações por e-mail. No início do BETA, terás acesso aos benefícios exclusivos e, após a compra, recolheremos o teu feedback.' },
        { question: 'Quando receberei o meu PC?', answer: 'Após a compra, o PC será enviado no prazo máximo de 10 dias úteis. Receberás atualizações por e-mail.' },
        { question: 'Os PCs têm garantia?', answer: 'Sim, todos os PCs vendidos no BETA têm garantia, incluindo suporte técnico e substituição de peças defeituosas.' },
        { question: 'E se não comprei no prazo?', answer: 'Mesmo que não tenhas comprado no prazo, continuarás a receber novidades sobre lançamentos e eventos especiais. No entanto, os benefícios específicos do BETA, como preços exclusivos e brindes, estarão disponíveis apenas durante o BETA.' },
      ],
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-GV6CLDTM5V";
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", "G-GV6CLDTM5V");
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    openPrivacyModal() {
      this.showPrivacyModal = true;
    },
    closePrivacyModal() {
      this.showPrivacyModal = false;
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      this.menuOpen = false;
    },
    formatNumber(num) {
      return num < 10 ? `0${num}` : num;
    },

    async handleSubmit() {
      if (this.formData.privacy) {
        try {
          const landingPageData = await fetchLandingPage();
          const emailExists = landingPageData.data.some(user => user.email === this.formData.email);

          if (emailExists) {
            alert('Esse e-mail já está cadastrado.');
            return;
          }

          await submitLandingPage({
            name: this.formData.name,
            email: this.formData.email,
            isAcceptRGPD: true,
          });

          alert('Inscrição realizada com sucesso!');
        } catch (error) {
          alert('Erro ao verificar e-mail ou ao enviar a inscrição.');
          console.error(error);
        }
      } else {
        alert('Você deve concordar com a política de privacidade para se inscrever.');
      }
    }
  }
};
</script>


<style scoped>
.landing-page {
  /*font-family: 'Space Grotesk', sans-serif;*/
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
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.navbar a:hover {
  background-color: #333;
}

div {
  text-align: left;
  color: #000
}

section {
  padding-right: 100px;
  padding-left: 100px;
  padding-top: 30px;
  padding-bottom: 0px;
}


h2 {
  color: #333;
}

section {
  max-width: 100%;
}


body {
  overflow-x: hidden;
}

.no-scroll {
  overflow: hidden;
  /* Pra bloquear scroll mas n ta funcionando o index.css global foi, idk.*/
  height: 100vh;
}

/*add animacao pro menu aparecer*/
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu {
  animation: slideIn 0.3s ease-out;
}
</style>