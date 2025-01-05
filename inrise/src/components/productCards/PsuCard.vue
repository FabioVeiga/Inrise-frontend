<template>
<<<<<<< HEAD
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
    <EditPsuModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
  </div>
=======
  <ProductCard 
    :product="product" 
    :formatCurrency="formatCurrency"
    @delete-product="handleDeletePSU"
  >
    <template #default="{ product }">
      <p>Potência: {{ product.potency || 'Potência não disponível' }}</p>
      <p>Potência Real: {{ product.potencyReal || 'Potência real não disponível' }}</p>
      <p>Selo: {{ formatStamp(product.stamp) }}</p>
      <p>Modular: {{ formatModular(product.modular) }}</p>
    </template>
  </ProductCard>
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
</template>

<script>
import ProductCard from './ProductCard.vue';
<<<<<<< HEAD
import EditPsuModal from '@/components/EditPsuModal.vue';
import { deletePSU } from '@/api';
=======
import { deletePSU } from '@/api'; 
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5

export default {
  name: 'PsuCard',
  components: {
    ProductCard,
<<<<<<< HEAD
    EditPsuModal,
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
=======
  },
  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
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
      } catch (error) {
        alert('Erro ao excluir a fonte de alimentação');
        console.error(error);
      }
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
    },
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    }
  },
};
</script>
