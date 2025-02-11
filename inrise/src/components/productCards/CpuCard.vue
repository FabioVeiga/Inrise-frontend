<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
  @control-product="handleControl" @edit-product="openEditModal">
    <template #default="{ product }">
      <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
      <p>Geração: {{ product.generation || 'Geração não disponível' }}</p>
      <p>Frequência: {{ product.frequency || 'Frequência não disponível' }} GHz</p>
      <p>Núcleos: {{ product.core || 'Núcleos não disponíveis' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição -->
  <EditCpuModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditCpuModal from '../EditCpuModal.vue';
import { deleteCpu, controlCpu } from '@/api';

export default {
  name: 'CpuCard',
  components: {
    ProductCard,
    EditCpuModal,
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
      await controlCpu(product.id, product.active)
      alert(product.active ? 'CPU desativado com sucesso!' : 'CPU ativado com sucesso!');
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
        await deleteCpu(product.id);
        alert('Processador excluído com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir o processador');
        console.error(error);
      }
    },
  },
};
</script>
