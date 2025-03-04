<template>
    <div class="cadastrar-produto my-5">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
        <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'motherBoard'" />
  
        <!-- Componente de Preço -->
        <InfoPreco :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar periférico
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
  import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
  import { registerPeripheral, registerImage } from '@/api';
  
  export default {
    name: 'CadastroMobo',
    components: {
      InfoGeral,
      InfoPreco,
    },
    data() {
      return {
        formData: {
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
          const response = await registerPeripheral(this.formData);
          const productId = response.data.data.id;
          console.log("Resp", response)
          if (this.formData.image) {
            console.log('Img antes da request:', this.formData.image);
            const imageResponse = await registerImage('peripheral', productId, this.formData.image);
            console.log('Imagem cadastrada com sucesso!', imageResponse);
          }
          console.log('Periférico cadastrado com sucesso!', response);
          alert('Periférico cadastrado com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar periférico:', error);
          alert('Erro ao cadastrar periférico!');
        }
      },
      resetForm() {
        this.formData = {
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
        };
      },
    },
  };
  </script>