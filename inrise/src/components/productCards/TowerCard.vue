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
  <EditTowerModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditTowerModal from '../EditTowerModal.vue';  // Importando o modal de Gabinete (Tower)
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
      isEditModalOpen: false,  // Controle para abrir o modal de Gabinete
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
    async handleDeleteTower(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteTower(product.id);
        alert('Gabinete excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o gabinete');
        console.error(error);
      }
    },
  },
};
</script>
