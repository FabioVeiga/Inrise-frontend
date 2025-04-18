<template>
  <div class="grupos-de-software">
    <h1 class="text-4xl font-bold my-8">Grupos de Software</h1>

    <div v-for="(category, categoryId) in categories" :key="categoryId" class="mb-5">
      <!-- Category Header -->
      <div :class="{
        'flex justify-between items-center py-2 px-4 rounded-md bg-blue-500': true,
        ' text-white': !category.isEditing,
        'text-black': category.isEditing
      }">
        <button @click="toggleCategory(categoryId)" class="text-left flex-1" :disabled="category.isEditing">
          <span v-if="!category.isEditing">{{ category.name }}</span>
          <input v-else v-model="category.editName" type="text" class="border px-2 py-1 rounded-md" />
        </button>

        <button v-if="category.isOpen && !category.isEditing" @click="editCategory(categoryId)"
          class="bg-yellow-500 text-white px-4 py-2 rounded-md">
          Editar Grupo
        </button>
        <button v-if="category.isEditing" @click="saveChanges(categoryId)"
          class="bg-green-500 text-white px-4 py-2 rounded-md">
          Salvar Alterações
        </button>
        <button v-if="category.isEditing" @click="cancelChanges(categoryId)"
          class="bg-gray-400 text-white px-4 py-2 rounded-md">
          Cancelar Alterações
        </button>
        <button @click="deleteCategory(categoryId)" class="bg-red-500 text-white px-4 py-2 rounded-md">
          Excluir Grupo
        </button>
      </div>

      <!-- Image Display -->
      <div v-if="category.isOpen && (category.images || category.imagePreview)"
        class="col-span-2 image-upload-card border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center p-4 cursor-pointer hover:bg-gray-100 transition relative mt-4"
        @dragover.prevent @drop="handleImageDrop($event, category)"
        @click="category.isEditing ? triggerFileInput(categoryId) : null" :class="{
          'cursor-pointer hover:bg-gray-100': category.isEditing,
          'cursor-default hover:bg-transparent': !category.isEditing
        }">

        <!-- Image Preview -->
        <img v-if="category.images[0]?.url" :src="category.images[0]?.url" alt="Imagem do Grupo"
          class="w-full object-cover max-w-64 max-h-64 rounded-md" />

        <img v-if="category.imagePreview && !category.images[0]?.url" :src="category.imagePreview"
          alt="Pré-visualização da imagem" class="w-full object-cover max-h-28 rounded-md" />

        <div v-if="!category.images[0]?.url && !category.imagePreview" class="text-center text-gray-500">
          <span>
            {{ category.isEditing ? 'Arraste ou clique para carregar uma imagem (.JPG ou .PNG)' : 'Abra o modo de edição pra adicionar uma imagem (.JPG ou .PNG)' }}
          </span>
        </div>

        <!-- File Input -->
        <input type="file" :ref="'fileInput' + categoryId" class="absolute inset-0 w-full h-full opacity-0"
          @change="handleImageUpload($event, category)" accept="image/*" :disabled="!category.isEditing" :class="{
            'cursor-pointer hover:bg-gray-100': category.isEditing,
            'cursor-default hover:bg-transparent': !category.isEditing
          }" />
      </div>

      <!-- Software Table -->
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
              <th v-if="category.isEditing" class="border px-4 py-2">Editar/Remover</th>

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
              <td class="border px-4 py-2 text-center">
                <button v-if="category.isEditing" @click="deleteSoftware(software.id, categoryId)" class="bg-red-500 text-white px-4 py-2 rounded-md">
                  Deletar Software
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script>
import * as softwareUtils from '@/utils/softwareUtils';
import { deleteSoftware } from '@/api';
export default {
  name: 'GruposDeSoftware',
  data() {
    return {
      categories: {},
    };
  },
  methods: {
    async deleteSoftware(softwareId, categoryId) {
      try {
        await deleteSoftware(softwareId);
        const category = this.categories[categoryId];
        category.softwares = category.softwares.filter(software => software.id !== softwareId);
      } catch (error) {
        console.error("Failed to delete software", error);
      }
    },
    async fetchCategories() {
      this.categories = await softwareUtils.fetchCategories();
    },

    toggleCategory(categoryId) {
      console.log("Category index", categoryId, this.categories[categoryId]);
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
      console.log("Uploadedimg", category.images[0]);
    },

    handleImageDrop(event, category) {
      softwareUtils.handleImageDrop(event, category);
    },

    editCategory(categoryId) {
      softwareUtils.editCategory(categoryId, this.categories);
    },

    async saveChanges(categoryId) {
      await softwareUtils.saveChanges(categoryId, this.categories);
    },

    cancelChanges(categoryId) {
      softwareUtils.cancelChanges(categoryId, this.categories);
    },
  },

  mounted() {
    this.fetchCategories();
  },
};
</script>
