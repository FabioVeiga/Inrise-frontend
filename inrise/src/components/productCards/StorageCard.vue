<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteStorage"
  >
    <template #default="{ product }">
      <p>Vel. de Leitura: {{ product.velocityRead + 'MB/s'|| 'Velocidade não disponível' }}</p>
      <p>Capacidade: {{ product.capacity ? product.capacity + ' GB' : 'Capacidade não disponível' }}</p>
      <p>Vel. de Escrita: {{ product.velocityWrite +  'MB/s' || 'Velocidade não disponível' }}</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteRom } from '@/api';

export default {
  name: 'StorageCard',
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
    async handleDeleteStorage(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteRom(product.id);
        alert('Dispositivo de armazenamento excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o dispositivo de armazenamento');
        console.error(error);
      }
    },
  },
};
</script>
