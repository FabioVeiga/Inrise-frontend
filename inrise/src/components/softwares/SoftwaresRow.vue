<template>
  <div class="flex justify-center flex-wrap gap-8">
    <div v-if="loading" class="text-center text-xl text-gray-500">
      <p>Carregando Softwares...</p>
    </div>
    <SoftwareBox 
      v-for="(item, index) in softwareItems" 
      :key="index" 
      :label="item.name" 
      :image="item.image"
      :description="item.description" 
      :value="item.id" 
      :selectedTypes="selectedTypes"
      :minimumGPU="item.minimumGPU"
      :idealGPU="item.idealGPU"
      @update:selectedTypes="updateSelection" 
      class="flex-item" 
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import SoftwareBox from '../SoftwareBox.vue';
import * as softwareUtils from '@/utils/softwareUtils';

export default {
  name: 'SoftwaresRow',
  components: {
    SoftwareBox
  },
  props: {
    categoryIds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTypes: [],
      softwareItems: [],
      loading: true
    };
  },
  async created() {
    try {
      const categories = await softwareUtils.fetchCategories();
      console.log("Cats", categories);
      this.softwareItems = categories
        .filter(category => this.categoryIds.includes(category.id))
        .map(category => ({
          name: category.name,
          image: category.images[0]?.url || 'default-image.jpg',
          description: category.description || '',
          id: category.id,
          //Talvez eu possa já colocar props com o maior requisito de cada categoria dentro da row.
          minimumGPU: category.minimumGPU,
          idealGPU: category.idealGPU,
        }));

      const savedTypes = Cookies.get('selectedSoftwares');
      if (savedTypes) {
        this.selectedTypes = JSON.parse(savedTypes);
        console.log('Loaded selected softwares from cookies:', this.selectedTypes);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    updateSelection(newSelection) {
      this.selectedTypes = newSelection;
      this.$emit('softwares-selected', this.selectedTypes);  // Emit to parent
      Cookies.set('selectedSoftwares', JSON.stringify(this.selectedTypes));  // Update cookies
      console.log('Updated selectedSoftwares:', this.selectedTypes);
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.flex-item {
  flex: 1 1 calc(25% - 2rem);
  max-width: calc(25% - 2rem);
}

@media (max-width: 1024px) {
  .flex-item {
    flex: 1 1 calc(50% - 2rem);
    max-width: calc(50% - 2rem);
  }
}

@media (max-width: 640px) {
  .flex-item {
    flex: 1 1 calc(100% - 2rem);
    max-width: calc(100% - 2rem);
  }
}
</style>
