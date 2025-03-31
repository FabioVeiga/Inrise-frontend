<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'tower'" />

      <!-- Informações Específicas do Gabinete -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Informações do Gabinete</h2>

        <!-- Form Factor -->
        <div class="form-group">
          <label for="dimesion" class="block mb-1 font-semibold">Form Factor</label>

          <select class="w-full border p-2" v-model="formData.dimesion" @change="loadProducts" required
            :disabled="loading">
            <option value="select" disabled>Selecione uma opção</option>
            <option value="microatx">Micro-ATX</option>
            <option value="miniatx">Mini-ATX</option>
            <option value="atx">ATX</option>
          </select>
        </div>

        <!-- Máximo de Ventoinhas -->
        <div class="form-group">
          <label for="maxFans" class="block mb-1 font-semibold">Máximo de Ventoinhas</label>
          <input type="number" v-model="formData.maxFans" id="maxFans" required class="w-full border p-2" />
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
import { registerTower, registerImage } from '@/api';

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
        const productId = response.data.data.id;
        console.log("Resp", response);

        let imageUploadSuccess = true;

        if (this.formData.image) {
          try {
            console.log('Img antes da request:', this.formData.image);
            const imageResponse = await registerImage('tower', productId, this.formData.image);
            console.log('Imagem cadastrada com sucesso!', imageResponse);
          } catch (imageError) {
            console.error('Erro ao fazer upload da imagem:', imageError);
            imageUploadSuccess = false;
          }
        }

        if (imageUploadSuccess) {
          alert('Gabinete cadastrado com sucesso!');
        } else {
          alert('Gabinete cadastrado, mas houve um erro ao enviar a imagem.');
        }

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