<template>
  <div 
    class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
    @click="openEditModal"
  >
    <h3 class="h-12 mb-4 text-xl font-semibold text-gray-800">{{ product.name }}</h3>
    <p class="text-gray-600">Socket: {{ product.socket }}</p>
    <p class="text-gray-600">Frequência: {{ product.frequency }} MHz</p>
    <p class="text-gray-600">Capacidade: {{ product.capacity }} GB</p>
    <p v-if="product.price.finalPrice" class="mt-4 text-lg font-bold text-blue-600">Preço: {{ formatCurrency(product.price.finalPrice) }}</p>
    <p v-else class="mt-4 text-lg text-gray-500">Preço não disponível</p>
  </div>

  <!-- Modal de Edição -->
  <EditRamModal 
    v-if="isEditModalOpen" 
    :product="editedProduct" 
    @close="closeEditModal" 
    @save="saveProduct" 
  />
</template>

<script>
import EditRamModal from '@/components/EditRamModal.vue';

export default {
  name: 'RamCard',
  props: {
    product: Object,
    formatCurrency: Function,
  },
  created(){
    console.log("Edited product in parent:", this.product )

  },
  data() {
    return {
      isEditModalOpen: false,
      editedProduct: { ...this.product },
      
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
    }
  },
  components: {
    EditRamModal
  }
};
</script>
