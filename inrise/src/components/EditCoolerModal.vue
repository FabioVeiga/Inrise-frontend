<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        aria-label="Fechar Modal">
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-4 text-center">Editar Cooler</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <!-- Componente InfoGeral -->
        <InfoGeral :form-data="editedProduct" @update-form-data="updateFormData" :product-type="'cooler'" />

        <!-- Informações Específicas do Cooler -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações do Cooler</h2>

          <!-- Tipo -->
          <div class="form-group">
            <label for="air" class="block mb-1 font-semibold">Tipo</label>
            <select class="w-full border p-2" v-model="editedProduct.air" id="air" @change="loadProducts" required
              :disabled="loading">
              <option value="select" disabled>Selecione uma opção</option>

              <option value="air">Air Cooler</option>
              <option value="water">Water Cooler</option>

            </select>

          </div>

          <!-- Socket do Cooler -->
          <div class="form-group">
            <label for="refrigeration" class="block mb-1 font-semibold">Socket</label>
            <input type="text" v-model="editedProduct.refrigeration" id="refrigeration" required
              class="w-full border p-2" />
          </div>

          <!-- Quantidade de Ventoinhas -->
          <div class="form-group">
            <label for="fanQuantity" class="block mb-1 font-semibold">Quantidade de Ventoinhas</label>
            <input type="number" v-model="editedProduct.fanQuantity" id="fanQuantity" required
              class="w-full border p-2" />
          </div>

          <!-- Diâmetro dos Ventoinhas -->
          <div class="form-group">
            <label for="fanDiametric" class="block mb-1 font-semibold">Diâmetro dos Ventoinhas (mm)</label>
            <input type="number" v-model="editedProduct.fanDiametric" id="fanDiametric" required
              class="w-full border p-2" />
          </div>

          <!-- Velocidade Máxima -->
          <div class="form-group">
            <label for="maxVelocit" class="block mb-1 font-semibold">Velocidade Máxima (RPM)</label>
            <input type="number" v-model="editedProduct.maxVelocit" id="maxVelocit" required
              class="w-full border p-2" />
          </div>

          <!-- Dimensões -->
          <div class="form-group">
            <label for="dimension" class="block mb-1 font-semibold">Dimensões (mm)</label>
            <input type="number" v-model="editedProduct.dimension" id="dimension" required class="w-full border p-2" />
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
            Salvar Cooler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editCooler, registerImage } from '@/api'; // Certifique-se de ter essa função na sua API
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
  name: 'EditCoolerModal',
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
        air: '',
        refrigeration: '',
        fanQuantity: 0,
        fanDiametric: 0,
        maxVelocit: 0,
        dimension: 0,
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
        const updatedCooler = await editCooler(this.editedProduct.id, this.editedProduct);
        console.log('Cooler editado com sucesso!', updatedCooler);
        const prodId = this.editedProduct.id;
        if (this.editedProduct.images[0] && this.editedProduct.image) {
          console.log('Img antes da request:', this.editedProduct.image);
          const imageResponse = await registerImage('cooler', prodId, this.editedProduct.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        alert('Cooler editado com sucesso!');
        this.$emit('save', this.editedProduct);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao editar cooler:', error);
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
