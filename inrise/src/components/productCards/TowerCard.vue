<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteTower"
    @edit-product="openEditModal"
  >
    <template #default="{ product }">
      <p>Tamanho: {{ product.dimesion || 'Tamanho não disponível' }}</p>
      <p>Max Ventoinhas: {{ product.maxFans || 'Max. Ventoinhas não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Gabinete -->
  <EditTowerModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditTowerModal from '../EditTowerModal.vue';  
import { deleteTower } from '@/api';

export default {
  name: 'TowerCard',
  components: {
    ProductCard,
    EditTowerModal,
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
    async handleDeleteTower(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteTower(product.id);
        alert('Gabinete excluído com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir o gabinete');
        console.error(error);
      }
    },
  },
};
</script>
