<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteTower"
  >
    <template #default="{ product }">
      <p>Tamanho: {{ product.dimesion || 'Tamanho não disponível' }}</p>
      <p>Max Ventoinhas: {{ product.maxFans || 'Max. Ventoinhas não disponível' }}</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteTower } from '@/api';

export default {
  name: 'TowerCard',
  components: {
    ProductCard,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    formatCurrency: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async handleDeleteTower(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteTower(product.id);
        alert('Gabinete excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o gabinete');
        console.error(error);
      }
    },
  },
};
</script>
