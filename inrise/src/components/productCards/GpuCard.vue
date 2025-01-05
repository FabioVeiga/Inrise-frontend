<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteGPU"
<<<<<<< HEAD
    @edit-product="openEditModal"
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
  >
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Bits: {{ product.bits || 'Bits não disponíveis' }}</p>
      <p>Memória: {{ product.capacity ? product.capacity + ' GB' : 'Memória não disponível' }}</p>
    </template>
  </ProductCard>
<<<<<<< HEAD

  <!-- Modal de Edição de GPU -->
  <EditGpuModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
</template>

<script>
import ProductCard from './ProductCard.vue';
<<<<<<< HEAD
import EditGpuModal from '../EditGpuModal.vue'; 
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
import { deleteGPU } from '@/api';

export default {
  name: 'GpuCard',
  components: {
    ProductCard,
<<<<<<< HEAD
    EditGpuModal,
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
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
<<<<<<< HEAD
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
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    },
=======
  methods: {
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
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
