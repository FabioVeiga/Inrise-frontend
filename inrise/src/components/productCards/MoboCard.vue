<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteMobo"
    @edit-product="openEditModal"
  >
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Memória Suportada: {{ product.socketMemory || 'Informação não disponível' }}</p>
      <p>Memória de Vídeo: {{ product.socketMemoryVideo || 'Informação não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Placa-Mãe -->
  <EditMoboModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditMoboModal from '../EditMoboModal.vue';  // Importando o modal de placa-mãe
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
      isEditModalOpen: false,  // Controle para abrir o modal de placa-mãe
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
