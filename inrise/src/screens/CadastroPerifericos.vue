<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'motherBoard'" />

      <!-- Dropdown de Categoria -->
      <div class="form-group my-4 col-span-2">
        <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
        <select v-model="formData.productCategoryId" id="category" class="w-full p-2 border rounded-md">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>


      <!-- Multi-Select de valueTypeProducts -->
      <div class="form-group my-4 col-span-2">
        <label class="block text-sm font-medium text-gray-700">Tipos de produto</label>
        <div class="flex gap-4">
          <div>
            <input type="checkbox" id="type1" :value="1" v-model.number="valueTypeProducts" />
            <label for="type1" class="text-sm">Casual</label>
          </div>
          <div>
            <input type="checkbox" id="type2" :value="2" v-model.number="valueTypeProducts" />
            <label for="type2" class="text-sm">Profissional</label>
          </div>
          <div>
            <input type="checkbox" id="type3" :value="3" v-model.number="valueTypeProducts" />
            <label for="type3" class="text-sm">Gamer Low</label>
          </div>
          <div>
            <input type="checkbox" id="type4" :value="4" v-model.number="valueTypeProducts" />
            <label for="type4" class="text-sm">Gamer High</label>
          </div>
        </div>
      </div>


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
import { registerProduct, registerImage, fetchAllProductCategory } from '@/api';

export default {
  name: 'CadastroPerifericos',
  components: {
    InfoGeral,
    InfoPreco,
  },
  data() {
    return {
      formData: {
        name: '',
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
        productCategoryId: null,
      },
      categories: [],
      valueTypeProducts: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetchAllProductCategory();
        this.categories = response.data.items;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
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
        this.formData.valueTypeProducts = this.valueTypeProducts;

        const response = await registerProduct(this.formData);
        const productId = response.data.data.id;
        console.log('Resp', response);
        if (this.formData.image) {
          console.log('Img antes da request:', this.formData.image);
          const imageResponse = await registerImage('product', productId, this.formData.image);
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
        productCategoryId: null,
      };
      this.valueTypeProducts = [];
    },
  },
};
</script>
