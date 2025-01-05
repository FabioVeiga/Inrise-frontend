<template>
    <div class="cadastrar-produto my-5">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
<<<<<<< HEAD
        <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'tower'" />
=======
        <InfoGeral :formData="formData" @update-form-data="updateFormData" />
>>>>>>> 554b403ba4cb801d05e1f534f77e3493d6196ca5
  
        <!-- Informações Específicas do Gabinete -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações do Gabinete</h2>
  
          <!-- Dimensão -->
          <div class="form-group">
            <label for="dimesion" class="block mb-1 font-semibold">Dimensão</label>
            <input
              type="text"
              v-model="formData.dimesion"
              id="dimesion"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Máximo de Ventoinhas -->
          <div class="form-group">
            <label for="maxFans" class="block mb-1 font-semibold">Máximo de Ventoinhas</label>
            <input
              type="number"
              v-model="formData.maxFans"
              id="maxFans"
              required
              class="w-full border p-2"
            />
          </div>
        </div>
  
        <!-- Componente de Preço -->
        <InfoPreco :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Gabinete
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
  import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
  import { registerTower } from '@/api';
  
  export default {
    name: 'CadastroGabinete',
    components: {
      InfoGeral,
      InfoPreco,
    },
    data() {
      return {
        formData: {
          name: '',
          dimesion: '',
          maxFans: 0,
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
      updateFormData({ key, value }) {
        const keys = key.split('.');
        if (keys.length === 2) {
          this.formData[keys[0]][keys[1]] = value;
        } else {
          this.formData[key] = value;
        }
      },
      async submitForm() {
        try {
          const formData = new FormData();
          Object.keys(this.formData).forEach((key) => {
            if (key === 'price') {
              Object.keys(this.formData.price).forEach((priceKey) => {
                formData.append(`price.${priceKey}`, this.formData.price[priceKey]);
              });
            } else {
              formData.append(key, this.formData[key]);
            }
          });
  
          const response = await registerTower(formData);
          console.log('Gabinete cadastrado com sucesso!', response);
          alert('Gabinete cadastrado com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar gabinete:', error);
          alert('Erro ao cadastrar gabinete!');
        }
      },
      resetForm() {
        this.formData = {
          name: '',
          dimesion: '',
          maxFans: 0,
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
        };
      },
    },
  };
  </script>
  