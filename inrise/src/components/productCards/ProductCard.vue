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
    <p v-if="product.price?.finalPrice" class="mt-4 text-lg font-bold text-blue-600">Preço: {{
      formatCurrency(product.price?.finalPrice) }}</p>
    <p v-else class="mt-4 text-lg text-gray-500">Preço não disponível</p>

    <!-- Botão de Excluir -->
    <button @click.stop="deleteProduct"
      class="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
      Excluir
    </button>

    <!-- Botão de Ativar/Desativar -->
    <button @click.stop="controlProduct" :class="{
      'mt-4 w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50': true,
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': product.active,
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500': !product.active
    }">
      {{ product.active ? 'Desativar' : 'Ativar' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
    formatCurrency: Function,
  },
  emits: ['update-product', 'delete-product', 'edit-product', 'control-product'],
  methods: {
    openEditModal() {
      this.$emit('edit-product');
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    }, 
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    },
    async deleteProduct(event) {
      event.preventDefault();
      this.$emit('delete-product', this.product);
    },
    controlProduct(event) {
      console.log("Emission in productcard", this.product)
      event.preventDefault();
      this.$emit('control-product', {
        ...this.product,
      });
    }
  }
};
</script>
