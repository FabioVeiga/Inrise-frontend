<template>
    <div class="cadastrar-produto my-5">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
        <InfoGeral :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Informações Específicas da Placa Mãe -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações da Placa Mãe</h2>
  
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
  
          <!-- Socket de Memória -->
          <div class="form-group">
            <label for="socketMemory" class="block mb-1 font-semibold">Socket de Memória</label>
            <input
              type="text"
              v-model="formData.socketMemory"
              id="socketMemory"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Socket de Memória de Vídeo -->
          <div class="form-group">
            <label for="socketMemoryVideo" class="block mb-1 font-semibold">Socket de Memória de Vídeo</label>
            <input
              type="text"
              v-model="formData.socketMemoryVideo"
              id="socketMemoryVideo"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Socket SSD -->
          <div class="form-group">
            <label for="socketSSD" class="block mb-1 font-semibold">Socket SSD</label>
            <input
              type="text"
              v-model="formData.socketSSD"
              id="socketSSD"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Socket M.2 -->
          <div class="form-group">
            <label for="socketM2" class="block mb-1 font-semibold">Socket M.2</label>
            <input
              type="text"
              v-model="formData.socketM2"
              id="socketM2"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Descrição -->
          <div class="form-group">
            <label for="description" class="block mb-1 font-semibold">Descrição</label>
            <textarea
              v-model="formData.description"
              id="description"
              required
              class="w-full border p-2"
            ></textarea>
          </div>
  
          <!-- TODO: Isso n é pra estar aqui Classificação de Valor -->
          
        </div>
  
        <!-- Componente de Preço -->
        <InfoPreco :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Placa Mãe
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
  import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
  import { registerMobo } from '@/api'; 
  
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
          const response = await registerMobo(this.formData);  
          console.log('Placa mãe cadastrada com sucesso!', response);
          alert('Placa mãe cadastrada com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar placa mãe:', error);
          alert('Erro ao cadastrar placa mãe!');
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
  