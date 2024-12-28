<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteCpu"
  >
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Geração: {{ product.generation || 'Geração não disponível' }}</p>
      <p>Frequência: {{ product.frequency || 'Frequência não disponível' }} GHz</p>
      <p>Núcleos: {{ product.core || 'Núcleos não disponíveis' }}</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteCpu } from '@/api';

export default {
  name: 'CpuCard',
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
    async handleDeleteCpu(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteCpu(product.id);
        alert('Processador excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o processador');
        console.error(error);
      }
    },
  },
};
</script>
