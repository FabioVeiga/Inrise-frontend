<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDeleteMobo"
    @edit-product="openEditModal">
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Memória Suportada: {{ product.socketMemory || 'Informação não disponível' }}</p>
      <p>Memória de Vídeo: {{ product.socketMemoryVideo || 'Informação não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Placa-Mãe -->
  <EditMoboModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditMoboModal from '../EditMoboModal.vue';
import { deleteMobo } from '@/api';

export default {
  name: 'MoboCard',
  components: {
    ProductCard,
    EditMoboModal,
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
    async handleDeleteMobo(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteMobo(product.id);
        alert('Placa-mãe excluída com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir a placa-mãe');
        console.error(error);
      }
    },
  },
};
</script>
