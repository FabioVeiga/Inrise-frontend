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
import { loadProducts } from '@/utils/productUtils.js'
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
        this.products = await loadProducts(this.productType);
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
      location.reload();
    },

    saveProduct() {
      const index = this.products.findIndex(p => p.id === this.editableProduct.id);
      if (index !== -1) {
        this.products[index] = this.editableProduct; 
      }
      this.closeEditModal();
      location.reload();
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
