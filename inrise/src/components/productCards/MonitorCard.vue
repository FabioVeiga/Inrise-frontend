<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteMonitor"
  >
    <template #default="{ product }">
      <p>Dimensão: {{ product.dimesion ? product.dimesion + ' "' : 'Dimensão não disponível' }}</p>
      <p>Frequência: {{ product.updateVolume ? product.updateVolume + ' Hz' : 'Frequência não disponível' }}</p>
      <p>Resolução: {{ product.quality || 'Resolução não disponível' }}</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteMonitor } from '@/api';

export default {
  name: 'MonitorCard',
  components: {
    ProductCard,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
    async handleDeleteMonitor(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteMonitor(product.id);
        alert('Monitor excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o monitor');
        console.error(error);
      }
    },
  },
};
</script>
