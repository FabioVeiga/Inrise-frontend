<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-4 text-center">Editar Placa de Vídeo</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <!-- Componente InfoGeral -->
        <InfoGeral :form-data="editedProduct" @update-form-data="updateFormData" :product-type="'videoBoard'" />

        <!-- Informações Específicas da Placa de Vídeo -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações da Placa de Vídeo</h2>

          <!-- Socket -->
          <div class="form-group">
            <label for="socket" class="block mb-1 font-semibold">Socket</label>
            <input type="text" v-model="editedProduct.socket" id="socket" required class="w-full border p-2" />
          </div>

          <!-- Bits -->
          <div class="form-group">
            <label for="bits" class="block mb-1 font-semibold">Bits</label>
            <input type="number" v-model="editedProduct.bits" id="bits" required class="w-full border p-2" />
          </div>

          <!-- Capacidade -->
          <div class="form-group">
            <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
            <input type="number" v-model="editedProduct.capacity" id="capacity" required class="w-full border p-2" />
          </div>

          <!-- Dimensão -->
          <div class="form-group">
            <label for="dimension" class="block mb-1 font-semibold">Dimensão</label>
            <input type="text" v-model="editedProduct.dimension" id="dimension" required class="w-full border p-2" />
          </div>

          <!-- Potência -->
          <div class="form-group">
            <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
            <input type="number" v-model="editedProduct.potency" id="potency" required class="w-full border p-2" />
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
            Salvar Placa de Vídeo
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editGpu, registerImage } from '@/api'; // Certifique-se de ter essa função na sua API
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
  name: 'EditGpuModal',
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
        bits: 0,
        capacity: 0,
        dimension: '',
        potency: 0,
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
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const updatedGpu = await editGpu(this.editedProduct.id, this.editedProduct);
        console.log('Placa de Vídeo editada com sucesso!', updatedGpu);
        const prodId = this.editedProduct.id;
        if (this.editedProduct.images[0]) {
          console.log('Img antes da request:', this.editedProduct.image);
          const imageResponse = await registerImage('videoBoard', prodId, this.editedProduct.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        alert('Placa de vídeo editada com sucesso!');

        this.$emit('save', updatedGpu);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao editar placa de vídeo:', error);
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