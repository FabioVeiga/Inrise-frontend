<template>
  <div class="cadastrar-produtos my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- General Info Component -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" />

      <!-- RAM Info Section -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Memória RAM</h2>
        <div class="form-group">
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

      <!-- Price Info Component -->
      <InfoPreco :formData="formData" @update-form-data="updateFormData" />

      <!-- Save Button -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Memória RAM
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
import { registerRam } from '@/api';
import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';

export default {
  name: 'CadastroRam',
  components: {
    InfoGeral,
    InfoPreco
  },
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
