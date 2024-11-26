<template>
  <div class="cadastrar-softwares">
    <h1 class="text-xl font-bold mb-4">Cadastrar Softwares</h1>

    <!-- Formulário de cadastro de software -->
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Ícone -->
      <div class="form-group col-span-1 md:col-span-2">
        <label for="icon" class="block mb-1 font-semibold">Ícone do Software</label>
        <input type="file" id="icon" @change="handleIconUpload" class="w-full border p-2" />
      </div>

      <!-- Nome do Software -->
      <div class="form-group">
        <label for="softwareName" class="block mb-1 font-semibold">Nome do Software</label>
        <input type="text" v-model="formData.name" id="softwareName" required class="w-full border p-2" />
      </div>

      <!-- Categoria do Software -->
      <div class="form-group">
        <label for="category" class="block mb-1 font-semibold">Categoria</label>
        <select v-model="formData.categoryId" id="category" required class="w-full border p-2">
          <option value="" disabled>Selecione uma categoria</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Requisitos de Processador -->
      <div class="form-group">
        <label for="processadorMin" class="block mb-1 font-semibold">Requisito Mínimo - Processador</label>
        <select v-model="formData.processadorMinId" id="processadorMin" required class="w-full border p-2">
          <option value="" disabled>Selecione um processador</option>
          <option v-for="processor in items.processors.items" :key="processor.id" :value="processor.id">
            {{ processor.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="processadorIdeal" class="block mb-1 font-semibold">Requisito Ideal - Processador</label>
        <select v-model="formData.processadorIdealId" id="processadorIdeal" required class="w-full border p-2">
          <option value="" disabled>Selecione um processador ideal</option>
          <option v-for="processor in items.processors.items" :key="processor.id" :value="processor.id">
            {{ processor.name }}
          </option>
        </select>
      </div>

      <!-- Requisitos de GPU -->
      <div class="form-group">
        <label for="videoBoardMin" class="block mb-1 font-semibold">Requisito Mínimo - GPU</label>
        <select v-model="formData.videoBoardMinId" id="videoBoardMin" required class="w-full border p-2">
          <option value="" disabled>Selecione uma GPU</option>
          <option v-for="gpu in items.gpus.items" :key="gpu.id" :value="gpu.id">
            {{ gpu.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="videoBoardIdeal" class="block mb-1 font-semibold">Requisito Ideal - GPU</label>
        <select v-model="formData.videoBoardIdealId" id="videoBoardIdeal" required class="w-full border p-2">
          <option value="" disabled>Selecione uma GPU ideal</option>
          <option v-for="gpu in items.gpus.items" :key="gpu.id" :value="gpu.id">
            {{ gpu.name }}
          </option>
        </select>
      </div>

      <!-- Requisitos de RAM -->
      <div class="form-group">
        <label for="memoryRamMin" class="block mb-1 font-semibold">Requisito Mínimo - RAM</label>
        <select v-model="formData.memoryRamMinId" id="memoryRamMin" required class="w-full border p-2">
          <option value="" disabled>Selecione a RAM mínima</option>
          <option v-for="ram in items.rams.items" :key="ram.id" :value="ram.id">
            {{ ram.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="memoryRamIdeal" class="block mb-1 font-semibold">Requisito Ideal - RAM</label>
        <select v-model="formData.memoryRamIdealId" id="memoryRamIdeal" required class="w-full border p-2">
          <option value="" disabled>Selecione a RAM ideal</option>
          <option v-for="ram in items.rams.items" :key="ram.id" :value="ram.id">
            {{ ram.name }}
          </option>
        </select>
      </div>

      <!-- Botão de salvar -->
      <div class="form-group col-span-1 md:col-span-2">
        <button type="submit" :disabled="isSubmitting"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          {{ isSubmitting ? 'Enviando...' : 'Salvar' }}
        </button>
      </div>
    </form>

    <!-- Feedback -->
    <div v-if="feedbackMessage" :class="feedbackClass" class="mt-4 p-4">
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script>
import { fetchAllCpu, fetchAllGpu, fetchAllRam, fetchAllStorage, fetchAllTower, fetchAllMonitor } from '@/api';
import { registerSoftware } from '@/api';

export default {
  name: 'CadastrarSoftwares',
  data() {
    return {
      formData: {
        name: '',
        processadorMinId: null,
        processadorIdealId: null,
        memoryRamMinId: null,
        memoryRamIdealId: null,
        videoBoardMinId: null,
        videoBoardIdealId: null,
        categoryId: null,
      },
      isSubmitting: false,
      feedbackMessage: '',
      feedbackClass: '',
      categories: [],
      items: { // Contém todos os itens como processadores, gpus, rams, etc.
        processors: [],
        gpus: [],
        rams: [],
        storage: [],
        towers: [],
        monitors: []
      }
    };
  },
  methods: {
    handleIconUpload(event) {
      this.formData.icon = event.target.files[0];
    },
    async fetchData() {
      try {
        const [processorsRes, gpusRes, ramsRes, storageRes, towersRes, monitorsRes] = await Promise.all([
          fetchAllCpu(),
          fetchAllGpu(),
          fetchAllRam(),
          fetchAllStorage(),
          fetchAllTower(),
          fetchAllMonitor()
        ]);
        this.items.processors = processorsRes.data;
        this.items.gpus = gpusRes.data;
        this.items.rams = ramsRes.data;
        this.items.storage = storageRes.data;
        this.items.towers = towersRes.data;
        this.items.monitors = monitorsRes.data;
        console.log(this.items)
        this.categories = [{ id: 1, name: 'Categoria 1' }, { id: 2, name: 'Categoria 2' }];
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      this.feedbackMessage = '';
      this.feedbackClass = '';

      try {
        await registerSoftware(this.formData);  
        this.showFeedback('Software cadastrado com sucesso!', 'bg-green-500');
      } catch (error) {
        console.error('Erro ao cadastrar o software:', error);
        this.showFeedback('Erro ao cadastrar o software, tente novamente.', 'bg-red-500');
      } finally {
        this.isSubmitting = false;
      }
    },
    showFeedback(message, className) {
      this.feedbackMessage = message;
      this.feedbackClass = className;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
