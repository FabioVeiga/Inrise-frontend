<template>
  <div class="grupos-de-software">
    <h1 class="text-4xl font-bold my-8">Grupos de Software</h1>

    <div v-for="(category, categoryId) in categories" :key="categoryId" class="mb-5">
      <div class="flex justify-between items-center bg-blue-500 text-white py-2 px-4 rounded-md">
        <button @click="toggleCategory(categoryId)" class="text-left flex-1">
          {{ category.name }}
        </button>
        <button @click="deleteCategory(categoryId)" class="bg-red-500 text-white px-4 py-2 rounded-md">
          Excluir Grupo
        </button>
      </div>

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
import { fetchAllSoftwareGroup, fetchAllSoftware, fetchCpuById, fetchGpuById, fetchRamById, deleteSoftwareGroup, //updateSoftwareOrder 
 } from '@/api';

export default {
  name: 'GruposDeSoftware',
  data() {
    return {
      categories: {},
    };
  },
  methods: {
    async fetchSoftwareDetails(software) {
      try {
        const [minCpu, maxCpu, minGpu, maxGpu, minRam, maxRam] = await Promise.all([
          fetchCpuById(software.processadorMinId),
          fetchCpuById(software.processadorIdealId),
          fetchGpuById(software.videoBoardMinId),
          fetchGpuById(software.videoBoardIdealId),
          fetchRamById(software.memoryRamMinId),
          fetchRamById(software.memoryRamIdealId),
        ]);

        software.processadorMin = minCpu.data;
        software.processadorIdeal = maxCpu.data;
        software.videoBoardMin = minGpu.data;
        software.videoBoardIdeal = maxGpu.data;
        software.memoryRamMin = minRam.data;
        software.memoryRamIdeal = maxRam.data;
      } catch (error) {
        console.error('Erro ao carregar detalhes dos componentes para o software', software.id, error);
      }
    },

    async toggleCategory(categoryId) {
      const category = this.categories[categoryId];

      if (!category.softwares && !category.isLoading) {
        category.isLoading = true;
        try {
          const softwaresRes = await fetchAllSoftware(category.id);
          category.softwares = softwaresRes.data.items.filter(software => software.categoryId === category.id);
          for (let software of category.softwares) {
            await this.fetchSoftwareDetails(software);
          }
          category.isOpen = true;
        } catch (error) {
          console.error('Erro ao carregar softwares da categoria', categoryId, error);
        } finally {
          category.isLoading = false;
        }
      } else if (category.softwares) {
        category.isOpen = !category.isOpen;
      }
    },

    async fetchCategories() {
      try {
        const categoriesRes = await fetchAllSoftwareGroup();
        this.categories = categoriesRes.data.items;
        console.log(this.categories)
      } catch (error) {
        console.error('Erro ao carregar categorias de software', error);
      }
    },

    async deleteCategory(categoryId) {
      const category = this.categories[categoryId];
      try {
        await deleteSoftwareGroup(category.id);
        //@TODO: Usar esse reload em outras paginas
        alert('Grupo excluído com sucesso!');
        setTimeout(() => {
          location.reload();
        }, 100);
      } catch (error) {
        console.error('Erro ao excluir o grupo de software', categoryId, error);
        alert('Erro ao excluir o grupo.');
      }
    },

    handleDragStart(index, categoryId, event) {
      this.draggedItemIndex = index;
      event.dataTransfer.effectAllowed = 'move';
    },

    handleDragOver(event) {
      event.preventDefault(); 
    },

    handleDrop(index, category, event) {
      event.preventDefault();
      if (this.draggedItemIndex !== index) {
        const draggedItem = category.softwares[this.draggedItemIndex];
        const targetItem = category.softwares[index];

        category.softwares[this.draggedItemIndex] = targetItem;
        category.softwares[index] = draggedItem;

        this.saveOrder(category);
      }
    },

    handleDragEnd() {
      this.draggedItemIndex = null;
    },

    async saveOrder(category) {
      const updatedOrder = category.softwares
      console.log("Updota", updatedOrder)
    },
  },

  mounted() {
    this.fetchCategories();
  },
};
</script>
