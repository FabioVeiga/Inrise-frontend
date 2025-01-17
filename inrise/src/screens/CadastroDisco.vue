<template>
  <div class="cadastrar-produto my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'memoryRom'" />

      <!-- Informações Específicas do Disco -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Informações do Disco</h2>

        <!-- Socket -->
        <div class="form-group">
          <label for="socket" class="block mb-1 font-semibold">Socket</label>
          <input type="text" v-model="formData.socket" id="socket" required class="w-full border p-2" />
        </div>

        <!-- Velocidade de Leitura -->
        <div class="form-group">
          <label for="velocityRead" class="block mb-1 font-semibold">Velocidade de Leitura (MB/s)</label>
          <input type="number" v-model="formData.velocityRead" id="velocityRead" required class="w-full border p-2" />
        </div>

        <!-- Velocidade de Escrita -->
        <div class="form-group">
          <label for="velocityWrite" class="block mb-1 font-semibold">Velocidade de Escrita (MB/s)</label>
          <input type="number" v-model="formData.velocityWrite" id="velocityWrite" required class="w-full border p-2" />
        </div>

        <!-- Capacidade -->
        <div class="form-group">
          <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
          <input type="number" v-model="formData.capacity" id="capacity" required class="w-full border p-2" />
        </div>

        <!-- Potência -->
        <div class="form-group">
          <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
          <input type="number" v-model="formData.potency" id="potency" required class="w-full border p-2" />
        </div>

        <!-- Tipo de Disco -->
        <div class="form-group ">
          <label for="diskType" class="block mb-1 font-semibold">Tipos de Disco</label>
          <div class="flex justify-center items-center space-x-4">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.isHHD" id="isHHD" />
              <span>HDD</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.isSSD" id="isSSD" />
              <span>SSD</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="formData.isSSDM2" id="isSSDM2" />
              <span>SSD M.2</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Componente de Preço -->
      <InfoPreco :formData="formData" @update-form-data="updateFormData" />

      <!-- Botão de Salvar -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar Disco
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
import { registerRom, registerImage } from '@/api';

export default {
  name: 'CadastroDisco',
  components: {
    InfoGeral,
    InfoPreco,
  },
  data() {
    return {
      formData: {
        name: '',
        socket: '',
        velocityRead: 0,
        velocityWrite: 0,
        capacity: 0,
        potency: 0,
        isHHD: true,
        isSSD: true,
        isSSDM2: true,
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
        const response = await registerRom(this.formData);
        console.log("Resp", response)
        const productId = response.data.data.id;
        if (this.formData.image) {
          console.log('Img antes da request:', this.formData.image);
          const imageResponse = await registerImage('memoryRom', productId, this.formData.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        console.log('Disco cadastrado com sucesso!', response);
        alert('Disco cadastrado com sucesso!');
        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar disco:', error);
        alert('Erro ao cadastrar disco!');
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        socket: '',
        velocityRead: 0,
        velocityWrite: 0,
        capacity: 0,
        potency: 0,
        isHHD: true,
        isSSD: true,
        isSSDM2: true,
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