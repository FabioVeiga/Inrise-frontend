<template>
  <div>
    <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
      @control-product="handleControl" @edit-product="openEditModal">
      <template #default="{ product }">
        <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
        <p>Frequência: {{ product.frequency || 0 }} MHz</p>
        <p>Capacidade: {{ product.capacity || 0 }} GB</p>
      </template>
    </ProductCard>

    <!-- Modal de RAM -->
    <EditRamModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditRamModal from '@/components/EditRamModal.vue';
import { deleteRam, controlRam } from '@/api';

export default {
  name: 'RamCard',
  components: {
    ProductCard,
    EditRamModal,
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
    async handleDelete(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteRam(product.id);
        alert('Memória RAM excluída com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir a memória RAM');
        console.error(error);
      }
    },
    async handleControl(product) {
      await controlRam(product.id, product.active)
      alert(product.active ? 'Memória RAM desativada com sucesso!' : 'Memória RAM ativada com sucesso!');
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
    }
  },
};
</script>