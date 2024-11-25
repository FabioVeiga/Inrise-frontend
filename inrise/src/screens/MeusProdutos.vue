<template>
  <div class="meus-produtos py-8 px-4">
    <h1 class="text-3xl font-bold text-center mb-6">Meus Produtos</h1>

    <div v-if="products.length === 0 && !loading" class="text-center text-xl text-gray-500">
      <p>Não há produtos cadastrados.</p>
    </div>

    <div v-else-if="loading" class="text-center text-xl text-gray-500">
      <p>Carregando produtos...</p>
    </div>

    <!-- Exibe os produtos -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
        <h3 class="text-xl font-semibold text-gray-800">{{ product.name }}</h3>
        <p class="text-gray-600">Socket: {{ product.socket }}</p>
        <p class="text-gray-600">Frequência: {{ product.frequency }} MHz</p>
        <p class="text-gray-600">Capacidade: {{ product.capacity }} GB</p>
        <p class="text-gray-600">Descrição: {{ product.description }}</p>
        <p v-if="product.price" class="mt-4 text-lg font-bold text-blue-600">Preço: {{ formatCurrency(product.price) }}</p>
        <p v-else class="mt-4 text-lg text-gray-500">Preço não disponível</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllRam } from '../api';  

export default {
  name: 'MeusProdutos',
  data() {
    return {
      products: [],  
      loading: true, 
    };
  },
  async created() {
    await this.loadProducts(); 
  },
  methods: {
    async loadProducts() {
      try {
        const response = await fetchAllRam(); 
        this.products = response.data.items; 
        this.loading = false;  
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
        this.loading = false;  
      }
    },
    formatCurrency(value) {
      // @TODO: Não exibe o preço mas na real o preço não sobe, está null na API
      return value ? value.toLocaleString('pt', {
        style: 'currency',
        currency: 'EUR',
      }) : 'Preço não disponível';
    }
  },
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
</style>
