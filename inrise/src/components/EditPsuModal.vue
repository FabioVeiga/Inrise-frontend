<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
          &times;
        </button>
  
        <h2 class="text-2xl font-semibold mb-4 text-center">Editar Fonte</h2>
  
        <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
          <!-- Componente InfoGeral -->
          <InfoGeral
            :form-data="editedProduct"
            @update-form-data="updateFormData"
            :product-type="'powerSupply'"
          />
  
          <!-- Exclusivos de Fonte -->
          <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 class="col-span-2 text-2xl font-bold">Fonte</h2>
  
            <!-- Potência -->
            <div class="form-group">
              <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
              <input
                type="number"
                v-model="editedProduct.potency"
                id="potency"
                required
                class="w-full border p-2"
              />
            </div>
  
            <!-- Potência Real -->
            <div class="form-group">
              <label for="potencyReal" class="block mb-1 font-semibold">Potência Real (W)</label>
              <input
                type="number"
                v-model="editedProduct.potencyReal"
                id="potencyReal"
                required
                class="w-full border p-2"
              />
            </div>
  
            <!-- Selo -->
            <div class="form-group">
              <label for="stamp" class="block mb-1 font-semibold">Selo</label>
              <select v-model="editedProduct.stamp" id="stamp" required class="w-full border p-2">
                <option value="standard">Standard</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="titanium">Titanium</option>
              </select>
            </div>
  
            <!-- Modularidade -->
            <div class="form-group">
              <label for="modular" class="block mb-1 font-semibold">Modular?</label>
              <input
                type="checkbox"
                v-model="editedProduct.modular"
                id="modular"
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
              Salvar Fonte
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { editPsu } from '@/api'; // Certifique-se de ter essa função na sua API
  import InfoGeral from './admin/cadastro/InfoGeral.vue';
  import InfoPreco from './admin/cadastro/InfoPreco.vue';
  
  export default {
    name: 'EditPsuModal',
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
          potency: 0,
          potencyReal: 0,
          stamp: 'standard',  // Valor padrão
          modular: false,
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
          const updatedPsu = await editPsu(this.editedProduct.id, this.editedProduct);
          console.log('Fonte editada com sucesso!', updatedPsu);
          alert('Fonte editada com sucesso!');
          this.$emit('save', updatedPsu);
          this.closeModal();
        } catch (error) {
          console.error('Erro ao editar fonte:', error);
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
  