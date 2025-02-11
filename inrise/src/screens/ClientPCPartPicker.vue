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
              Processador
            </p>
            <PcMenu partType="processor" :parts="processadores" :selectedParts="[selectedParts.processor]"
              @update:selectedParts="selectPart('processor', $event)" />

            <!-- Mobo -->
            <div v-if="selectedParts.processor && placasMaeFilter.length">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Placa Mãe
              </p>
              <PcMenu partType="motherBoard" :parts="placasMaeFilter" :selectedParts="[selectedParts.motherBoard]"
                @update:selectedParts="selectPart('motherBoard', $event)" />
            </div>

            <!-- RAM -->
            <div v-if="selectedParts.motherBoard && memoriasRamFilter.length">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Memória RAM
              </p>
              <PcMenu partType="memoryRam" :parts="memoriasRam" :selectedParts="[selectedParts.memoryRam]"
                @update:selectedParts="selectPart('memoryRam', $event)" />
            </div>

            <!-- GPU -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Placa de Vídeo
              </p>
              <PcMenu partType="videoBoard" :parts="placasVideo" :selectedParts="[selectedParts.videoBoard]"
                @update:selectedParts="selectPart('videoBoard', $event)" />
            </div>

            <!-- Disco -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Disco
              </p>
              <PcMenu partType="memoryRom" :parts="discos" :selectedParts="[selectedParts.memoryRom]"
                @update:selectedParts="selectPart('memoryRom', $event)" />
            </div>

            <!-- PSU -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Fonte
              </p>
              <PcMenu partType="powerSupply" :parts="fontesAlimentacao" :selectedParts="[selectedParts.powerSupply]"
                @update:selectedParts="selectPart('powerSupply', $event)" />
            </div>

            <!-- Coolers -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Cooler
              </p>
              <PcMenu partType="cooler" :parts="coolers" :selectedParts="[selectedParts.cooler]"
                @update:selectedParts="selectPart('cooler', $event)" />
            </div>

            <!-- Gabinete -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Gabinete
              </p>
              <PcMenu partType="tower" :parts="gabinetes" :selectedParts="[selectedParts.tower]"
                @update:selectedParts="selectPart('tower', $event)" />
            </div>
          </form>
        </div>
      </div>
      <!-- Modal de Partes  -->

      <div class="modal flex flex-col justify-between">
        <div class="h-3/4">
          <div>
            <h2 class="text-lg font-semibold">Partes Selecionadas:</h2>
            <ul>
              <li class="my-8" v-for="(partName, index) in selectedPartsList" :key="index">
                <span>{{ partName }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- Preço Final -->
        <div v-if="isAllPartsSelected" class=" h-1/4 flex w-full flex-row justify-between">
          <div class="text-lg font-semibold">
            <p>Preço Final: {{ finalPrice }}</p>
          </div>

          <!-- Submit -->
          <ActionButton :to="{ name: 'ClientPCPartPicker' }" :isNext="true" :isFinish="true"
            @click="validateAndSubmitForm">
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
import PcMenu from '@/components/PcMenu.vue';
import { loadProducts } from '@/utils/productUtils';
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActionButton from '@/components/ActionButton.vue';
import { createOrder } from '@/api';
import Cookies from 'js-cookie';

export default {
  name: 'ClientPcPartPicker',
  components: {
    PcMenu, HomeContentView, HomeMenu, HeaderRectanglesLarge, AppBreadcrumbs, ActionButton,
  },
  computed: {
    selectedPartsList() {
      return Object.values(this.selectedParts).filter(part => part).map(part => part.name);
    },
    isAllPartsSelected() {
      const missingParts = Object.keys(this.selectedParts).filter(partType => !this.selectedParts[partType]);
      return missingParts.length === 0;
    }
  },
  data() {
    return {
      loading: false,
      selectedParts: {
        processor: null,
        motherBoard: null,
        memoryRam: null,
        videoBoard: null,
        memoryRom: null,
        powerSupply: null,
        cooler: null,
        tower: null,
      },
      cpuSocket: null,
      processadores: [],
      placasMae: [],
      placasMaeFilter: [],
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
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
    getCategoryName(partType) {
      const categories = {
        processor: 7,
        motherBoard: 5,
        memoryRam: 2,
        videoBoard: 9,
        memoryRom: 3,
        powerSupply: 6,
        cooler: 1,
        tower: 8,
      };
      return categories[partType] || null;
    },
    async selectPart(partType, updatedPart) {
      console.log(`Selected part in ${partType}:`, updatedPart);

      this.selectedParts[partType] = updatedPart;

      Cookies.set('selectedPcParts', JSON.stringify(this.selectedParts), { path: '/' });

      if (partType === 'processor') {
        const selectedCpu = this.processadores.find(
          (processador) => processador.id === updatedPart.id
        );
        this.selectedSocket = selectedCpu ? selectedCpu.socket : null;
        this.filterMotherboardsBySocket();
      }

      if (partType === 'motherBoard') {
        const selectedMobo = this.placasMae.find(
          (mobo) => mobo.id === updatedPart.id
        );
        this.selectedSocketMemory = selectedMobo ? selectedMobo.socketMemory : null;
        this.filterRamBySocketMemory();
      }

      this.calculateFinalPrice();
    },

    validateAndSubmitForm() {
      const missingParts = Object.keys(this.selectedParts).filter(partType => !this.selectedParts[partType]);
      //@TODO: Dicionario pras peças aqui, memoryram pra RAM, etc
      if (missingParts.length > 0) {
        alert(`Por favor selecione as peças faltantes: ${missingParts.join(', ')}`);
        return;
      }

      this.submitForm();
    },
    filterMotherboardsBySocket() {
      if (this.selectedSocket) {
        this.placasMaeFilter = this.placasMae.filter(
          (mobo) => mobo.socket === this.selectedSocket
        );
      } else {
        this.placasMaeFilter = this.placasMae;
      }
    },

    filterRamBySocketMemory() {
      if (this.selectedSocketMemory) {
        this.memoriasRamFilter = this.memoriasRam.filter(
          (ram) => ram.socket === this.selectedSocketMemory
        );
        //console.log("Filtered RAM:", this.memoriasRamFilter);
      } else {
        this.memoriasRamFilter = this.memoriasRam;
      }
    },

    calculateFinalPrice() {
      let totalPrice = 0;

      Object.values(this.selectedParts).forEach(selectedPart => {
        if (selectedPart && selectedPart.finalPrice) {
          totalPrice += selectedPart.finalPrice;
        }
      });

      this.finalPrice = totalPrice.toFixed(2);
      console.log("Calculated Final Price:", this.finalPrice, this.selectedParts);
    },
    async submitForm() {
      console.log('Form Submitted!');
      console.log('Selected parts:', this.selectedParts);
      console.log('Final price:', this.finalPrice);

      const selectedPartsFromCookie = JSON.parse(Cookies.get('selectedPcParts') || '{}');

      const orderData = {
        userid: Cookies.get('userId'),
        productDtoRequests: Object.keys(selectedPartsFromCookie).map(partType => {
          const part = selectedPartsFromCookie[partType];
          if (part) {
            console.log("Order part", part)
            return {
              typeCategory: this.getCategoryName(part.partType),
              productId: part.id,
              price: part.finalPrice,
            };
          }
        }).filter(Boolean),
        totalPrice: this.finalPrice,
      };

      try {
        const response = await createOrder(orderData);
        console.log('Order response:', response.data);
        alert("Pedido criado com sucesso!");
      } catch (error) {
        alert(error || "Erro imprevisto ao fazer pedido.");
      }
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
