<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-4 text-center">Editar Memória RAM</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <!-- Componente InfoGeral -->
        <InfoGeral
          :form-data="editedProduct"
          @update-form-data="updateFormData"
          :product-type="'memoryRam'"
        />

        <!-- Exclusivos de memória RAM -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Memória RAM</h2>

          <!-- Socket -->
          <div class="form-group">
            <label for="socket" class="block mb-1 font-semibold">Socket</label>
            <input
              type="text"
              v-model="editedProduct.socket"
              id="socket"
              required
              class="w-full border p-2"
            />
          </div>

          <!-- Frequência -->
          <div class="form-group">
            <label for="frequency" class="block mb-1 font-semibold">Frequência (MHz)</label>
            <input
              type="number"
              v-model="editedProduct.frequency"
              id="frequency"
              required
              class="w-full border p-2"
            />
          </div>

          <!-- Capacidade -->
          <div class="form-group">
            <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
            <input
              type="number"
              v-model="editedProduct.capacity"
              id="capacity"
              required
              class="w-full border p-2"
            />
          </div>
        </div>

        <!-- Componente InfoPreco -->
        <InfoPreco
          :form-data="editedProduct"
          @update-form-data="updateFormData"
        />

        <!-- Botões -->
        <div class="form-group my-4 col-span-2 flex flex-col justify-between">
          <button
            type="button"
            @click="closeModal"
            class="w-full my-4 md:w-auto bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="w-full md:w-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Salvar Memória RAM
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editRam } from '@/api';
//@TODO: Adicionar o alerta ao fazer a req com sucesso
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
  name: 'EditRamModal',
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
        frequency: 0,
        capacity: 0,
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
        const updatedRam = await editRam(this.editedProduct.id, this.editedProduct);
        console.log('Memória RAM editada com sucesso!', updatedRam);
        alert('Memória RAM editada com sucesso!');
        this.$emit('save', updatedRam);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao editar memória RAM:', error);
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
