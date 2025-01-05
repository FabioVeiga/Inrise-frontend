<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteStorage"
    @edit-product="openEditModal"
  >
    <template #default="{ product }">
      <p>Vel. de Leitura: {{ product.velocityRead + 'MB/s' || 'Velocidade não disponível' }}</p>
      <p>Capacidade: {{ product.capacity ? product.capacity + ' GB' : 'Capacidade não disponível' }}</p>
      <p>Vel. de Escrita: {{ product.velocityWrite + 'MB/s' || 'Velocidade não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Storage (ROM) -->
  <EditRomModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditRomModal from '../EditRomModal.vue';
import { deleteRom } from '@/api';

export default {
  name: 'StorageCard',
  components: {
    ProductCard,
    EditRomModal,
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
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    },
    async handleDeleteStorage(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteRom(product.id);
        alert('Dispositivo de armazenamento excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o dispositivo de armazenamento');
        console.error(error);
      }
    },
  },
};
</script>
