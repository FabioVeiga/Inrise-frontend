<template>
  <ProductCard :product="ramProduct" :formatCurrency="formatCurrency"
  @delete-product="handleDeleteRam">
    <template #default="{ product }">
      <p>Socket: {{ product.socket }}</p>
      <p>Frequência: {{ product.frequency }} MHz</p>
      <p>Capacidade: {{ product.capacity }} GB</p>
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
  data() {
    return {
      ramProduct: {
        id: 1,
        name: '',
        socket: '',
        frequency: 0,
        capacity: 0,
        price: { finalPrice: 0 },
      },
    };
  },
  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
    async handleDeleteRam(product) {
      try {
        await deleteRam(product.id);
        alert('Memória RAM excluída com sucesso!');
      } catch (error) {
        alert('Erro ao excluir a memória RAM');
      }
    },
  },
};
</script>
