<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
  @control-product="handleControl" @edit-product="openEditModal">
    <template #default="{ product }">
      <p>Ar: {{ product.air }}</p>
      <p>Refrigeração: {{ product.refrigeration }}</p>
      <p>Ventoinhas: {{ product.fanQuantity }}</p>
      <p>Dimensões: {{ product.dimension }} mm</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição para Cooler -->
  <EditCoolerModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteCooler, controlCooler } from '@/api';
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
    async handleControl(product) {
      await controlCooler(product.id, product.active)
      alert(product.active ? 'Cooler desativado com sucesso!' : 'Cooler ativado com sucesso!');
      this.$emit('control-product', product);
    },
    openEditModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    handleSave(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    },
    async handleDelete(product) {
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
