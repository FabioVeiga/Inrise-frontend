<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'monitorScreen'" />

      <!-- Informações Específicas do Monitor -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Informações do Monitor</h2>

        <!-- Dimensão -->
        <div class="form-group">
          <label for="dimesion" class="block mb-1 font-semibold">Dimensão (pol)</label>
          <input type="text" v-model="formData.dimesion" id="dimesion" required class="w-full border p-2" />
        </div>

        <!-- Taxa de Atualização -->
        <div class="form-group">
          <label for="updateVolume" class="block mb-1 font-semibold">Taxa de Atualização (Hz)</label>
          <input type="number" v-model="formData.updateVolume" id="updateVolume" required class="w-full border p-2" />
        </div>

        <!-- Qualidade -->
        <div class="form-group">
          <label for="quality" class="block mb-1 font-semibold">Qualidade</label>
          <input type="text" v-model="formData.quality" id="quality" required class="w-full border p-2" />
        </div>
      </div>

      <!-- Componente de Preço -->
      <InfoPreco :formData="formData" @update-form-data="updateFormData" />

      <!-- Botão de Salvar -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Monitor
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
import { registerMonitor, registerImage } from '@/api';

export default {
  name: 'CadastrarMonitor',
  components: {
    InfoGeral,
    InfoPreco,
  },
  data() {
    return {
      formData: {
        name: '',
        dimesion: '',
        updateVolume: 0,
        quality: '',
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

        const response = await registerMonitor(formData);
        const productId = response.data.data.id;
        console.log("Resp", response)
        if (this.formData.image) {
          console.log('Img antes da request:', this.formData.image);
          const imageResponse = await registerImage('monitorScreen', productId, this.formData.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        console.log('Monitor cadastrado com sucesso!', response);
        alert('Monitor cadastrado com sucesso!');
        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar monitor:', error);
        alert('Erro ao cadastrar monitor!');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        dimesion: '',
        updateVolume: 0,
        quality: '',
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