<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @update-product="updateProduct"
    @delete-product="handleDeleteCooler">
    <template #default="{ product }">
      <p>Ar: {{ product.air }}</p>
      <p>Refrigeração: {{ product.refrigeration }}</p>
      <p>Ventoinhas: {{ product.fanQuantity }}</p>
      <p>Dimensões: {{ product.dimension }} mm</p>
    </template>
  </ProductCard>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteCooler } from '@/api';

export default {
  name: 'CoolerCard',
  components: {
    ProductCard,
  },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  updated() {
    console.log('Cooler product no updated:', this.product);
  },
  mounted() {
    console.log('Cooler product no mounted:', this.product);
  },

  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
    updateProduct(updatedProduct) {
      console.log('Cooler product após atualização:', updatedProduct);
      this.$emit('update-product', updatedProduct);
    },
    async handleDeleteCooler(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteCooler(product.id);
        alert('Cooler excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o cooler');
        console.error(error);
      }
    },
  },
};
</script>
