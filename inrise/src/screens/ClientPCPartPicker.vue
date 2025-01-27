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
            <PcPartRow partType="processor" :parts="processadores" :selectedParts="[selectedParts.processor]"
              @update:selectedParts="selectPart('processor', $event)" />

            <!-- Mobo -->
            <div v-if="selectedParts.processor && placasMaeFilter.length">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Placa Mãe
              </p>
              <PcPartRow partType="motherBoard" :parts="placasMaeFilter" :selectedParts="[selectedParts.motherBoard]"
                @update:selectedParts="selectPart('motherBoard', $event)" />
            </div>

            <!-- RAM -->
            <div v-if="selectedParts.motherBoard && memoriasRamFilter.length">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Memória RAM
              </p>
              <PcPartRow partType="memoryRam" :parts="memoriasRam" :selectedParts="[selectedParts.memoryRam]"
                @update:selectedParts="selectPart('memoryRam', $event)" />
            </div>

            <!-- GPU -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Placa de Vídeo
              </p>
              <PcPartRow partType="videoBoard" :parts="placasVideo" :selectedParts="[selectedParts.videoBoard]"
                @update:selectedParts="selectPart('videoBoard', $event)" />
            </div>

            <!-- Disco -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Disco
              </p>
              <PcPartRow partType="memoryRom" :parts="discos" :selectedParts="[selectedParts.memoryRom]"
                @update:selectedParts="selectPart('memoryRom', $event)" />
            </div>

            <!-- PSU -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Fonte
              </p>
              <PcPartRow partType="powerSupply" :parts="fontesAlimentacao" :selectedParts="[selectedParts.powerSupply]"
                @update:selectedParts="selectPart('powerSupply', $event)" />
            </div>

            <!-- Coolers -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Cooler
              </p>
              <PcPartRow partType="cooler" :parts="coolers" :selectedParts="[selectedParts.cooler]"
                @update:selectedParts="selectPart('cooler', $event)" />
            </div>

            <!-- Gabinete -->
            <div v-if="selectedParts.memoryRam">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Gabinete
              </p>
              <PcPartRow partType="tower" :parts="gabinetes" :selectedParts="[selectedParts.tower]"
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
        <div class="h-1/4 flex w-full flex-row justify-between">
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
import PcPartRow from '@/components/PcPartRow.vue';
import { loadProducts } from '@/utils/productUtils';
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActionButton from '@/components/ActionButton.vue';
import { submitOrder } from '@/api';
import Cookies from 'js-cookie';

export default {
  name: 'ClientPcPartPicker',
  components: {
    PcPartRow, HomeContentView, HomeMenu, HeaderRectanglesLarge, AppBreadcrumbs, ActionButton
  },
  computed: {
    selectedPartsList() {
      return Object.values(this.selectedParts).filter(part => part).map(part => part.name);
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
    async selectPart(partType, updatedPart) {
      console.log(`Selected part in ${partType}:`, updatedPart);

      this.selectedParts[partType] = updatedPart;

      //TODO: Logging cookies, preciso fazer ele usar os cookies do carrinho como usa os softwares na pg anterior.
      Cookies.set('selectedPcParts', JSON.stringify(this.selectedParts), { path: '/' });
      console.log("Updated cookies:", Cookies.get('selectedPcParts'));

      if (partType === 'processor') {
        //console.log("Updated part ID:", updatedPart);

        const selectedCpu = this.processadores.find(
          (processador) => processador.id === updatedPart.id
        );

        if (selectedCpu) {
          this.selectedSocket = selectedCpu.socket;
          //console.log("Selected processor socket:", this.selectedSocket);

          this.filterMotherboardsBySocket();
        } else {
          console.warn("Processor with the given ID not found.");
          this.selectedSocket = null;

          this.filterMotherboardsBySocket();
        }
      }

      if (partType === 'motherBoard') {
        //console.log("Updated motherboard ID:", updatedPart);

        const selectedMobo = this.placasMae.find(
          (mobo) => mobo.id === updatedPart.id
        );

        if (selectedMobo) {
          this.selectedSocketMemory = selectedMobo.socketMemory;
          //console.log("Selected motherboard memory socket:", this.selectedSocketMemory);

          this.filterRamBySocketMemory();

        } else {
          console.warn("Motherboard with the given ID not found.");
          this.selectedSocketMemory = null;
          this.filterRamBySocketMemory();
        }
      }
      this.calculateFinalPrice();
      Cookies.set('selectedPcParts', JSON.stringify(this.selectedParts), { path: '/' });
    },
    validateAndSubmitForm() {
      const missingParts = Object.keys(this.selectedParts).filter(partType => !this.selectedParts[partType]);

      if (missingParts.length > 0) {
        alert(`Please select a ${missingParts.join(', ')}`);
        return;
      }

      this.submitForm();
    },
    filterMotherboardsBySocket() {
      if (this.selectedSocket) {
        this.placasMaeFilter = this.placasMae.filter(
          (mobo) => mobo.socket === this.selectedSocket
        );
        //console.log("Filtered motherboards:", this.placasMaeFilter);
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

      const orderData = {
        //UserID fixo pra placeholding
        userid: 3,
        productDtoRequests: Object.keys(this.selectedParts).map(partType => {
          const part = this.selectedParts[partType];
          if (part) {
            return {
              typeCategory: part.typeCategory,
              productId: part.id,
              price: part.finalPrice,
            };
          }
        }).filter(Boolean), 
        totalPrice: this.finalPrice,
      };

      try {
        const response = await submitOrder(orderData);
        console.log('Order response:', response.data);
      } catch (error) {
        console.error('Error submitting order:', error);
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
