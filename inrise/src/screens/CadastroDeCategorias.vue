<template>
  <div class="cadastro-de-categorias">
    <h1>Cadastro de Categorias</h1>

    <!-- Formulário para cadastrar nova categoria -->
    <form @submit.prevent="submitForm">
      <!-- Nome da Categoria -->
      <div class="form-group">
        <label for="categoryName">Nome da Categoria</label>
        <input type="text" v-model="formData.categoryName" id="categoryName" required />
      </div>

      <!-- Seleção de Softwares -->
      <div class="form-group">
        <label for="softwares">Selecione os Softwares</label>
        <select v-model="formData.selectedSoftwares" id="softwares" multiple>
          <option v-for="software in softwares" :key="software.id" :value="software.id">
            {{ software.softwareName }}
          </option>
        </select>
      </div>

      <!-- Botão de salvar -->
      <button type="submit">Salvar Categoria</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CadastroDeCategorias',
  data() {
    return {
      softwares: [], // Lista de softwares para seleção
      formData: {
        categoryName: '',
        selectedSoftwares: [] // Armazena os IDs dos softwares selecionados
      }
    };
  },
  created() {
    this.fetchSoftwares(); // Carrega os softwares cadastrados ao montar o componente
  },
  methods: {
    async fetchSoftwares() {
      try {
        const response = await axios.get('https://your-api-endpoint.com/softwares');
        this.softwares = response.data;
      } catch (error) {
        console.error('Erro ao carregar softwares:', error);
      }
    },
    async submitForm() {
      try {
        const payload = {
          categoryName: this.formData.categoryName,
          softwareIds: this.formData.selectedSoftwares
        };

        const response = await axios.post('https://your-api-endpoint.com/categories', payload);
        console.log('Categoria cadastrada com sucesso!', response.data);
      } catch (error) {
        console.error('Erro ao cadastrar categoria:', error);
      }
    }
  }
};
</script>

<style scoped>
.cadastro-de-categorias {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

select[multiple] {
  width: 100%;
  height: 150px;
  padding: 8px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
