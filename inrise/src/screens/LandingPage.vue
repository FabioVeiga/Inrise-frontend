<template>
  <div class="landing-page font-spaceGrotesk">
    <!-- Menu Preto -->
    <nav class="navbar flex justify-between w-full h-[100px] bg-black text-xl items-center my-9 px-0 lg:px-16">
      <!-- Logo à esquerda -->
      <div class="flex-shrink-0 pl-8">
        <img src="@/assets/InRise logo horizontal.png" alt="Logo" class="object-scale-down w-48 lg:w-72">
      </div>
      <!-- Itens do menu à direita -->
      <ul class="hidden lg:flex justify-end items-center h-full space-x-8 pr-8">
        <li><a class="hidden lg:flex" @click="scrollToSection('o-que-e')">O que é a InRise</a></li>
        <li><a class="hidden lg:flex" @click="scrollToSection('sobre-o-beta')">Sobre o Beta</a></li>
        <li><a class="hidden lg:flex" @click="scrollToSection('como-participar')">Como Participar</a></li>
        <li><a class="hidden lg:flex" @click="scrollToSection('inscreva-se')">Inscreva-se</a></li>
      </ul>
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

    <section id="sobre-o-beta" class="flex justify-center">
      <div
        class="flex flex-1 justify-between items-center max-w-[180%] lg:max-w-[1240px] h-[569px] rounded-[45px] bg-[#191A23]">
        <div class="hidden lg:flex flex-1 justify-center items-center w-1/2 max-w-[500px] max-h-[500px] mx-[100px]">
          <img src="@/assets/placeholder1.png" alt="Image" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-1 justify-center items-center w-1/2 mx-[100px]">
          <div class="flex flex-col w-auto flex-1">
            <span class="text-xl lg:text-3xl text-[#FFFFFF]">
              O que é o Beta da InRise?
            </span>
            <span class="text-base lg:text-lg text-[#FFFFFF] mt-4">O Beta da InRise é muito mais do que um teste. É a
              tua chance de ser pioneiro, de
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
            <button @click="scrollToSection('inscreva-se')"
              class="w-[355px] h-[68px] rounded-[14px] mt-4 bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl">
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1240px] mx-auto my-4 lg:grid-cols-4 mb-8">
        <div class="flex flex-col justify-between items-center w-64 h-72">
          <img src="@/assets/beta.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="text-center mt-2 px-2">
            1. Inscreva-se no Beta Teste <br> através do nosso newsletter.
          </span>
        </div>

        <div class="flex flex-col justify-between items-center w-64 h-72">
          <img src="@/assets/discord.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="text-center mt-2 px-2">
            2. Aceda ao servidor do <br> discord da InRise.
          </span>
        </div>

        <div class="flex flex-col justify-between items-center w-64 h-72">
          <img src="@/assets/socials.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="text-center mt-2 px-2">
            3. Siga a InRise nas Redes <br> Sociais para acompanhar <br> as novidades.
          </span>
        </div>

        <div class="flex flex-col justify-between items-center w-64 h-72">
          <img src="@/assets/message.png" alt="Logo" class="object-scale-down w-[200px]">
          <span class="text-center mt-2 px-2">
            4. Recebe atualizações pela <br> nossa newsletter.
          </span>
        </div>
      </div>
    </section>
    <section id="quem-somos" class="flex justify-center">
      <div class="flex flex-1 justify-between items-center max-w-[1240px] h-[569px] rounded-[45px] bg-[#FFFFFF]">
        <div class="flex flex-1 justify-center">
          <div class="flex flex-1 flex-col max-w-[700px] mx-4">
            <span class="text-6xl font-medium my-4">
              Quem somos?<br>
            </span>

            <span class="text-xl my-4">
              A InRise Computadores transforma a busca pelo computador perfeito, ao oferecer mais do que tecnologia:
              um movimento pela democratização da informação técnica e acesso a infinitas possibilidades. Com uma equipa
              de especialistas apaixonados por tecnologia e gamers dedicados, ajudamos a encontrar o computador dos teus
              sonhos.
            </span>
            <span class="text-xl my-4">
              Escolher a InRise é optar por uma experiência descomplicada, acessível e transparente, onde as tuas
              necessidades
              estão sempre em primeiro lugar. Junta-te a nós e descobre como é fácil explorar todo o potencial do mundo
              digital
              com um computador feito à medida para ti.
            </span>

          </div>
          <div
            class="hidden lg:flex flex-1 flex-col justify-center items-center max-w-[500px] max-h-[500px] bg-red-500 mx-4">
            <img src="@/assets/homeScreenPic.jpg" alt="Image" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <section id="passos" class="flex justify-center">
      <div class="flex flex-1 flex-col justify-between items-center max-w-[1240px]">
        <div class="flex justify-between">
          <div
            class="flex justify-between w-[600px] h-[450px] rounded-[45px] bg-[#F3F3F3] m-4 p-10 hover:bg-purple-4o00">
            <div class="">
              <div class="">
                <span class="font-medium text-3xl bg-[#B9FF66] p-1 rounded-[7px]">
                  Passo 1
                </span>
              </div>
              <div class="my-8">
                <span class="font-normal text-xl rounded-[7px]">
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
                <span class="font-medium text-3xl bg-[#FFFFFF] p-1 rounded-[7px]">
                  Passo 2
                </span>
              </div>
              <div class="my-8">
                <span class="font-normal text-xl ">
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
                <span class="font-medium text-3xl bg-[#FFFFFF]  p-1 rounded-[7px]">
                  Passo 3
                </span>
              </div>
              <div class="my-8">
                <span class="font-normal text-xl ">
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
          <div class="flex justify-between w-[600px] h-[450px] rounded-[45px] bg-[#B9FF66] m-4 p-10">
            <div class="">
              <div>
                <span class="font-medium text-3xl bg-[#FFFFFF]  p-1 rounded-[7px]">
                  Passo 4
                </span>
              </div>
              <div class="my-8">
                <span class="font-normal text-xl ">
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

    <section id="inscreva-se" class="flex flex-col justify-center my-8">
      <div class="w-[1240px] self-center">
        <span class="text-[40px] text-left self-start font-medium p-1 my-1 rounded-[7px] bg-[#B9FF66]">
          Inscreva-se no beta da InRise
        </span>

      </div>
      <div
        class="flex flex-row justify-between self-center items-center w-[1240px] h-[569px] rounded-[45px] bg-[#F3F3F3] p-8 my-16">
        <div class="flex-1">
          <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-6">
            <div>
              <label for="name" class="block text-gray-700 text-base font-medium mb-2">Nome</label>
              <input v-model="formData.name" id="name" type="text" placeholder="Insira seu nome"
                class="w-[556px] h-[60px] p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label for="email" class="block text-gray-700 text-base font-medium mb-2">Email</label>
              <input v-model="formData.email" id="email" type="email" placeholder="Insira seu melhor e-mail"
                class="w-[556px] h-[60px] p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div class="flex items-center">
              <input v-model="formData.privacy" id="privacy" type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="privacy" class="ml-2 text-gray-700 text-sm">Ao inscrever, você alega concordar com nossa <a
                  href="#" class="text-blue-600 hover:underline">política de privacidade</a></label>
            </div>

            <div>
              <button type="submit"
                class="w-[556px] h-[68px] bg-gradient-to-t from-[#D93BFC] to-[#5BB9EE] text-white text-xl rounded-[14px] mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Enviar</button>
            </div>
          </form>

        </div>
        <div class="">
          <div class="flex self-center">
            <img src="@/assets/placeholder2.png" alt="Logo" class="object-scale-down">
          </div>
        </div>

      </div>

    </section>
    <section id="passos" class="flex justify-center flex-col items-center">
      <div class="w-[1240px] self-center">
        <div class="flex flex-1 flex-col justify-between items-center max-w-[1240px] rounded-[45px]">
          <span class="text-[40px] text-left self-start font-medium p-1 my-1 rounded-[7px]">
            Perguntas Frequentes
          </span>

          <FaqCard class="mt-[30px]" v-for="(faq, index) in faqs" :key="index" :question="faq.question"
            :answer="faq.answer" :number="formatNumber(index + 1)" />
        </div>
      </div>
    </section>
  </div>
</template>


<script>
//import axios from 'axios';
import FaqCard from '../components/FaqCard.vue';
import { submitLandingPage, fetchLandingPage } from '@/api';

export default {
  name: 'LandingPage',
  components: {
    FaqCard,
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        privacy: false,
      },
      faqs: [
        { question: 'O que é o BETA da InRise?', answer: 'O BETA da InRise é uma oportunidade exclusiva para testares em primeira mão os nossos serviços e PCs de alto desempenho. Durante o BETA, poderás adquirir computadores personalizados a preços especiais, receber brindes exclusivos e contar com suporte técnico prioritário. Ao participares, não só garantirás um setup de alta performance adaptado às tuas necessidades, mas também ajudarás a moldar o futuro da InRise, dando feedback direto à nossa equipa. Junta-te à nossa comunidade e ajuda-nos a construir um movimento de democratização da tecnologia!' },
        { question: 'Quem pode participar?', answer: 'Qualquer pessoa que se inscreva na nossa newsletter e preencha o formulário de inscrição.' },
        { question: 'Preciso pagar para participar?', answer: 'Não, a participação no BETA é gratuita.' },
        { question: 'Quais são os benefícios exclusivos?', answer: 'Para participar, você...' },
        { question: 'Quais são as datas importantes?', answer: '• 1 a 15 de outubro: Período de inscrições.<br>• 15 a 30 de outubro: Acesso aos benefícios exclusivos.' },
        { question: 'Como participar do Beta?', answer: 'Para participar, você...' },
        { question: 'Como participar do Beta?', answer: 'Para participar, você...' },
        { question: 'Como participar do Beta?', answer: 'Para participar, você...' },
        { question: 'Como participar do Beta?', answer: 'Para participar, você...' },
        { question: 'Como participar do Beta?', answer: 'Para participar, você...' },
      ],
    };
  },
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
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
  margin-top: 30px;
  margin-bottom: 30px;
}


h2 {
  color: #333;
}
</style>