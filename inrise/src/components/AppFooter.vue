<template>
  <div>
    <div class="w-full min-h-[157px] bg-[#191919] flex flex-col items-center mt-auto">
      <div class="flex w-full h-full">
        <!-- Left Section @TODO: Responsividade pra 1366x768 nessa pagina ou é na clienthome n sei -->
        <div class="flex-grow min-w-[12rem]"></div>

        <!-- Main Column (Endereço) -->
        <div class="flex-grow flex flex-col basis-1/3 items-start text-center p-4 text-white">
          <div class="flex flex-col items-start border-b-2 pb-4 border-white">
            <div>
              <img src="@/assets/InRise logo white.png" alt="Logo">
            </div>
            <p class="text-left text-[14px] py-[10px] text-[#B7B7B7]">A InRise Computadores transforma a busca pelo
              computador perfeito,
              ao oferecer mais do que tecnologia: um movimento pela democratização da informação técnica e acesso
              a infinitas possibilidades. Com uma equipa de especialistas apaixonados por tecnologia e gamers dedicados,
              ajudamos a encontrar o computador dos teus sonhos.
            </p>
            <p><i class="fas fa-phone-alt"></i> +351 962 597 198</p>

            <p><i class="fas fa-envelope"></i> sac@inrise.com</p>
          </div>
          <!-- Payment Icons Section -->
          <div class="payment-icons my-2 flex space-x-4">
            <img src="@/assets/payment/pay1.png">
            <img src="@/assets/payment/pay2.png">
            <img src="@/assets/payment/pay3.png">
            <img src="@/assets/payment/pay4.png">
            <img src="@/assets/payment/pay5.png">
            <img src="@/assets/payment/pay6.png">
            <img src="@/assets/payment/pay7.png">
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex-grow min-w-[12rem]"></div>

        <!-- Nos conheça @TODO: Links pra o faq, serviços, etc -->
        <div class="text-center mx-4 text-white">
          <p class="text-[13px] font-semibold pt-[10px] pb-[5px] border-b-[1px] border-b-white mb-[10px]">Nos conheça
          </p>
          <div class="flex flex-col items-start justify-center text-[10px] space-y-2">
            <div class="">
              FAQ
            </div>
            <div class="">
              Serviços
            </div>
            <div class="">
              Contactos
            </div>
            <div class="">
              Quem somos
            </div>
          </div>
        </div>

        <!-- Fale Conosco Section -->
        <div class="text-center mx-4 text-white">
          <p class="text-[13px] font-semibold pt-[10px] pb-[5px] border-b-[1px] border-b-white mb-[10px]">Mais
            Informações
          </p>
          <div class="flex flex-col items-start justify-center text-[10px] space-y-2">
            <div class="">
              RGPD
            </div>
            <div class="">
              Aviso Legal
            </div>
            <div class="">
              Termos do Site
            </div>
            <div class="">
              Política de Cookies
            </div>
            <div class="">
              Termos e Condições
            </div>
            <div class="">
              Política de Privacidade
            </div>
            <div class="">
              Devoluções e Garantias
            </div>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex-grow min-w-[12rem]"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
