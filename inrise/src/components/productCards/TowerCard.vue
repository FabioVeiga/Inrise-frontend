<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteTower"
<<<<<<< HEAD
    @edit-product="openEditModal"
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
  >
    <template #default="{ product }">
      <p>Tamanho: {{ product.dimesion || 'Tamanho não disponível' }}</p>
      <p>Max Ventoinhas: {{ product.maxFans || 'Max. Ventoinhas não disponível' }}</p>
    </template>
  </ProductCard>
<<<<<<< HEAD

  <!-- Modal de Edição de Gabinete -->
  <EditTowerModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
</template>

<script>
import ProductCard from './ProductCard.vue';
<<<<<<< HEAD
import EditTowerModal from '../EditTowerModal.vue';  // Importando o modal de Gabinete (Tower)
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
import { deleteTower } from '@/api';

export default {
  name: 'TowerCard',
  components: {
    ProductCard,
<<<<<<< HEAD
    EditTowerModal,
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
=======
  methods: {
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
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
