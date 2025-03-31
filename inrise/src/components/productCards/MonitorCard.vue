<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
    @control-product="handleControl" @edit-product="openEditModal">
    <!-- <template #default="{ product }">
      <p>Dimensão: {{ product.dimesion ? product.dimesion + ' "' : 'Dimensão não disponível' }}</p>
      <p>Frequência: {{ product.updateVolume ? product.updateVolume + ' Hz' : 'Frequência não disponível' }}</p>
      <p>Resolução: {{ product.quality || 'Resolução não disponível' }}</p>
    </template> -->
  </ProductCard>

  <!-- Modal de Edição de Monitor -->
  <EditMonitorModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditMonitorModal from '../EditMonitorModal.vue';
import { deleteMonitor, controlMonitor } from '@/api';

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
      await controlMonitor(product.id, product.active)
      alert(product.active ? 'Pre-build desativado com sucesso!' : 'Pre-build ativado com sucesso!');
      this.$emit('control-product', product);
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
        await deleteMonitor(product.id);
        alert('Pre-build excluído com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir o Pre-build');
        console.error(error);
      }
    },
  },
};
</script>
