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
        <input type="text" v-model="formData.softwareName" id="softwareName" required class="w-full border p-2" />
      </div>

      <!-- Categoria do Software -->
      <div class="form-group">
        <label for="category" class="block mb-1 font-semibold">Categoria</label>
        <select v-model="formData.category" id="category" required class="w-full border p-2">
          <option value="" disabled>Selecione uma categoria</option>
          <option value="game">Game</option>
          <option value="productivity">Produtividade</option>
          <option value="multimedia">Multimídia</option>
        </select>
      </div>

      <!-- Requisitos Mínimos e Máximos -->
      <div class="form-group">
        <label for="minProcessor" class="block mb-1 font-semibold">Requisito Mínimo - Processador</label>
        <select v-model="formData.minProcessor" id="minProcessor" required class="w-full border p-2">
          <option value="" disabled>Selecione um processador</option>
          <option value="intel-i3">Intel i3</option>
          <option value="intel-i5">Intel i5</option>
          <option value="intel-i7">Intel i7</option>
        </select>
      </div>

      <div class="form-group">
        <label for="maxProcessor" class="block mb-1 font-semibold">Requisito Máximo - Processador</label>
        <select v-model="formData.maxProcessor" id="maxProcessor" required class="w-full border p-2">
          <option value="" disabled>Selecione um processador</option>
          <option value="intel-i5">Intel i5</option>
          <option value="intel-i7">Intel i7</option>
          <option value="intel-i9">Intel i9</option>
        </select>
      </div>

      <div class="form-group">
        <label for="minGpu" class="block mb-1 font-semibold">Requisito Mínimo - GPU</label>
        <select v-model="formData.minGpu" id="minGpu" required class="w-full border p-2">
          <option value="" disabled>Selecione uma GPU</option>
          <option value="gtx-1050">GTX 1050</option>
          <option value="gtx-1060">GTX 1060</option>
          <option value="rtx-2060">RTX 2060</option>
        </select>
      </div>

      <div class="form-group">
        <label for="maxGpu" class="block mb-1 font-semibold">Requisito Máximo - GPU</label>
        <select v-model="formData.maxGpu" id="maxGpu" required class="w-full border p-2">
          <option value="" disabled>Selecione uma GPU</option>
          <option value="rtx-2060">RTX 2060</option>
          <option value="rtx-2070">RTX 2070</option>
          <option value="rtx-3080">RTX 3080</option>
        </select>
      </div>

      <div class="form-group">
        <label for="minRam" class="block mb-1 font-semibold">Requisito Mínimo - RAM</label>
        <select v-model="formData.minRam" id="minRam" required class="w-full border p-2">
          <option value="" disabled>Selecione a RAM mínima</option>
          <option value="4gb">4GB</option>
          <option value="8gb">8GB</option>
          <option value="16gb">16GB</option>
        </select>
      </div>

      <div class="form-group">
        <label for="maxRam" class="block mb-1 font-semibold">Requisito Máximo - RAM</label>
        <select v-model="formData.maxRam" id="maxRam" required class="w-full border p-2">
          <option value="" disabled>Selecione a RAM máxima</option>
          <option value="16gb">16GB</option>
          <option value="32gb">32GB</option>
          <option value="64gb">64GB</option>
        </select>
      </div>

      <!-- Botão de salvar -->
      <div class="form-group col-span-1 md:col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CadastrarSoftwares',
  data() {
    return {
      formData: {
        icon: null,
        softwareName: '',
        category: '',
        minProcessor: '',
        maxProcessor: '',
        minGpu: '',
        maxGpu: '',
        minRam: '',
        maxRam: ''
      }
    };
  },
  methods: {
    handleIconUpload(event) {
      this.formData.icon = event.target.files[0];
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('icon', this.formData.icon);
        formData.append('softwareName', this.formData.softwareName);
        formData.append('category', this.formData.category);
        formData.append('minProcessor', this.formData.minProcessor);
        formData.append('maxProcessor', this.formData.maxProcessor);
        formData.append('minGpu', this.formData.minGpu);
        formData.append('maxGpu', this.formData.maxGpu);
        formData.append('minRam', this.formData.minRam);
        formData.append('maxRam', this.formData.maxRam);

        const response = await axios.post('https://your-api-endpoint.com/softwares', formData);
        console.log('Software cadastrado com sucesso!', response.data);
      } catch (error) {
        console.error('Erro ao cadastrar o software:', error);
      }
    }
  }
};
</script>

<style scoped>
.cadastrar-softwares {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}
</style>
