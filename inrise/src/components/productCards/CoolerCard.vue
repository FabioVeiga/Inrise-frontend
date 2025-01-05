<template>
  <ProductCard :product="product" :formatCurrency="formatCurrency" @update-product="updateProduct"
<<<<<<< HEAD
    @delete-product="handleDeleteCooler" @edit-product="openCoolerModal">
=======
    @delete-product="handleDeleteCooler">
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
    <template #default="{ product }">
      <p>Ar: {{ product.air }}</p>
      <p>Refrigeração: {{ product.refrigeration }}</p>
      <p>Ventoinhas: {{ product.fanQuantity }}</p>
      <p>Dimensões: {{ product.dimension }} mm</p>
    </template>
  </ProductCard>
<<<<<<< HEAD

  <!-- Modal de Edição para Cooler -->
  <EditCoolerModal v-if="isEditModalOpen" :product="product" @close="closeCoolerModal" @save="saveProduct" />
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
</template>

<script>
import ProductCard from './ProductCard.vue';
import { deleteCooler } from '@/api';
<<<<<<< HEAD
import EditCoolerModal from '@/components/EditCoolerModal.vue';
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5

export default {
  name: 'CoolerCard',
  components: {
    ProductCard,
<<<<<<< HEAD
    EditCoolerModal, // Importando o modal de cooler
=======
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
  },
  props: {
    product: {
      type: Object,
      required: true,
<<<<<<< HEAD
    },
    formatCurrency: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      isEditModalOpen: false,
    };
  },
  methods: {
    openCoolerModal() {
      this.isEditModalOpen = true;
    },
    closeCoolerModal() {
      this.isEditModalOpen = false;
    },
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeCoolerModal();
=======
    }
  },
  updated() {
    console.log('Cooler product no updated:', this.product);
  },
  mounted() {
    console.log('Cooler product no mounted:', this.product);
  },

  methods: {
    formatCurrency(value) {
      return `R$ ${value.toFixed(2)}`;
    },
    updateProduct(updatedProduct) {
      console.log('Cooler product após atualização:', updatedProduct);
      this.$emit('update-product', updatedProduct);
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
    },
    async handleDeleteCooler(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deleteCooler(product.id);
        alert('Cooler excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o cooler');
        console.error(error);
      }
    },
  },
};
</script>
