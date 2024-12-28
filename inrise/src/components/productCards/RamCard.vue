<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency" 
    @delete-product="handleDeleteRam">
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Frequência: {{ product.frequency || 0 }} MHz</p>
      <p>Capacidade: {{ product.capacity || 0 }} GB</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteRam } from '@/api';

export default {
  name: 'RamCard',
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
    async handleDeleteRam(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteRam(product.id);
        alert('Memória RAM excluída com sucesso!');
      } catch (error) {
        alert('Erro ao excluir a memória RAM');
        console.error(error);
      }
    },
  },
};
</script>
