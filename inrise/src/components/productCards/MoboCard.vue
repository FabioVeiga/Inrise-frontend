<template>
    <ProductCard 
      :product="product" 
      :formatCurrency="formatCurrency"
      @delete-product="handleDeleteMobo"
    >
      <template #default="{ product }">
        <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
        <p>Memória Suportada: {{ product.socketMemory || 'Informação não disponível' }}</p>
        <p>Memória de Vídeo: {{ product.socketMemoryVideo || 'Informação não disponível' }}</p>
      </template>
    </ProductCard>
  </template>
  
  <script>
  import ProductCard from './ProductCard.vue';
  import { deleteMobo } from '@/api';
  
  export default {
    name: 'MoboCard',
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
      async handleDeleteMobo(product) {
        if (!product.id) {
          alert('Produto sem ID para exclusão');
          return;
        }
  
        try {
          await deleteMobo(product.id);
          alert('Placa-mãe excluída com sucesso!');
        } catch (error) {
          alert('Erro ao excluir a placa-mãe');
          console.error(error);
        }
      },
    },
  };
  </script>
  