<template>
  <div class="cadastrar-produto my-5">
    <!-- Formulário de cadastro de Fonte -->

    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Nome do Produto -->
      <div class="form-group">
        <label for="productName" class="block mb-1 font-semibold">Nome do Produto</label>
        <input type="text" v-model="formData.name" id="productName" required class="w-full border p-2" />
      </div>

      <!-- Classificação do valor -->
      <div class="form-group">
        <label for="valueClassification" class="block mb-1 font-semibold">Classificação do Valor</label>
        <input type="number" v-model="formData.valueClassification" id="valueClassification" required
          class="w-full border p-2" />
      </div>

      <!-- Potência -->
      <div class="form-group mb-4">
        <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
        <input type="number" v-model="formData.potency" id="potency" required class="w-full border p-2" />
      </div>

      <!-- Potência Real -->
      <div class="form-group mb-4">
        <label for="potencyReal" class="block mb-1 font-semibold">Potência Real (W)</label>
        <input type="number" v-model="formData.potencyReal" id="potencyReal" required class="w-full border p-2" />
      </div>


      <!-- Selo -->
      <div class="form-group mb-4">
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
      <div class="form-group mb-4">
        <label for="modular" class="block mb-1 font-semibold">Modular?</label>
        <input type="checkbox" v-model="formData.modular" id="modular" class="w-full border p-2" />
      </div>

      <!-- Descrição -->
      <div class="form-group">
        <label for="description" class="block mb-1 font-semibold">Descrição</label>
        <textarea v-model="formData.description" id="description" required class="w-full border p-2"></textarea>
      </div>

      <!-- Preço -->
      <div class="form-group">
        <label for="costPrice" class="block mb-1 font-semibold">Preço de Custo</label>
        <input type="number" v-model="formData.price.costPrice" id="costPrice" required class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="porcentageProfit" class="block mb-1 font-semibold">Porcentagem de Lucro</label>
        <input type="number" v-model="formData.price.porcentageProfit" id="porcentageProfit" required
          class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="porcentageFixedCost" class="block mb-1 font-semibold">Porcentagem de Custo Fixo</label>
        <input type="number" v-model="formData.price.porcentageFixedCost" id="porcentageFixedCost" required
          class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="porcentageADMCost" class="block mb-1 font-semibold">Porcentagem de Custo ADM</label>
        <input type="number" v-model="formData.price.porcentageADMCost" id="porcentageADMCost" required
          class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="porcentageDiscount" class="block mb-1 font-semibold">Porcentagem de Desconto</label>
        <input type="number" v-model="formData.price.porcentageDiscount" id="porcentageDiscount" required
          class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="subtotal" class="block mb-1 font-semibold">Subtotal</label>
        <input type="number" v-model="formData.price.subtotal" id="subtotal" required class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="iva" class="block mb-1 font-semibold">IVA</label>
        <input type="number" v-model="formData.price.iva" id="iva" required class="w-full border p-2" />
      </div>

      <div class="form-group col-span-2">
        <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
        <input type="number" v-model="formData.price.finalPrice" id="finalPrice" required class="w-full border p-2" />
      </div>

      <!-- Botão de Salvar -->
      <div class="form-group col-span-1 md:col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Fonte
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import { registerPSU } from '@/api';
export default {
  name: 'CadastroFonte',
  data() {
    return {
      formData: {
        name: 'Fonte',
        potency: 0,
        potencyReal: 0,
        stamp: 'standard',
        modular: true,
        description: '',
        valueClassification: '1',
        price: {
          costPrice: 0,
          porcentageProfit: 0,
          porcentageFixedCost: 0,
          porcentageADMCost: 0,
          porcentageDiscount: 0,
          subtotal: 0,
          iva: 0,
          finalPrice: 0
        }
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await registerPSU(this.formData);
        console.log('Fonte cadastrada com sucesso!', response);
        alert('Produto cadastrado com sucesso!');

        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar memória Fonte:', error);
        alert('Erro ao cadastrar produto!');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        potency: 0,
        potencyReal: 0,
        stamp: '',
        modular: true,
        description: '',
        valueClassification: '',
        price: {
          costPrice: 0,
          porcentageProfit: 0,
          porcentageFixedCost: 0,
          porcentageADMCost: 0,
          porcentageDiscount: 0,
          subtotal: 0,
          iva: 0,
          finalPrice: 0
        }
      }
    }
  }
};
</script>