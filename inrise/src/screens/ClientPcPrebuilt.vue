<template>
    <div class="flex flex-row">
      <HomeContentView>
        <HomeMenu></HomeMenu>
  
        <HeaderRectanglesLarge>
          <p class="whitespace-nowrap">ESCOLHA <br> A SUA MÁQUINA</p>
        </HeaderRectanglesLarge>
    
  
        <!-- Grid of Product Cards -->
        <div class="flex flex-wrap justify-start gap-6">
          <PcProductCard
            v-for="(product, index) in products"
            :key="index"
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
  import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import PcProductCard from '@/components/PcProductCard.vue';
  
  export default {
    name: 'ClientPcPrebuilt',
    components: {
      HomeContentView,
      HomeMenu,
      HeaderRectanglesLarge,
      AppBreadcrumbs,
      ActionButton,
      PcProductCard
    },
    data() {
      return {
        // Array to simulate the collection of products
        products: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17],  // You can replace these with actual product data later
        isNextButtonDisabled: true
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles for the product grid layout */
  </style>
  