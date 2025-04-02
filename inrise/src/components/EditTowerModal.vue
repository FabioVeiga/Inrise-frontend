<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        aria-label="Fechar Modal">
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-4 text-center">Editar Gabinete</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <!-- Componente InfoGeral -->
        <InfoGeral :form-data="editedProduct" @update-form-data="updateFormData" :product-type="'tower'" />

        <!-- Informações Específicas do Gabinete -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações do Gabinete</h2>

          <!-- Form Factor -->
          <div class="form-group">
            <label for="dimesion" class="block mb-1 font-semibold">Form Factor</label>

            <select class="w-full border p-2" v-model="editedProduct.dimesion" @change="loadProducts" required
              :disabled="loading">
              <option value="select" disabled>Selecione uma opção</option>
              <option value="microatx">Micro-ATX</option>
              <option value="miniatx">Mini-ITX</option>
              <option value="atx">ATX</option>
            </select>
          </div>

          <!-- Máximo de Ventoinhas -->
          <div class="form-group">
            <label for="maxFans" class="block mb-1 font-semibold">Máximo de Ventoinhas</label>
            <input type="number" v-model="editedProduct.maxFans" id="maxFans" required class="w-full border p-2" />
          </div>
          <!-- Dimensão da GPU -->
          <div class="form-group">
            <label for="maxFans" class="block mb-1 font-semibold">Dimensão de GPU</label>
            <input type="text" v-model="editedProduct.gpuDimesion" id="gpuDimesion" required class="w-full border p-2" />
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
            Salvar Gabinete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editTower, registerImage } from '@/api'; // Certifique-se de ter essa função na sua API
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
  name: 'EditTowerModal',
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
        dimesion: '',
        maxFans: 0,
        description: '',
        valueClassification: 0,
        gpuDimesion: '',
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
        const updatedTower = await editTower(this.editedProduct.id, this.editedProduct);
        console.log('Gabinete editado com sucesso!', updatedTower);

        const prodId = this.editedProduct.id;
        let imageUploadSuccess = true;

        if (this.editedProduct.image) {
          console.log('Img antes da request:', this.editedProduct.image);
          try {
            const imageResponse = await registerImage('tower', prodId, this.editedProduct.image);
            console.log('Imagem cadastrada com sucesso!', imageResponse);
          } catch (imageError) {
            console.error('Erro ao fazer upload da imagem:', imageError);
            imageUploadSuccess = false;
          }
        }

        if (imageUploadSuccess) {
          alert('Gabinete editado com sucesso!');
        } else {
          alert('Gabinete editado, mas houve um erro ao enviar a imagem.');
        }

        this.$emit('save', this.editedProduct);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao editar gabinete:', error);
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