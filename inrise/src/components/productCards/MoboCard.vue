<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
    @control-product="handleControl" @edit-product="openEditModal">
    <template #default="{ product }">
      <p>Form Factor: {{ getMoboLabel(product.socketSSD) || 'Tamanho não disponível' }}</p>
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
import { deleteMobo, controlMobo } from '@/api';

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
    async handleControl(product) {
      await controlMobo(product.id, product.active)
      alert(product.active ? 'MOBO desativada com sucesso!' : 'MOBO ativada com sucesso!');
      this.$emit('control-product', product);
    },
    getMoboLabel(moboType) {
      const labels = {
        'microatx': 'Micro ATX',
        'miniatx': 'Mini ATX',
        'atx': 'ATX',

      };
      return labels[moboType] || 'Inválido';
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
