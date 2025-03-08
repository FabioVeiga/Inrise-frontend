<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
    @control-product="handleControl" @edit-product="openEditModal">
    <template #default="{ product }">
      <p>Form Factor: {{ getTowerLabel(product.dimesion) || 'Tamanho não disponível' }}</p>
      <p>Max Ventoinhas: {{ product.maxFans || 'Max. Ventoinhas não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Gabinete -->
  <EditTowerModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditTowerModal from '../EditTowerModal.vue';
import { deleteTower, controlTower } from '@/api';

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
    async handleControl(product) {
      await controlTower(product.id, product.active)
      alert(product.active ? 'Gabinete desativado com sucesso!' : 'Gabinete ativado com sucesso!');
      this.$emit('control-product', product);
    },
    getTowerLabel(towerType) {
      const labels = {
        'microatx': 'Micro ATX',
        'miniatx': 'Mini ATX',
        'atx': 'ATX',

      };
      return labels[towerType] || 'Inválido';
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
