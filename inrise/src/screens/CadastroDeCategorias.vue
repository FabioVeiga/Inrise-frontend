<template>
  <div class="create-category-container flex flex-col justify-start items-center min-h-[400px]">
    <h2 class="text-4xl font-bold my-8">Criar Grupo de Software</h2>

    <form @submit.prevent="submitCategory" class="space-y-4">
      <div class="form-group flex flex-col justify-between items-center">
        <label for="categoryName" class="block mb-2 font-semibold">Nome do Grupo</label>
        <input
          v-model="categoryName"
          id="categoryName"
          type="text"
          placeholder="Digite o nome da categoria"
          required
          class="w-full border p-2"
        />
      </div>

      <div class="flex space-x-4 justify-center">
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Criar Grupo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { registerSoftwareGroup } from '@/api';

export default {
  name: 'CadastroDeCategorias',
  data() {
    return {
      categoryName: '',
    };
  },
  methods: {
    async submitCategory() {
      if (!this.categoryName.trim()) {
        alert("Por favor, insira um nome para a categoria.");
        return;
      }

      try {
        const newCategory = { name: this.categoryName };
        const response = await registerSoftwareGroup(newCategory);
        alert('Categoria criada com sucesso!');
        this.$emit('category-created', response.data);
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        alert('Erro ao criar categoria. Tente novamente.');
      }
    }
  }
};
</script>

<style scoped>
.create-category-container {
  max-width: 900px;
  margin: 0 auto;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
