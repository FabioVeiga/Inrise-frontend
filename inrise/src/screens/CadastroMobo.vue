<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'motherBoard'" />

      <!-- Informações Específicas da Placa Mãe -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Informações da Placa Mãe</h2>

        <!-- Socket -->
        <div class="form-group">
          <label for="socket" class="block mb-1 font-semibold">Socket</label>
          <input type="text" v-model="formData.socket" id="socket" required class="w-full border p-2" />
        </div>

        <!-- Socket de Memória -->
        <div class="form-group">
          <label for="socketMemory" class="block mb-1 font-semibold">Socket de Memória</label>
          <input type="text" v-model="formData.socketMemory" id="socketMemory" required class="w-full border p-2" />
        </div>

        <!-- Socket de Memória de Vídeo -->
        <div class="form-group">
          <label for="socketMemoryVideo" class="block mb-1 font-semibold">Socket de Memória de Vídeo</label>
          <input type="text" v-model="formData.socketMemoryVideo" id="socketMemoryVideo" required
            class="w-full border p-2" />
        </div>

        <!-- Socket SSD (Repurposed -> Form Factor)-->
        <div class="form-group">
          <label for="socketSSD" class="block mb-1 font-semibold">Form Factor</label>
          <select class="w-full border p-2" v-model="formData.socketSSD" @change="loadProducts" required
            :disabled="loading">
            <option value="select" disabled>Selecione uma opção</option>
            <option value="microatx">Micro-ATX</option>
            <option value="miniatx">Mini-ITX</option>
            <option value="atx">ATX</option>
          </select>
        </div>

        <!-- Socket M.2 -->
        <div class="form-group">
          <label for="socketM2" class="block mb-1 font-semibold">Socket M.2</label>
          <input type="text" v-model="formData.socketM2" id="socketM2" required class="w-full border p-2" />
        </div>
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
import { registerMobo, registerImage } from '@/api';

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
        const productId = response.data.data.id;
        console.log("Resp", response);

        let imageUploadSuccess = true;

        if (this.formData.image) {
          try {
            console.log('Img antes da request:', this.formData.image);
            const imageResponse = await registerImage('motherBoard', productId, this.formData.image);
            console.log('Imagem cadastrada com sucesso!', imageResponse);
          } catch (imageError) {
            console.error('Erro ao fazer upload da imagem:', imageError);
            imageUploadSuccess = false;
          }
        }

        if (imageUploadSuccess) {
          alert('Placa mãe cadastrada com sucesso!');
        } else {
          alert('Placa mãe cadastrada, mas houve um erro ao enviar a imagem.');
        }

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