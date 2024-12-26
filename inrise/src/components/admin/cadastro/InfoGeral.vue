<!-- InfoGeral.vue -->
<template>
    <div>
      <h2 class="col-span-2 text-2xl font-bold">Informações Gerais</h2>
      
      <!-- Nome do Produto -->
      <div class="form-group">
        <label for="productName" class="block mb-1 font-semibold">Nome do Produto</label>
        <input type="text" v-model="name" id="productName" required class="w-full border p-2" />
      </div>
  
      <!-- Classificação do valor -->
      <div class="form-group">
        <label for="valueClassification" class="block mb-1 font-semibold">Classificação do Valor</label>
        <input type="number" v-model="valueClassification" id="valueClassification" required class="w-full border p-2" />
      </div>
  
      <!-- Descrição -->
      <div class="form-group col-span-2">
        <label for="description" class="block mb-1 font-semibold">Descrição</label>
        <textarea v-model="description" id="description" required class="resize-none w-full h-24 border p-2"></textarea>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfoGeral',
    props: {
      formData: {
        type: Object,
        required: true
      }
    },
    computed: {
      // Return the values from formData as computed properties
      name: {
        get() {
          return this.formData.name;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'name', value });
        }
      },
      valueClassification: {
        get() {
          return this.formData.valueClassification;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'valueClassification', value });
        }
      },
      description: {
        get() {
          return this.formData.description;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'description', value });
        }
      }
    }
  };
  </script>
  