<template>
  <div class="grupos-de-software">
    <h1 class="text-4xl font-bold my-8">Grupos de Software</h1>

    <div v-for="(category, categoryId) in categories" :key="categoryId" class="mb-5">
      <!-- Category Header Section -->
      <div class="flex justify-between items-center bg-blue-500 text-white py-2 px-4 rounded-md">
        <button @click="toggleCategory(categoryId)" class="text-left flex-1">
          {{ category.name }}
        </button>
        <button @click="deleteCategory(categoryId)" class="bg-red-500 text-white px-4 py-2 rounded-md">
          Excluir Grupo
        </button>
      </div>

      <!-- Image Display Section -->
      <div v-if="category.isOpen && (category.images || category.imagePreview)"
        class="col-span-2 image-upload-card border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center p-4 cursor-pointer hover:bg-gray-100 transition relative mt-4"
        @dragover.prevent @drop="handleImageDrop($event, category)" @click="triggerFileInput(categoryId)">
        
        <img v-if="category.images[0]?.url" :src="category.images[0]?.url" alt="Imagem do Grupo"
          class="w-full h-full object-cover rounded-md" />
        
        <img v-if="category.imagePreview && !category.images[0]?.url" :src="category.imagePreview"
          alt="Pré-visualização da imagem" class="w-full h-full object-cover rounded-md" />
        
        <div v-if="!category.images[0]?.url" class="text-center text-gray-500">
          <span>Arraste ou clique para carregar uma imagem</span>
        </div>

        <input type="file" :ref="'fileInput' + categoryId"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="handleImageUpload($event, category)"
          accept="image/*" />
      </div>

      <!-- Software List and Table -->
      <div v-if="category.isLoading" class="mt-3 text-center">
        <span>Carregando...</span>
      </div>

      <div v-if="category.isOpen && category.softwares" class="mt-3">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="border px-4 py-2">Nome do Software</th>
              <th class="border px-4 py-2">Req Min Processador</th>
              <th class="border px-4 py-2">Req Max Processador</th>
              <th class="border px-4 py-2">Req Min GPU</th>
              <th class="border px-4 py-2">Req Max GPU</th>
              <th class="border px-4 py-2">Req Min RAM</th>
              <th class="border px-4 py-2">Req Max RAM</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(software, index) in category.softwares" :key="software.id" class="hover:bg-gray-100"
              :draggable="true" @dragstart="handleDragStart(index, categoryId, $event)"
              @dragover="handleDragOver($event)" @drop="handleDrop(index, category, $event)"
              @dragend="handleDragEnd($event)">
              <td class="border px-4 py-2">{{ software.name }}</td>
              <td class="border px-4 py-2">{{ software.processadorMin.data.name }}</td>
              <td class="border px-4 py-2">{{ software.processadorIdeal.data.name }}</td>
              <td class="border px-4 py-2">{{ software.videoBoardMin.data.name }}</td>
              <td class="border px-4 py-2">{{ software.videoBoardIdeal.data.name }}</td>
              <td class="border px-4 py-2">{{ software.memoryRamMin.data.name }}</td>
              <td class="border px-4 py-2">{{ software.memoryRamIdeal.data.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import * as softwareUtils from '@/utils/softwareUtils';

export default {
  name: 'GruposDeSoftware',
  data() {
    return {
      categories: {},
    };
  },
  methods: {
    async fetchCategories() {
      this.categories = await softwareUtils.fetchCategories();
    },

    toggleCategory(categoryId) {
      softwareUtils.toggleCategory(categoryId, this.categories);
    },

    async deleteCategory(categoryId) {
      await softwareUtils.deleteCategory(categoryId, this.categories);
    },

    handleDragStart(index, categoryId, event) {
      softwareUtils.handleDragStart(index, categoryId, event);
    },

    handleDragOver(event) {
      softwareUtils.handleDragOver(event);
    },

    handleDrop(index, category, event) {
      softwareUtils.handleDrop(index, category, event);
    },

    handleDragEnd() {
      this.draggedItemIndex = null;
    },

    triggerFileInput(categoryId) {
      softwareUtils.triggerFileInput(categoryId, this.$refs);
    },

    handleImageUpload(event, category) {
      softwareUtils.handleImageUpload(event, category);
    },

    handleImageDrop(event, category) {
      softwareUtils.handleImageDrop(event, category);
    },
  },

  mounted() {
    this.fetchCategories();
  },
};
</script>
