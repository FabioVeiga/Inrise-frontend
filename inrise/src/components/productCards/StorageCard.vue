<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDelete"
    @control-product="handleControl" @edit-product="openEditModal">
    <template #default="{ product }">
      <p>Vel. de Leitura: {{ product.velocityRead + 'MB/s' || 'Velocidade não disponível' }}</p>
      <p>Capacidade: {{ product.capacity ? product.capacity + ' GB' : 'Capacidade não disponível' }}</p>
      <p>Vel. de Escrita: {{ product.velocityWrite + 'MB/s' || 'Velocidade não disponível' }}</p>
    </template>
  </ProductCard>

  <!-- Modal de Edição de Storage (ROM) -->
  <EditRomModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditRomModal from '../EditRomModal.vue';
import { deleteRom, controlRom } from '@/api';

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
    async handleControl(product) {
      await controlRom(product.id, product.active)
      alert(product.active ? 'Disco desativado com sucesso!' : 'Disco ativado com sucesso!');
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
        await deleteRom(product.id);
        alert('Dispositivo de armazenamento excluído com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir o dispositivo de armazenamento');
        console.error(error);
      }
    },
  },
};
</script>
