<template>
  <div class="create-category-container">
    <div class="modal-overlay" v-if="isModalOpen">
      <div class="modal-content">
        <h2 class="text-2xl font-bold mb-4">Criar Categoria de Software</h2>

        <!-- Formulário para criar a categoria -->
        <form @submit.prevent="submitCategory" class="space-y-4">
          <div class="form-group">
            <label for="categoryName" class="block mb-2 font-semibold">Nome da Categoria</label>
            <input
              v-model="categoryName"
              id="categoryName"
              type="text"
              placeholder="Digite o nome da categoria"
              required
              class="w-full border p-2"
            />
          </div>

          <!-- Botões -->
          <div class="flex space-x-4">
            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Criar Categoria
            </button>
            <button type="button" @click="closeModal" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Botão para abrir o modal -->
    <div class="text-center mt-6">
      <button
        @click="openModal"
        class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Criar Nova Categoria
      </button>
    </div>
  </div>
</template>

<script>
import { registerSoftwareGroup } from '@/api'; // Importe a função que envia os dados para o backend.

export default {
  name: 'CadastroDeCategorias',
  data() {
    return {
      categoryName: '', // Nome da categoria a ser criada
      isModalOpen: false, // Controla a visibilidade do modal
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.categoryName = ''; // Limpa o campo de input ao fechar o modal
    },
    async submitCategory() {
      if (!this.categoryName.trim()) {
        alert("Por favor, insira um nome para a categoria.");
        return;
      }

      try {
        const newCategory = { name: this.categoryName };
        // Envia os dados para o backend, através da API
        const response = await registerSoftwareGroup(newCategory);

        console.log('Categoria criada com sucesso!', response);
        this.$emit('category-created', response.data); // Emite o evento para o pai

        // Fecha o modal e limpa o campo
        this.closeModal();
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        alert('Erro ao criar categoria. Tente novamente.');
      }
    }
  }
};
</script>

<style scoped>
/* Estilos do Modal */
.create-category-container {
  max-width: 900px;
  margin: 0 auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
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

button[type="button"] {
  background-color: #ccc;
}

button[type="button"]:hover {
  background-color: #bbb;
}
</style>
