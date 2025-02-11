<template>
  <div>
    <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDeletePSU"
      @edit-product="openEditPsuModal">
      <template #default="{ product }">
        <p>Potência: {{ product.potency || 'Potência não disponível' }}</p>
        <p>Potência Real: {{ product.potencyReal || 'Potência real não disponível' }}</p>
        <p>Selo: {{ formatStamp(product.stamp) }}</p>
        <p>Modular: {{ formatModular(product.modular) }}</p>
      </template>
    </ProductCard>

    <!-- Modal de PSU -->
    <EditPsuModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="handleSave" />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import EditPsuModal from '@/components/EditPsuModal.vue';
import { deletePSU } from '@/api';

export default {
  name: 'PsuCard',
  components: {
    ProductCard,
    EditPsuModal,
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
    formatStamp(stamp) {
      return stamp ? stamp.charAt(0).toUpperCase() + stamp.slice(1) : 'Selo não disponível';
    },
    formatModular(modular) {
      return modular ? 'Sim' : 'Não';
    },
    async handleDeletePSU(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deletePSU(product.id);
        alert('Fonte de alimentação excluída com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir a fonte de alimentação');
        console.error(error);
      }
    },
    openEditPsuModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      //todo: o reload dá f5 na pagina e isso pode ser um metodo comum pra todos os edits i guess location.reload();

    },
    handleSave(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    }
  },
};
</script>
