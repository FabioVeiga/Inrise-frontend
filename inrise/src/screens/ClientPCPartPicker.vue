<template>

  <HomeContentView>
    <HomeMenu></HomeMenu>

    <HeaderRectanglesLarge>
      <p class="whitespace-nowrap">SELECIONE <br> OS HARDWARES</p>
    </HeaderRectanglesLarge>
    <AppBreadcrumbs></AppBreadcrumbs>
    <div v-if="loading" class="text-center text-xl text-gray-500">
      <p>Carregando peças...</p>
    </div>

    <div v-if="!loading">
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- CPU -->
        <p style="white-space: nowrap" class="text-xl font-semibold">
          Processadores
        </p>
        <PcPartRow partType="CPU" :parts="processadores" :selectedParts="selectedParts.processador"
          @update:selectedParts="selectPart('processador', $event)" />

        <!-- RAM -->
        <p style="white-space: nowrap" class="text-xl font-semibold">
          Memórias RAM
        </p>
        <PcPartRow partType="RAM" :parts="memoriasRam" :selectedParts="selectedParts.memoryRam"
          @update:selectedParts="selectPart('memoryRam', $event)" />


        <!-- Preço Final  -->
        <div class="text-lg font-semibold">
          <p>Preço Final: {{ finalPrice }}</p>
        </div>

        <!-- Submit -->
        <button type="submit" class="btn btn-primary">Salvar PC</button>
      </form>
    </div>
    <div class="flex justify-between w-full max-w-[1366px]">
      <ActionButton :to="{ name: 'ClientActivity' }" :isNext="false">
        Página Anterior
      </ActionButton>

      <ActionButton :to="{ name: 'ClientPCPartPicker' }" :isNext="true">
        Próxima Página
      </ActionButton>
    </div>
  </HomeContentView>

</template>

<script>
import PcPartRow from '@/components/PcPartRow.vue';
import { loadProducts } from '@/utils/productUtils';
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActionButton from '@/components/ActionButton.vue';

export default {
  name: 'ClientPcPartPicker',
  components: {
    PcPartRow, HomeContentView, HomeMenu, HeaderRectanglesLarge, AppBreadcrumbs, ActionButton
  },
  data() {
    return {
      loading: false,
      selectedParts: {
        processador: [],
        memoryRam: [],
      },
      processadores: [],
      memoriasRam: [],
      finalPrice: 0
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const [processadores, memoriasRam] = await Promise.all([
          loadProducts('processador'),
          loadProducts('ram'),
        ]);

        console.log('Fetched Processadores:', processadores);
        console.log('Fetched Memorias RAM:', memoriasRam);

        this.processadores = processadores;
        this.memoriasRam = memoriasRam;
        this.loading = false;
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        this.loading = false;
      }
    },
    selectPart(partType, updatedParts) {
      console.log(`Selected ${partType}:`, updatedParts);
      this.selectedParts[partType] = updatedParts;
      //this.calculateFinalPrice();
    },
    calculateFinalPrice() {
      let totalPrice = 0;
      Object.values(this.selectedParts).forEach(parts => {
        parts.forEach(part => {
          console.log(part)
          const partPrice = parseFloat(part.price.finalPrice.replace('$', ''));
          console.log(`Adding ${part.title}: $${partPrice}`);
          totalPrice += partPrice;
        });
      });
      console.log('Total Price Calculated:', totalPrice);
      this.finalPrice = totalPrice;
    },
    async submitForm() {
      console.log('Form Submitted!');
      console.log('Selected parts:', this.selectedParts);
      console.log('Final price:', this.finalPrice);
    }
  },
  mounted() {
    console.log('Fetching data for PC parts...');
    this.fetchData();
  }
};
</script>
