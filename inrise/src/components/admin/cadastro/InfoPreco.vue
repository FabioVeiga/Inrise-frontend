<!-- InfoPreco.vue -->
<template>
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Valores e Custos</h2>
  
      <!-- Preço de Custo -->
      <div class="form-group">
        <label for="costPrice" class="block mb-1 font-semibold">Preço de Custo</label>
        <input type="number" v-model="costPrice" id="costPrice" required class="w-full border p-2" step="0.01" min="0" />
      </div>
  
      <!-- Porcentagem de Lucro -->
      <div class="form-group">
        <label for="porcentageProfit" class="block mb-1 font-semibold">Porcentagem de Lucro</label>
        <input type="number" v-model="porcentageProfit" id="porcentageProfit" required class="w-full border p-2" />
      </div>
  
      <!-- Porcentagem de Custo Fixo -->
      <div class="form-group">
        <label for="porcentageFixedCost" class="block mb-1 font-semibold">Porcentagem de Custo Fixo</label>
        <input type="number" v-model="porcentageFixedCost" id="porcentageFixedCost" required class="w-full border p-2" />
      </div>
  
      <!-- Porcentagem de Custo ADM -->
      <div class="form-group">
        <label for="porcentageADMCost" class="block mb-1 font-semibold">Porcentagem de Custo ADM</label>
        <input type="number" v-model="porcentageADMCost" id="porcentageADMCost" required class="w-full border p-2" />
      </div>
  
      <!-- Porcentagem de Desconto -->
      <div class="form-group">
        <label for="porcentageDiscount" class="block mb-1 font-semibold">Porcentagem de Desconto</label>
        <input type="number" v-model="porcentageDiscount" id="porcentageDiscount" required class="w-full border p-2" />
      </div>
  
      <!-- Subtotal -->
      <div class="form-group">
        <label for="subtotal" class="block mb-1 font-semibold">Subtotal</label>
        <input type="number" v-model="subtotal" id="subtotal" required class="w-full border p-2" />
      </div>
  
      <!-- IVA -->
      <div class="form-group">
        <label for="iva" class="block mb-1 font-semibold">IVA</label>
        <input type="number" v-model="iva" id="iva" required class="w-full border p-2" />
      </div>
  
      <!-- Preço Final -->
      <div class="form-group h-16">
        <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
        <input type="number" v-model="finalPrice" id="finalPrice" required class="w-full h-full border p-2" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfoPreco',
    props: {
      formData: {
        type: Object,
        required: true
      }
    },
    computed: {
      costPrice: {
        get() {
          return this.formData.price.costPrice;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.costPrice', value });
        }
      },
      porcentageProfit: {
        get() {
          return this.formData.price.porcentageProfit;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.porcentageProfit', value });
        }
      },
      porcentageFixedCost: {
        get() {
          return this.formData.price.porcentageFixedCost;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.porcentageFixedCost', value });
        }
      },
      porcentageADMCost: {
        get() {
          return this.formData.price.porcentageADMCost;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.porcentageADMCost', value });
        }
      },
      porcentageDiscount: {
        get() {
          return this.formData.price.porcentageDiscount;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.porcentageDiscount', value });
        }
      },
      subtotal: {
        get() {
          return this.formData.price.subtotal;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.subtotal', value });
        }
      },
      iva: {
        get() {
          return this.formData.price.iva;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.iva', value });
        }
      },
      finalPrice: {
        get() {
          return this.formData.price.finalPrice;
        },
        set(value) {
          this.$emit('update-form-data', { key: 'price.finalPrice', value });
        }
      }
    }
  };
  </script>
  