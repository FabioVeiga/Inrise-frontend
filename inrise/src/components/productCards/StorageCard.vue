<template>
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeleteStorage"
<<<<<<< HEAD
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
=======
  >
    <template #default="{ product }">
      <p>Vel. de Leitura: {{ product.velocityRead + 'MB/s'|| 'Velocidade não disponível' }}</p>
      <p>Capacidade: {{ product.capacity ? product.capacity + ' GB' : 'Capacidade não disponível' }}</p>
      <p>Vel. de Escrita: {{ product.velocityWrite +  'MB/s' || 'Velocidade não disponível' }}</p>
    </template>
  </ProductCard>
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
</template>

<script>
import ProductCard from './ProductCard.vue';
<<<<<<< HEAD
import EditRomModal from '../EditRomModal.vue';
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
import { deleteRom } from '@/api';

export default {
  name: 'StorageCard',
  components: {
    ProductCard,
<<<<<<< HEAD
    EditRomModal,
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
<<<<<<< HEAD
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
=======
  },
  methods: {
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
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
