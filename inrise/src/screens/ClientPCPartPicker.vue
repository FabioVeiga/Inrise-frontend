<template>
  <HomeContentView>
    <HomeMenu></HomeMenu>

    <HeaderRectanglesLarge>
      <p class="whitespace-nowrap">SELECIONE <br> OS HARDWARES</p>
    </HeaderRectanglesLarge>
    <AppBreadcrumbs></AppBreadcrumbs>

    <div class="container">
      <div class="content">
        <div v-if="loading" class="text-center text-xl text-gray-500">
          <p>Carregando peças...</p>
        </div>

        <div v-if="!loading">
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- CPU -->
            <p style="white-space: nowrap" class="text-xl font-semibold">
              Processadores
            </p>
            <PcPartRow partType="CPU" :parts="processadores" :selectedParts="[selectedParts.processador]"
              @update:selectedParts="selectPart('processador', $event)" />


            <!-- Mobo -->
            <p style="white-space: nowrap" class="text-xl font-semibold">
              Placas Mãe
            </p>
            <PcPartRow partType="MOBO" :parts="placasMae" :selectedParts="[selectedParts.mobo]"
              @update:selectedParts="selectPart('mobo', $event)" />


            <!-- RAM -->
            <p style="white-space: nowrap" class="text-xl font-semibold">
              Memórias RAM
            </p>
            <PcPartRow partType="RAM" :parts="memoriasRam" :selectedParts="[selectedParts.memoryRam]"
              @update:selectedParts="selectPart('memoryRam', $event)" />


          </form>
        </div>


      </div>

      <!--  Modal -->
      <div class="modal flex flex-col justify-between">
        <div class="h-3/4">
          <p>Modal com as peças.</p>
        </div>
        <!-- Preço Final  -->

        <div class="h-1/4 flex w-full flex-row justify-between">
          <div class="text-lg font-semibold">
            <p>Preço Final: {{ finalPrice }}</p>
          </div>

          <!-- Submit -->
          <ActionButton :to="{ name: 'ClientPCPartPicker' }" :isNext="true" :isFinish="true">
            Finalizar Pagamento
          </ActionButton>
        </div>
      </div>
    </div>
    <div class="flex justify-between w-full max-w-[1366px]">
      <ActionButton :to="{ name: 'ClientSoftware' }" :isNext="false">
        Página Anterior
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
import Cookies from 'js-cookie';

export default {
  name: 'ClientPcPartPicker',
  components: {
    PcPartRow, HomeContentView, HomeMenu, HeaderRectanglesLarge, AppBreadcrumbs, ActionButton
  },
  data() {
    return {
      loading: false,
      selectedParts: {
        processador: null,
        memoryRam: null,
        mobo: null,

      },
      processadores: [],
      placasMae: [],
      gabinetes: [],
      memoriasRam: [],
      discos: [],
      placasVideo: [],
      fontesAlimentacao: [],
      coolers: [],
      monitores: [],
      finalPrice: 0
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const [processadores, placasMae, gabinetes, memoriasRam, discos, placasVideo, fontesAlimentacao, coolers, monitores] = await Promise.all([
          loadProducts('processador'),
          loadProducts('placaMae'),
          loadProducts('gabinete'),
          loadProducts('ram'),
          loadProducts('disco'),
          loadProducts('placaDeVideo'),
          loadProducts('psu'),
          loadProducts('cooler'),
          loadProducts('monitor'),
        ]);
        this.loading = false;
        this.processadores = processadores;
        this.placasMae = placasMae;
        this.gabinetes = gabinetes;
        this.memoriasRam = memoriasRam;
        this.discos = discos;
        this.placasVideo = placasVideo;
        this.fontesAlimentacao = fontesAlimentacao;
        this.coolers = coolers;
        this.monitores = monitores;
        console.log("Thispla", this.placasMae)
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }

    },
    selectPart(partType, updatedPart) {
      console.log(`Selected part in ${partType}:`, updatedPart);

      this.selectedParts[partType] = updatedPart;
      console.log('Updated selectedParts:', this.selectedParts);

      //this.calculateFinalPrice();
      Cookies.set('selectedPcParts', JSON.stringify(this.selectedParts), { path: '/' });
    },
    calculateFinalPrice() {
      let totalPrice = 0;
      Object.values(this.selectedParts).forEach(part => {
        if (part) {
          const partPrice = parseFloat(part.price.finalPrice.replace('$', ''));
          totalPrice += partPrice;
        }
      });
      this.finalPrice = totalPrice;
    },
    async submitForm() {
      console.log('Form Submitted!');
      console.log('Selected parts:', this.selectedParts);
      console.log('Final price:', this.finalPrice);
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.content {
  width: 60%;
  overflow-y: auto;
  padding: 20px;
}

.modal {
  width: 40%;
  background-color: black;
  color: white;
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
