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
              <PcPartRow partType="memoryRam" :parts="memoriasRamFilter" :selectedParts="[selectedParts.memoryRam]"
                @update:selectedParts="selectPart('memoryRam', $event)" />
            </div>

            <!-- Coolers -->
            <div v-if="selectedParts.memoryRam && coolersFilter.length">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Cooler
              </p>
              <PcPartRow partType="cooler" :parts="coolersFilter" :selectedParts="[selectedParts.cooler]"
                @update:selectedParts="selectPart('cooler', $event)" />
            </div>

            <!-- GPU -->
            <div v-if="selectedParts.cooler">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Placa de Vídeo
              </p>
              <PcPartRow partType="videoBoard" :parts="placasVideo" :selectedParts="[selectedParts.videoBoard]"
                @update:selectedParts="selectPart('videoBoard', $event)" />
            </div>

            <!-- Disco -->
            <div v-if="selectedParts.cooler">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Disco
              </p>
              <PcPartRow partType="memoryRom" :parts="discos" :selectedParts="[selectedParts.memoryRom]"
                @update:selectedParts="selectPart('memoryRom', $event)" />
            </div>

            <!-- PSU -->
            <div v-if="selectedParts.cooler">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Fonte
              </p>
              <PcPartRow partType="powerSupply" :parts="fontesAlimentacao" :selectedParts="[selectedParts.powerSupply]"
                @update:selectedParts="selectPart('powerSupply', $event)" />
            </div>

            <!-- Gabinete -->
            <div v-if="selectedParts.cooler">
              <p style="white-space: nowrap" class="text-xl font-semibold">
                Gabinete
              </p>
              <PcPartRow partType="tower" :parts="gabinetes" :selectedParts="[selectedParts.tower]"
                @update:selectedParts="selectPart('tower', $event)" />
            </div>

            <!-- Periféricos -->
            <div v-if="isAllPartsSelected">
              <!-- Kits 
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Conjuntos
                </p>
                <PcPartRow partType="kit" :parts="monitores" :selectedParts="[selectedParts.kit]"
                  @update:selectedParts="selectPart('kit', $event)" />
              </div>-->

              <!-- Keyboards
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Teclados
                </p>
                <PcPartRow partType="keyboard" :parts="monitores" :selectedParts="[selectedParts.keyboard]"
                  @update:selectedParts="selectPart('keyboard', $event)" />
              </div> -->

              <!-- Mouses
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Ratos
                </p>
                <PcPartRow partType="mouse" :parts="monitores" :selectedParts="[selectedParts.mouse]"
                  @update:selectedParts="selectPart('mouse', $event)" />
              </div> -->

              <!-- Monitors 
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Monitores
                </p>
                <PcPartRow partType="monitor" :parts="monitores" :selectedParts="[selectedParts.monitor]"
                  @update:selectedParts="selectPart('monitor', $event)" />
              </div>-->

              <!-- Headsets
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Auscultadores
                </p>
                <PcPartRow partType="headset" :parts="monitores" :selectedParts="[selectedParts.headset]"
                  @update:selectedParts="selectPart('headset', $event)" />
              </div> -->

              <!-- Mousepads
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Tapetes
                </p>
                <PcPartRow partType="mousepad" :parts="monitores" :selectedParts="[selectedParts.mousepad]"
                  @update:selectedParts="selectPart('mousepad', $event)" />
              </div> -->

              <!-- Chairs 
              <div v-if="monitores.length">
                <p style="white-space: nowrap" class="text-xl font-semibold">
                  Cadeiras
                </p>
                <PcPartRow partType="chair" :parts="monitores" :selectedParts="[selectedParts.chair]"
                  @update:selectedParts="selectPart('chair', $event)" />
              </div>-->
            </div>
          </form>
        </div>
      </div>

      <!-- Modal de Partes -->
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
        <div class=" h-1/4 flex w-full flex-row justify-between">
          <!-- Submit 
           add aqui o isDisabled baseado no isAllPartsSelected
          -->
          <ActionButton :to="{ name: 'ClientPCPartPicker' }" :isNext="true" :isFinish="true"
            :isDisabled="!isAllPartsSelected" @click="validateAndSubmitForm">
            Finalizar Pagamento
          </ActionButton>

          <div v-if="isAllPartsSelected" class="text-lg font-semibold">
            <p>Preço Final: {{ finalPrice }}</p>
          </div>
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
//TODO: Ajeitar o actionbutton acima (pra transparencia) e a questão de responsividade
import { loadProducts } from '@/utils/productUtils';
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActionButton from '@/components/ActionButton.vue';
import { createOrder, stripePayment } from '@/api';
import Cookies from 'js-cookie';
import PcPartRow from '@/components/PcPartRow.vue';
export default {
  name: 'ClientPcPartPicker',
  components: {
    PcPartRow, HomeContentView, HomeMenu, HeaderRectanglesLarge, AppBreadcrumbs, ActionButton,
  },
  computed: {
    selectedPartsList() {
      return Object.values(this.selectedParts)
        .filter(part => part)
        .map(part => part.name);
    },
    isAllPartsSelected() {
      const requiredParts = [
        'processor',
        'motherBoard',
        'memoryRam',
        'videoBoard',
        'memoryRom',
        'powerSupply',
        'cooler',
        'tower'
      ];

      /*if (this.isPeripheralSelectionRequired) {
        requiredParts.push('kit', 'keyboard', 'mouse', 'monitor', 'headset', 'mousepad', 'chair');
      }*/

      const missingParts = requiredParts.filter(partType => !this.selectedParts[partType]);
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
      processadores: [],
      placasMae: [],
      placasMaeFilter: [],
      gabinetes: [],
      memoriasRam: [],
      memoriasRamFilter: [],
      discos: [],
      placasVideo: [],
      fontesAlimentacao: [],
      coolers: [],
      coolersFilter: [],
      kits: [],
      keyboards: [],
      mouses: [],
      monitores: [],
      headsets: [],
      mousepads: [],
      chairs: [],
      finalPrice: 0
    };
  },

  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const [processadores, placasMae, gabinetes, memoriasRam, discos, placasVideo, fontesAlimentacao, coolers, monitores] = await Promise.all([
          loadProducts('processador', true),
          loadProducts('placaMae', true),
          loadProducts('gabinete', true),
          loadProducts('ram', true),
          loadProducts('disco', true),
          loadProducts('placaDeVideo', true),
          loadProducts('psu', true),
          loadProducts('cooler', true),
          loadProducts('monitor', true),
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
        this.filterCoolersBySocket();
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

    filterCoolersBySocket() {
      if (this.selectedSocket) {
        this.coolersFilter = this.coolers.filter(
          (cooler) => cooler.refrigeration === this.selectedSocket
        );
      } else {
        this.coolersFilter = this.coolers;
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

      let userId;
      try {
        userId = Cookies.get('userId');
        if (!userId) {
          throw new Error("Erro: ID de usuário não presente nos cookies.");
        }
      } catch (error) {
        alert("Por favor, faça login para finalizar seu pedido!");
        return;
      }

      // Prepare the productDtos field with required data (productId, name, price, quantity)
      const orderData = {
        userid: userId,
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
      const productDtos = Object.keys(selectedPartsFromCookie).map(partType => {
        const part = selectedPartsFromCookie[partType];
        if (part) {
          return {
            productId: part.id,              // Assuming part.id is the productId
            name: part.name,                 // Assuming part.name is the name
            price: Math.round(part.finalPrice),  // Rounds to the nearest integer     // Assuming part.finalPrice is the price
            quantity: 1,                     // Assuming 1 item per part selected
          };
        }
      }).filter(Boolean);

      
      const stripeOrderData = {
        productDtos
      };

      // Ensure productDtos is not empty
      if (productDtos.length === 0) {
        alert("Por favor, selecione pelo menos uma peça.");
        return;
      }

      // Prepare the order data
      try {
        // Create the order on the backend
        const response = await createOrder(orderData);
        console.log('Order response:', response.data);

        // Call stripePayment method to create the Stripe checkout session
        const stripeSessionData = await stripePayment(stripeOrderData);

        if (stripeSessionData) {
          // The stripePayment method will handle redirection to Stripe Checkout
        } else {
          alert("Erro ao redirecionar para pagamento.");
        }
      } catch (error) {
        alert(error || "Erro imprevisto ao fazer pedido.");
      }
    }
    ,



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
  width: 70%;
  overflow-y: auto;
  padding: 20px;
}

.modal {
  width: 30%;
  background-color: black;
  color: white;
  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
