<template>
    <div class="cadastrar-produto my-5">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
        <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'cadastroCooler'" />
  
        <!-- Informações Específicas do Cooler -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações do Cooler</h2>
  
          <!-- Ar -->
          <div class="form-group">
            <label for="air" class="block mb-1 font-semibold">Ar</label>
            <input
              type="text"
              v-model="formData.air"
              id="air"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Tipo de Refrigeração -->
          <div class="form-group">
            <label for="refrigeration" class="block mb-1 font-semibold">Refrigeração</label>
            <input
              type="text"
              v-model="formData.refrigeration"
              id="refrigeration"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Quantidade de Ventoinhas -->
          <div class="form-group">
            <label for="fanQuantity" class="block mb-1 font-semibold">Quantidade de Ventoinhas</label>
            <input
              type="number"
              v-model="formData.fanQuantity"
              id="fanQuantity"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Diâmetro dos Ventoinhas -->
          <div class="form-group">
            <label for="fanDiametric" class="block mb-1 font-semibold">Diâmetro dos Ventoinhas (mm)</label>
            <input
              type="number"
              v-model="formData.fanDiametric"
              id="fanDiametric"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Velocidade Máxima -->
          <div class="form-group">
            <label for="maxVelocit" class="block mb-1 font-semibold">Velocidade Máxima (RPM)</label>
            <input
              type="number"
              v-model="formData.maxVelocit"
              id="maxVelocit"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Dimensões -->
          <div class="form-group">
            <label for="dimension" class="block mb-1 font-semibold">Dimensões (mm)</label>
            <input
              type="number"
              v-model="formData.dimension"
              id="dimension"
              required
              class="w-full border p-2"
            />
          </div>
        </div>
  
        <!-- Componente de Preço -->
        <InfoPreco :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Cooler
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
  import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';
  import { registerCooler } from '@/api';
  
  export default {
    name: 'CadastroCooler',
    components: {
      InfoGeral,
      InfoPreco,
    },
    data() {
      return {
        formData: {
          name: '',
          valueClassification: 0,
          air: '',
          refrigeration: '',
          fanQuantity: 0,
          fanDiametric: 0,
          maxVelocit: 0,
          dimension: 0,
          description: '',
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
  
          const response = await registerCooler(formData);
          console.log('Cooler cadastrado com sucesso!', response);
          alert('Cooler cadastrado com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar cooler:', error);
          alert('Erro ao cadastrar cooler!');
        }
      },
      resetForm() {
        this.formData = {
          name: '',
          valueClassification: 0,
          air: '',
          refrigeration: '',
          fanQuantity: 0,
          fanDiametric: 0,
          maxVelocit: 0,
          dimension: 0,
          description: '',
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
  