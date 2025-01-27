<template>
  <div class="flex justify-center flex-wrap gap-8">
    <div v-if="loading" class="text-center text-xl text-gray-500">
      <p>Carregando Softwares...</p>
    </div>
    <ActivityBox 
      v-for="(item, index) in softwareItems" 
      :key="index" 
      :label="item.name" 
      :image="item.image"
      :description="item.description" 
      :value="item.value" 
      :selectedTypes="selectedTypes"
      @update:selectedTypes="updateSelection" 
      class="flex-item" 
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import ActivityBox from '../ActivityBox.vue';
import * as softwareUtils from '@/utils/softwareUtils';

export default {
  name: 'SoftwaresRow',
  components: {
    ActivityBox
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
      loading: true // Initially set loading to true
    };
  },
  async created() {
    try {
      const categories = await softwareUtils.fetchCategories();

      this.softwareItems = categories
        .filter(category => this.categoryIds.includes(category.id))
        .map(category => ({
          name: category.name,
          image: category.images[0]?.url || 'default-image.jpg',
          description: category.description || '',
          value: category.id
        }));

      const savedTypes = Cookies.get('selectedSoftwares');
      if (savedTypes) {
        this.selectedTypes = JSON.parse(savedTypes);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      this.loading = false; // Set loading to false once the API request completes
    }
  },
  methods: {
    updateSelection(newSelection) {
      this.selectedTypes = newSelection;
      this.$emit('softwares-selected', this.selectedTypes);
      Cookies.set('selectedSoftwares', JSON.stringify(this.selectedTypes));
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
