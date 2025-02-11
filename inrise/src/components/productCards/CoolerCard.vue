<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @update-product="updateProduct"
    @delete-product="handleDeleteCooler" @edit-product="openCoolerModal">
    <template #default="{ product }">
      <p>Ar: {{ product.air }}</p>
      <p>Refrigeração: {{ product.refrigeration }}</p>
      <p>Ventoinhas: {{ product.fanQuantity }}</p>
      <p>Dimensões: {{ product.dimension }} mm</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição para Cooler -->
  <EditCoolerModal v-if="isEditModalOpen" :product="product" @close="closeCoolerModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteCooler } from '@/api';
import EditCoolerModal from '@/components/EditCoolerModal.vue';

export default {
  name: 'CoolerCard',
  components: {
    ProductCard,
    EditCoolerModal,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    formatCurrency: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      isEditModalOpen: false,
    };
  },
  methods: {
    openCoolerModal() {
      this.isEditModalOpen = true;
    },
    closeCoolerModal() {
      this.isEditModalOpen = false;
    },
    handleSave(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeCoolerModal();
    },
    async handleDeleteCooler(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteCooler(product.id);
        alert('Cooler excluído com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir o cooler');
        console.error(error);
      }
    },
  },
};
</script>
