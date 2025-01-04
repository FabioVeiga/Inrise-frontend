<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteMonitor"
    @edit-product="openEditModal"
  >
    <template #default="{ product }">
      <p>Dimensão: {{ product.dimesion ? product.dimesion + ' "' : 'Dimensão não disponível' }}</p>
      <p>Frequência: {{ product.updateVolume ? product.updateVolume + ' Hz' : 'Frequência não disponível' }}</p>
      <p>Resolução: {{ product.quality || 'Resolução não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Monitor -->
  <EditMonitorModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditMonitorModal from '../EditMonitorModal.vue';  // Importando o modal de monitor
import { deleteMonitor } from '@/api';

export default {
  name: 'MonitorCard',
  components: {
    ProductCard,
    EditMonitorModal,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditModalOpen: false,  // Controle para abrir o modal de monitor
    };
  },
  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
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
    async handleDeleteMonitor(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteMonitor(product.id);
        alert('Monitor excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o monitor');
        console.error(error);
      }
    },
  },
};
</script>
