<template>
    <div class="cadastrar-produto my-5">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
        <InfoGeral :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Informações Específicas da Placa de Vídeo -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações da Placa de Vídeo</h2>
  
          <!-- Socket -->
          <div class="form-group">
            <label for="socket" class="block mb-1 font-semibold">Socket</label>
            <input
              type="text"
              v-model="formData.socket"
              id="socket"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Bits -->
          <div class="form-group">
            <label for="bits" class="block mb-1 font-semibold">Bits</label>
            <input
              type="number"
              v-model="formData.bits"
              id="bits"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Capacidade -->
          <div class="form-group">
            <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
            <input
              type="number"
              v-model="formData.capacity"
              id="capacity"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Dimensão -->
          <div class="form-group">
            <label for="dimension" class="block mb-1 font-semibold">Dimensão</label>
            <input
              type="text"
              v-model="formData.dimension"
              id="dimension"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Potência -->
          <div class="form-group">
            <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
            <input
              type="number"
              v-model="formData.potency"
              id="potency"
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
            Salvar Placa de Vídeo
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
  import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
  import { registerGPU } from '@/api';
  
  export default {
    name: 'CadastrarPlacaDeVideo',
    components: {
      InfoGeral,
      InfoPreco,
    },
    data() {
      return {
        formData: {
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
  
          const response = await registerGPU(formData);
          console.log('Placa de vídeo cadastrada com sucesso!', response);
          alert('Placa de vídeo cadastrada com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar placa de vídeo:', error);
          alert('Erro ao cadastrar placa de vídeo!');
        }
      },
      resetForm() {
        this.formData = {
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
        };
      },
    },
  };
  </script>
  