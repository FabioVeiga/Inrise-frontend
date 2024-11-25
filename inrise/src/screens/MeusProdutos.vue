<template>
  <div class="meus-produtos flex flex-col py-8 px-4">
    <h1 class="text-3xl font-bold text-center mb-6">Meus Produtos</h1>

    <div class="form-group my-8">
      <select class="px-4 w-40 h-12" v-model="productType" id="productType" @change="loadProducts" required>
        <option value="ram">Memória RAM</option>
        <option value="psu">Fonte</option>
        <option value="placaDeVideo">Placa de Vídeo</option>
        <option value="processador">Processador</option>
        <option value="gabinete">Gabinete</option>
        <option value="cooler">Cooler</option>
        <option value="disco">Disco</option>
      </select>
    </div>



    <div v-if="products.length === 0 && !loading" class="text-center text-xl text-gray-500">
      <p>Não há produtos cadastrados.</p>
    </div>

    <div v-else-if="loading" class="text-center text-xl text-gray-500">
      <p>Carregando produtos...</p>
    </div>

    <!-- Exibe os produtos -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <component v-for="product in products" :key="product.id" :is="getProductComponent()" :product="product"
        :formatCurrency="formatCurrency" />
    </div>
  </div>
</template>

<script>
import { fetchAllRam, fetchRamById } from '../api';
import { fetchAllPsu, fetchPsuById } from '../api';
import RamCard from './RamCard.vue';
import PsuCard from './PsuCard.vue';
export default {
  name: 'MeusProdutos',
  components: {
    RamCard,
    PsuCard,
  },
  data() {
    return {
      products: [],
      loading: true,
      productType: 'psu', // Tipo de produto inicial
    };
  },
  async created() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
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

          default:
            throw new Error('Tipo de produto não suportado');
        }

        const products = response.data.items;
        for (let product of products) {
          const productDetails = await fetchDetails(product.id);

          if (productDetails && productDetails.data) {
            product.name = productDetails.data.data.name;
            product.price = productDetails.data.data.price.finalPrice;
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
        default:
          return null;
      }
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
