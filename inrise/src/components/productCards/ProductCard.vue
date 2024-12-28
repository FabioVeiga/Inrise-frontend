<template>
  <div class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
    @click="openEditModal">
    <!-- Nome do Produto -->
    <h3 class="h-12 mb-4 text-xl font-semibold text-gray-800">{{ product.name }}</h3>

    <!-- Informações do Produto (variáveis) -->
    <div class="text-gray-600">
      <slot :product="product" />
    </div>

    <!-- Preço do Produto -->
    <p v-if="product.price.finalPrice" class="mt-4 text-lg font-bold text-blue-600">Preço: {{
      formatCurrency(product.price.finalPrice) }}</p>
    <p v-else class="mt-4 text-lg text-gray-500">Preço não disponível</p>

    <!-- Botão de Excluir -->
    <button @click.stop="deleteProduct"
      class="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
      Excluir
    </button>
  </div>

  <!-- Modal de Edição -->
  <EditRamModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />

</template>

<script>
import EditRamModal from '@/components/EditRamModal.vue';

export default {
  name: 'ProductCard',
  props: {
    product: Object,
    formatCurrency: Function,
  },

  emits: ['update-product', 'delete-product', 'edit-product'],
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
    }, saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    },

    async deleteProduct(event) {
      event.preventDefault();
      // Emitir evento de exclusão para o componente pai
      this.$emit('delete-product', this.product);
    }
  },
  components: {
    EditRamModal,
  }
};
</script>