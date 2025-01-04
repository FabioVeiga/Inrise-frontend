<template>
  <div class="meus-produtos flex flex-col">
    <h1 class="text-4xl font-bold my-8">Meus Produtos</h1>

    <div class="form-group my-8">
      <select 
        class="px-4 w-52 h-12" 
        v-model="productType" 
        id="productType" 
        @change="loadProducts" 
        required
        :disabled="loading"
      >
        <option value="select">Selecione uma opção</option>
        <option value="ram">Memória RAM</option>
        <option value="psu">Fonte</option>
        <option value="monitor">Monitor</option>
        <option value="placaDeVideo">Placa de Vídeo</option>
        <option value="processador">Processador</option>
        <option value="gabinete">Gabinete</option>
        <option value="cooler">Cooler</option>
        <option value="disco">Disco</option>
        <option value="computador">Computador</option>
        <option value="placaMae">Placa Mãe</option>
      </select>
    </div>

    <div 
      v-if="products.length === 0 && !loading && productType !== 'select'" 
      class="text-center text-xl text-gray-500"
    >
      <p>Não há produtos cadastrados.</p>
    </div>

    <div 
      v-if="loading && productType !== 'select'" 
      class="text-center text-xl text-gray-500"
    >
      <p>Carregando produtos...</p>
    </div>

    <!-- Exibe os produtos -->
    <div v-else class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <component 
        v-for="product in products" 
        :key="product.id" 
        :is="getProductComponent()" 
        :product="product"
        :formatCurrency="formatCurrency"
        @edit-product="openEditModal" 
      />
    </div>

    <!-- Modal de Edição -->
    <div v-if="isEditModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2 class="text-2xl font-bold mb-4">Editar Produto</h2>
        <form @submit.prevent="saveProduct">
          <label for="productName">Nome do Produto:</label>
          <input v-model="editableProduct.name" id="productName" type="text" required />

          <label for="productPrice">Preço:</label>
          <input v-model="editableProduct.price" id="productPrice" type="number" step="0.01" required />

          <label for="productCapacity">Capacidade:</label>
          <input v-model="editableProduct.capacity" id="productCapacity" type="number" required />

          <!-- Outros campos conforme o tipo de produto -->
          <button type="submit">Salvar</button>
          <button @click="closeEditModal">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllRam, fetchRamById } from '../api';
import { fetchAllPsu, fetchPsuById } from '../api';
import { fetchAllMonitor, fetchMonitorById } from '../api';
import { fetchAllGpu, fetchGpuById } from '../api';
import { fetchAllCpu, fetchCpuById } from '../api';
import { fetchAllTower, fetchTowerById } from '../api';
import { fetchAllCooler, fetchCoolerById } from '../api';
import { fetchAllStorage, fetchStorageById } from '../api';
import { fetchAllPC, fetchPCById } from '../api';
import { fetchAllMobo, fetchMoboById } from '../api';

import RamCard from '@/components/productCards/RamCard.vue';
import PsuCard from '@/components/productCards/PsuCard.vue';
import GpuCard from '@/components/productCards/GpuCard.vue';
import MonitorCard from '@/components/productCards/MonitorCard.vue';
import CpuCard from '@/components/productCards/CpuCard.vue';
import TowerCard from '@/components/productCards/TowerCard.vue';
import CoolerCard from '@/components/productCards/CoolerCard.vue';
import StorageCard from '@/components/productCards/StorageCard.vue';
import ComputerCard from '@/components/productCards/ComputerCard.vue';
import MoboCard from '@/components/productCards/MoboCard.vue';

export default {
  name: 'MeusProdutos',
  components: {
    RamCard,
    PsuCard,
    GpuCard,
    MonitorCard,
    CpuCard,
    TowerCard,
    CoolerCard,
    StorageCard,
    ComputerCard,
    MoboCard
  },
  data() {
    return {
      products: [],
      loading: false,
      productType: 'select',
      isEditModalOpen: false, 
      editableProduct: {}
    };
  },
  methods: {
    async loadProducts() {
      if (this.productType === 'select') {
        return;
      }

      this.loading = true;
      this.products = [];

      try {
        let response;
        let fetchDetails;

        switch (this.productType) {
          case 'ram':
            response = await fetchAllRam();
            fetchDetails = fetchRamById;
            break;
          case 'psu':
            response = await fetchAllPsu();
            fetchDetails = fetchPsuById;
            break;
          case 'monitor':
            response = await fetchAllMonitor();
            fetchDetails = fetchMonitorById;
            break;
          case 'placaDeVideo':
            response = await fetchAllGpu();
            fetchDetails = fetchGpuById;
            break;
          case 'processador':
            response = await fetchAllCpu();
            fetchDetails = fetchCpuById;
            break;
          case 'gabinete':
            response = await fetchAllTower();
            fetchDetails = fetchTowerById;
            break;
          case 'cooler':
            response = await fetchAllCooler();
            fetchDetails = fetchCoolerById;
            break;
          case 'disco':
            response = await fetchAllStorage();
            fetchDetails = fetchStorageById;
            break;
          case 'computador':
            response = await fetchAllPC();
            fetchDetails = fetchPCById;
            break;
          case 'placaMae':
            response = await fetchAllMobo();
            fetchDetails = fetchMoboById;
            break;
          default:
            throw new Error('Tipo de produto não suportado');
        }

        const products = response.data.items;
        for (let product of products) {
          const productDetails = await fetchDetails(product.id);

          if (productDetails && productDetails.data) {
            product.name = productDetails.data.data.name;
            product.price = productDetails.data.data.price;
            switch (this.productType) {
              case 'ram':
                product.capacity = productDetails.data.data.capacity;
                product.socket = productDetails.data.data.socket;
                product.frequency = productDetails.data.data.frequency;
                break;
              case 'psu':
                product.potency = productDetails.data.data.potency;
                product.potencyReal = productDetails.data.data.potencyReal;
                product.stamp = productDetails.data.data.stamp;
                product.modular = productDetails.data.data.modular;
                break;
            }
          } else {
            product.price = null;
          }
        }

        this.products = products;
        this.loading = false;
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
        this.loading = false;
      }
    },
    formatCurrency(value) {
      return value ? value.toLocaleString('pt', {
        style: 'currency',
        currency: 'EUR',
      }) : 'Preço não disponível';
    },
    getProductComponent() {
      switch (this.productType) {
        case 'ram':
          return 'RamCard';
        case 'psu':
          return 'PsuCard';
        case 'monitor':
          return 'MonitorCard';
        case 'placaDeVideo':
          return 'GpuCard';
        case 'processador':
          return 'CpuCard';
        case 'gabinete':
          return 'TowerCard';
        case 'cooler':
          return 'CoolerCard';
        case 'disco':
          return 'StorageCard';
        case 'computador':
          return 'PCCard';
        case 'placaMae':
          return 'MoboCard';
        default:
          return null;
      }
    },
    openEditModal(product) {
      this.editableProduct = { ...product }; 
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    saveProduct() {
      const index = this.products.findIndex(p => p.id === this.editableProduct.id);
      if (index !== -1) {
        this.products[index] = this.editableProduct; 
      }
      this.closeEditModal();
      location.reload()
    }
  }
};
</script>

<style scoped>
.meus-produtos {
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
