<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-4 text-center">Editar Placa Mãe</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <!-- Componente InfoGeral -->
        <InfoGeral :form-data="editedProduct" @update-form-data="updateFormData" :product-type="'motherBoard'" />

        <!-- Informações Específicas da Placa Mãe -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações da Placa Mãe</h2>

          <!-- Socket -->
          <div class="form-group">
            <label for="socket" class="block mb-1 font-semibold">Socket</label>
            <input type="text" v-model="editedProduct.socket" id="socket" required class="w-full border p-2" />
          </div>

          <!-- Socket de Memória -->
          <div class="form-group">
            <label for="socketMemory" class="block mb-1 font-semibold">Socket de Memória</label>
            <input type="text" v-model="editedProduct.socketMemory" id="socketMemory" required
              class="w-full border p-2" />
          </div>

          <!-- Socket de Memória de Vídeo -->
          <div class="form-group">
            <label for="socketMemoryVideo" class="block mb-1 font-semibold">Socket de Memória de Vídeo</label>
            <input type="text" v-model="editedProduct.socketMemoryVideo" id="socketMemoryVideo" required
              class="w-full border p-2" />
          </div>

          <!-- Socket SSD (Repurposed -> Form Factor)-->
          <div class="form-group">
            <label for="socketSSD" class="block mb-1 font-semibold">Form Factor</label>
            <select class="w-full border p-2" v-model="editedProduct.socketSSD" @change="loadProducts" required
              :disabled="loading">
              <option value="select" disabled>Selecione uma opção</option>
              <option value="microatx">Micro-ATX</option>
              <option value="miniatx">Mini-ATX</option>
              <option value="atx">ATX</option>
            </select>
          </div>

          <!-- Socket M.2 -->
          <div class="form-group">
            <label for="socketM2" class="block mb-1 font-semibold">Socket M.2</label>
            <input type="text" v-model="editedProduct.socketM2" id="socketM2" required class="w-full border p-2" />
          </div>

  
        </div>

        <!-- Componente InfoPreco -->
        <InfoPreco :form-data="editedProduct" @update-form-data="updateFormData" />

        <!-- Botões -->
        <div class="form-group my-4 col-span-2 flex flex-col justify-between">
          <button type="button" @click="closeModal"
            class="w-full my-4 md:w-auto bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" class="w-full md:w-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Placa Mãe
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editMobo, registerImage } from '@/api'; // Certifique-se de ter essa função na sua API
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
  name: 'EditMoboModal',
  components: {
    InfoGeral,
    InfoPreco,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      editedProduct: this.product && typeof this.product === 'object' ? { ...this.product } : {
        name: '',
        socket: '',
        socketMemory: '',
        socketMemoryVideo: '',
        socketSSD: '',
        socketM2: '',
        description: '',
        valueClassification: 0,
        price: {
          costPrice: 0,
          porcentageProfit: 0,
          porcentageFixedCost: 0,
          porcentageADMCost: 0,
          porcentageDiscount: 0,
          subtotal: 0,
          iva: 0,
          finalPrice: 0,
        },
        image: null,
        images: []
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const updatedMobo = await editMobo(this.editedProduct.id, this.editedProduct);
        console.log('Placa Mãe editada com sucesso!', updatedMobo);
        const prodId = this.editedProduct.id;
        if (this.editedProduct.images[0] && this.editedProduct.image) {
          console.log('Img antes da request:', this.editedProduct.image);
          const imageResponse = await registerImage('motherBoard', prodId, this.editedProduct.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        alert('Placa mãe editada com sucesso!');
        this.$emit('save', this.editedProduct);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao editar placa mãe:', error);
        alert('Erro ao editar produto!');
      }
    },
    updateFormData({ key, value }) {
      const keys = key.split('.');
      let target = this.editedProduct;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in target)) {
          target[k] = {};
        }
        target = target[k];
      }

      target[keys[keys.length - 1]] = value;
    },

    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
