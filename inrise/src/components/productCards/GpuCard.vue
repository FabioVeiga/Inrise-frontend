<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteGPU"
    @edit-product="openEditModal"
  >
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Bits: {{ product.bits || 'Bits não disponíveis' }}</p>
      <p>Memória: {{ product.capacity ? product.capacity + ' GB' : 'Memória não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de GPU -->
  <EditGpuModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditGpuModal from '../EditGpuModal.vue'; 
import { deleteGPU } from '@/api';

export default {
  name: 'GpuCard',
  components: {
    ProductCard,
    EditGpuModal,
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
  data() {
    return {
      isEditModalOpen: false,
    };
  },
  methods: {
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
    async handleDeleteGPU(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteGPU(product.id);
        alert('GPU excluída com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir a GPU');
        console.error(error);
      }
    },
  },
};
</script>
