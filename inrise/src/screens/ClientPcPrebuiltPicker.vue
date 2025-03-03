<template>
    <div class="flex flex-row">
      <HomeContentView>
        <HomeMenu></HomeMenu>
  
        <HeaderRectanglesLarge>
          <p class="whitespace-nowrap">ESCOLHA O TIPO <br> DE COMPUTADOR</p>
        </HeaderRectanglesLarge>
        <p style="white-space: nowrap" class="text-3xl font-normal">
          Selecione o tipo <br> de computador que deseja. 
        </p>
  
        <div class="flex flex-wrap justify-around gap-6">
          <PCTypeCard
            v-for="(pcType, index) in pcTypes"
            :key="index"
            :pcType="pcType"
            :routeName="'ClientPcPrebuilt'" 
          />
        </div>
  
        <div class="flex justify-between w-full max-w-[1366px]">
          <ActionButton :to="{ name: 'PreviousPage' }" :isNext="false">
            Página Anterior
          </ActionButton>
          <ActionButton :to="{ name: 'NextPage' }" :isNext="true" :canNavigate="!isNextButtonDisabled">
            Próxima Página
          </ActionButton>
        </div>
      </HomeContentView>
    </div>
  </template>
  
  <script>
  import HomeContentView from '../components/HomeContentView.vue';
  import HomeMenu from '../components/HomeMenu.vue';
  import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import PCTypeCard from '@/components/PcTypeCard.vue';
  
  export default {
    name: 'ClientPcPrebuiltPicker',
    components: {
      HomeContentView,
      HomeMenu,
      HeaderRectanglesLarge,
      PCTypeCard,
      ActionButton
    },
    data() {
      return {
        pcTypes: ['Low', 'Med', 'High', 'Ultra'],
        isNextButtonDisabled: true
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  