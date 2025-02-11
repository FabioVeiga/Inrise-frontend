<template>
  <div>
    <ProductCard :product="product" :formatCurrency="formatCurrency" @delete-product="handleDeletePC"
      @edit-product="openEditPcModal">
      <template #default="{ product }">
        <p>Motherboard: {{ product.name || 'Mobo não disponível' }}</p>
        <p v-if="moboData === null">Carregando Motherboard...</p>
        <div v-else>
          <p>Socket CPU: {{ moboData?.socket ? moboData.socket : 'Socket não disponível' }}</p>
          <p>Socket RAM: {{ moboData?.socketMemory ? moboData.socketMemory : 'Socket não disponível' }}</p>
          <p>Socket Video: {{ moboData?.socketMemoryVideo ? moboData.socketMemoryVideo : 'Socket não disponível' }}</p>
          <p>Socket SSD: {{ moboData?.socketSSD ? moboData.socketSSD : 'Socket não disponível' }}</p>
          <p>Socket M2: {{ moboData?.socketM2 ? moboData.socketM2 : 'Socket não disponível' }}</p>


        </div>
      </template>
    </ProductCard>
    <!--
    <EditPcModal v-if="isEditModalOpen" :product="product" @close="closeEditModal" @save="saveProduct" />
    -->
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
//import EditPcModal from '@/components/EditPcModal.vue'; // Assuming you have an EditPcModal component
import { deletePC } from '@/api'; // Adjust this API call based on your back-end
import { fetchMoboById } from '@/api'; // Import the fetchMoboById function

export default {
  name: 'ComputerCard',
  components: {
    ProductCard,
    //EditPcModal,
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
      moboData: null, // Initially null, updated after fetch
    };
  },
  mounted() {
    // Fetch motherboard data once the component is mounted and if the product has a motherboard ID
    if (this.product.motherBoardId) {
      this.fetchMoboData(this.product.motherBoardId);
    }
  },
  watch: {
    // Watch for changes to moboData and log it whenever it updates
    moboData(newData) {
      console.log("moboData changed:", newData);
    },
  },
  methods: {
    async handleDeletePC(product) {
      if (!product.id) {
        alert('Produto sem ID para exclusão');
        return;
      }

      try {
        await deletePC(product.id);
        alert('Computador excluído com sucesso!');
        this.$emit('delete-product', product.id);
      } catch (error) {
        alert('Erro ao excluir o computador');
        console.error(error);
      }
    },
    openEditPcModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    saveProduct(updatedProduct) {
      this.$emit('update-product', updatedProduct);
      this.closeEditModal();
    },
    // Method to fetch Motherboard data
    async fetchMoboData(moboId) {
      try {
        const response = await fetchMoboById(moboId);
        this.moboData = response.data.data; // Update moboData once the fetch is done
        console.log("Motherboard data:", this.moboData);
      } catch (error) {
        console.error('Error fetching Motherboard data:', error);
        this.moboData = null; // Ensure it's still null if there's an error
      }
    },
  },
};
</script>
