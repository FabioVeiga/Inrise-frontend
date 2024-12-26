<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" />

      <!-- Informações Específicas da Fonte -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Fonte</h2>

        <!-- Potência -->
        <div class="form-group">
          <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
          <input type="number" v-model="formData.potency" id="potency" required class="w-full border p-2" />
        </div>

        <!-- Potência Real -->
        <div class="form-group">
          <label for="potencyReal" class="block mb-1 font-semibold">Potência Real (W)</label>
          <input type="number" v-model="formData.potencyReal" id="potencyReal" required class="w-full border p-2" />
        </div>

        <!-- Selo -->
        <div class="form-group">
          <label for="stamp" class="block mb-1 font-semibold">Selo</label>
          <select v-model="formData.stamp" id="stamp" required class="w-full border p-2">
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
          <input type="checkbox" v-model="formData.modular" id="modular" class="w-full border p-2" />
        </div>
      </div>

      <!-- Componente de Preço -->
      <InfoPreco :formData="formData" @update-form-data="updateFormData" />

      <!-- Botão de Salvar -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Fonte
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
import { registerPSU } from '@/api';

export default {
  name: 'CadastroFonte',
  components: {
    InfoGeral,
    InfoPreco,
  },
  data() {
    return {
      formData: {
        name: '',
        potency: 0,
        potencyReal: 0,
        stamp: 'standard',
        modular: false,
        description: '',
        //image: null,
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
      }
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

        const response = await registerPSU(formData);
        console.log('Fonte cadastrada com sucesso!', response);
        alert('Produto cadastrado com sucesso!');
        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar fonte:', error);
        alert('Erro ao cadastrar produto!');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        potency: 0,
        potencyReal: 0,
        stamp: 'standard',
        modular: false,
        description: '',
        //image: null,
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
