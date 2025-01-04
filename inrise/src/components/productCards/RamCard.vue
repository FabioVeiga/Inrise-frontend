<template>
  <div>
    <ProductCard 
      :product="product" 
      :formatCurrency="formatCurrency"
      @delete-product="handleDeleteRam"
      @edit-product="openEditRamModal"
    >
      <template #default="{ product }">
        <p>Socket: {{ product.socket || 'Socket não disponível' }}</p>
        <p>Frequência: {{ product.frequency || 0 }} MHz</p>
        <p>Capacidade: {{ product.capacity || 0 }} GB</p>
      </template>
    </ProductCard>

    <!-- Modal de RAM -->
    <EditRamModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditRamModal from '@/components/EditRamModal.vue';
import { deleteRam } from '@/api';

export default {
  name: 'RamCard',
  components: {
    ProductCard,
    EditRamModal, // Modal de RAM
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditModalOpen: false,
    };
  },
  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
    async handleDeleteRam(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteRam(product.id);
        alert('Memória RAM excluída com sucesso!');
      } catch (error) {
        alert('Erro ao excluir a memória RAM');
        console.error(error);
      }
    },
    openEditRamModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    }
  },
};
</script>
