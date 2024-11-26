<template>
  <div class="cadastrar-produtos my-5">
    <!-- Formulário de cadastro de Memória RAM -->
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Nome do Produto -->
      <!-- @TODO Adicionar placeholders -->
      <h2 class=" col-span-2 text-2xl font-bold">Informações Gerais</h2>
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

      <!-- Descrição -->
      <div class="form-group col-span-2">
        <label for="description" class="block mb-1 font-semibold">Descrição</label>
        <textarea v-model="formData.description" id="description" required class="resize-none w-full h-24 border p-2"></textarea>
      </div>


      <!-- Exclusivos de memoria ram -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class=" col-span-2 text-2xl font-bold">Memoria Ram</h2>
      <!-- Socket -->
      <div class="form-group ">
        <label for="socket" class="block mb-1 font-semibold">Socket</label>
        <input type="text" v-model="formData.socket" id="socket" required class="w-full border p-2" />
      </div>

      <!-- Frequência -->
      <div class="form-group">
        <label for="frequency" class="block mb-1 font-semibold">Frequência (MHz)</label>
        <input type="number" v-model="formData.frequency" id="frequency" required class="w-full border p-2" />
      </div>

      <!-- Capacidade -->
      <div class="form-group">
        <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
        <input type="number" v-model="formData.capacity" id="capacity" required class="w-full border p-2" />
      </div>
    </div>


      <!-- Preço -->
      <h2 class=" col-span-2 text-2xl font-bold">Valores e Custos</h2>

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

      <div class="form-group h-16">
        <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
        <input type="number" v-model="formData.price.finalPrice" id="finalPrice" required class="w-full h-full border p-2" />
      </div>

      <!-- Botão de Salvar -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Memória RAM
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { registerRam } from '@/api';
//@TODO: Cálculo do preço baseado nos impostos e descontos
export default {
  name: 'CadastroRam',
  data() {
    return {
      formData: {
        name: '',
        socket: '',
        frequency: 0,
        capacity: 0,
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
          finalPrice: 0
        }
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await registerRam(this.formData);
        console.log('Memória RAM cadastrada com sucesso!', response);
        alert('Produto cadastrado com sucesso!');

        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar memória RAM:', error);
        alert('Erro ao cadastrar produto!');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        socket: '',
        frequency: 0,
        capacity: 0,
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
          finalPrice: 0
        }
      };
    }
  }
};
</script>

<style scoped>
.cadastrar-produtos {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}
</style>