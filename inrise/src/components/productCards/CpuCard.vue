<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteCpu"
<<<<<<< HEAD
    @edit-product="openEditModal"
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
  >
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Geração: {{ product.generation || 'Geração não disponível' }}</p>
      <p>Frequência: {{ product.frequency || 'Frequência não disponível' }} GHz</p>
      <p>Núcleos: {{ product.core || 'Núcleos não disponíveis' }}</p>
    </template>
  </ProductCard>
<<<<<<< HEAD

  <!-- Modal de Edição -->
  <EditCpuModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
</template>

<script>
import ProductCard from './ProductCard.vue';
<<<<<<< HEAD
import EditCpuModal from '../EditCpuModal.vue';
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
import { deleteCpu } from '@/api';

export default {
  name: 'CpuCard',
  components: {
    ProductCard,
<<<<<<< HEAD
    EditCpuModal,
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
      isEditModalOpen: false,  // Controle para abrir o modal de CPU
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
      this.$emit('update-product', updatedProduct); // Emite o evento de atualização do produto
      this.closeEditModal();
    },
=======
  methods: {
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
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
