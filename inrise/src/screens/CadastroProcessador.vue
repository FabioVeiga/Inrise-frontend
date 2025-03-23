<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'processor'" />

      <!-- Informações Específicas do Processador -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Informações do Processador</h2>

        <!-- Geração -->
        <div class="form-group">
          <label for="generation" class="block mb-1 font-semibold">Geração</label>
          <input type="text" v-model="formData.generation" id="generation" required class="w-full border p-2" />
        </div>

        <!-- Socket -->
        <div class="form-group">
          <label for="socket" class="block mb-1 font-semibold">Socket</label>
          <input type="text" v-model="formData.socket" id="socket" required class="w-full border p-2" />
        </div>

        <!-- Núcleos -->
        <div class="form-group">
          <label for="core" class="block mb-1 font-semibold">Núcleos</label>
          <input type="number" v-model="formData.core" id="core" required class="w-full border p-2" />
        </div>

        <!-- Frequência -->
        <div class="form-group">
          <label for="frequency" class="block mb-1 font-semibold">Frequência (GHz)</label>
          <input type="number" v-model="formData.frequency" id="frequency" required class="w-full border p-2"
            step="0.01" />
        </div>

        <!-- Potência -->
        <div class="form-group">
          <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
          <input type="number" v-model="formData.potency" id="potency" required class="w-full border p-2" />
        </div>

        <!-- Suporte à Memória RAM -->
        <div class="form-group">
          <label for="suportMemoryRAM" class="block mb-1 font-semibold">Suporte à Memória RAM</label>
          <input type="text" v-model="formData.suportMemoryRAM" id="suportMemoryRAM" required
            class="w-full border p-2" />
        </div>

        <!-- Suporte à Memória ROM -->
        <div class="form-group">
          <label for="suportMemoryROM" class="block mb-1 font-semibold">Suporte à Memória ROM</label>
          <input type="text" v-model="formData.suportMemoryROM" id="suportMemoryROM" required
            class="w-full border p-2" />
        </div>

        <!-- Suporte a Vídeo -->
        <div class="form-group">
          <label for="suportVideo" class="block mb-1 font-semibold">Suporte a Vídeo</label>
          <input type="text" v-model="formData.suportVideo" id="suportVideo" required class="w-full border p-2" />
        </div>
      </div>

      <!-- Componente de Preço -->
      <InfoPreco :formData="formData" @update-form-data="updateFormData" />

      <!-- Botão de Salvar -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Processador
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
import { registerCPU, registerImage } from '@/api';

export default {
  name: 'CadastroProcessador',
  components: {
    InfoGeral,
    InfoPreco,
  },
  data() {
    return {
      formData: {
        name: '',
        generation: '',
        socket: '',
        core: 0,
        frequency: 0,
        potency: 0,
        suportMemoryRAM: '',
        suportMemoryROM: '',
        suportVideo: '',
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

        const response = await registerCPU(formData);
        const productId = response.data.data.id;
        console.log("Resp", response)
        if (this.formData.image) {
          console.log('Img antes da request:', this.formData.image);
          const imageResponse = await registerImage('processor', productId, this.formData.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        console.log('Processador cadastrado com sucesso!', response);
        alert('Processador cadastrado com sucesso!');
        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar processador:', error);
        alert('Erro ao cadastrar processador!');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        generation: '',
        socket: '',
        core: 0,
        frequency: 0,
        potency: 0,
        suportMemoryRAM: '',
        suportMemoryROM: '',
        suportVideo: '',
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