<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeletePSU"
  >
    <template #default="{ product }">
      <p>Potência: {{ product.potency || 'Potência não disponível' }}</p>
      <p>Potência Real: {{ product.potencyReal || 'Potência real não disponível' }}</p>
      <p>Selo: {{ formatStamp(product.stamp) }}</p>
      <p>Modular: {{ formatModular(product.modular) }}</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deletePSU } from '@/api'; 

export default {
  name: 'PsuCard',
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
    formatStamp(stamp) {
      return stamp ? stamp.charAt(0).toUpperCase() + stamp.slice(1) : 'Selo não disponível';
    },
    formatModular(modular) {
      return modular ? 'Sim' : 'Não';
    },
    async handleDeletePSU(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deletePSU(product.id);
        alert('Fonte de alimentação excluída com sucesso!');
      } catch (error) {
        alert('Erro ao excluir a fonte de alimentação');
        console.error(error);
      }
    },
  },
};
</script>
