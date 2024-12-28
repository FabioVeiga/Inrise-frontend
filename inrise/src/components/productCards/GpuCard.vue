<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteGPU"
  >
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Bits: {{ product.bits || 'Bits não disponíveis' }}</p>
      <p>Memória: {{ product.capacity ? product.capacity + ' GB' : 'Memória não disponível' }}</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteGPU } from '@/api';

export default {
  name: 'GpuCard',
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
    async handleDeleteGPU(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteGPU(product.id);
        alert('GPU excluída com sucesso!');
      } catch (error) {
        alert('Erro ao excluir a GPU');
        console.error(error);
      }
    },
  },
};
</script>
