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
      <input type="number" v-model="porcentageProfit" id="porcentageProfit" required class="w-full border p-2" step="0.01" />
    </div>

    <!-- Porcentagem de Custo Fixo -->
    <div class="form-group">
      <label for="porcentageFixedCost" class="block mb-1 font-semibold">Porcentagem de Custo Fixo</label>
      <input type="number" v-model="porcentageFixedCost" id="porcentageFixedCost" required class="w-full border p-2" step="0.01" />
    </div>

    <!-- Porcentagem de Custo ADM -->
    <div class="form-group">
      <label for="porcentageADMCost" class="block mb-1 font-semibold">Porcentagem de Custo ADM</label>
      <input type="number" v-model="porcentageADMCost" id="porcentageADMCost" required class="w-full border p-2" step="0.01" />
    </div>

    <!-- Porcentagem de Desconto -->
    <div class="form-group">
      <label for="porcentageDiscount" class="block mb-1 font-semibold">Porcentagem de Desconto</label>
      <input type="number" v-model="porcentageDiscount" id="porcentageDiscount" required class="w-full border p-2" step="0.01" />
    </div>

    <!-- Subtotal (calculado automaticamente) -->
    <div class="form-group">
      <label for="subtotal" class="block mb-1 font-semibold">Subtotal</label>
      <input type="number" :value="subtotal" id="subtotal" class="w-full border p-2 bg-gray-100" readonly />
    </div>

    <!-- IVA -->
    <div class="form-group">
      <label for="iva" class="block mb-1 font-semibold">IVA</label>
      <input type="number" v-model="iva" id="iva" required class="w-full border p-2" step="0.01" />
    </div>

    <!-- Preço Final (calculado automaticamente) -->
    <div class="form-group h-16">
      <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
      <input type="number" :value="finalPrice" id="finalPrice" class="w-full h-full border p-2 bg-gray-100" readonly />
    </div>
  </div>
</template>


<script>
export default {
  name: 'InfoPreco',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    costPrice: {
      get() {
        return this.formData.price.costPrice || 0;
      },
      set(value) {
        this.$emit('update-form-data', { key: 'price.costPrice', value: parseFloat(value) });
      },
    },
    porcentageProfit: {
      get() {
        return this.formData.price.porcentageProfit || 0;
      },
      set(value) {
        this.$emit('update-form-data', { key: 'price.porcentageProfit', value: parseFloat(value) });
      },
    },
    porcentageFixedCost: {
      get() {
        return this.formData.price.porcentageFixedCost || 0;
      },
      set(value) {
        this.$emit('update-form-data', { key: 'price.porcentageFixedCost', value: parseFloat(value) });
      },
    },
    porcentageADMCost: {
      get() {
        return this.formData.price.porcentageADMCost || 0;
      },
      set(value) {
        this.$emit('update-form-data', { key: 'price.porcentageADMCost', value: parseFloat(value) });
      },
    },
    porcentageDiscount: {
      get() {
        return this.formData.price.porcentageDiscount || 0;
      },
      set(value) {
        this.$emit('update-form-data', { key: 'price.porcentageDiscount', value: parseFloat(value) });
      },
    },
    iva: {
      get() {
        return this.formData.price.iva || 0;
      },
      set(value) {
        this.$emit('update-form-data', { key: 'price.iva', value: parseFloat(value) });
      },
    },
    subtotal() {
      const { costPrice, porcentageProfit, porcentageFixedCost, porcentageADMCost } = this.formData.price;
      const CA = porcentageADMCost / 100;
      const CF = porcentageFixedCost / 100;
      const L = porcentageProfit / 100;
      const subtotal = (costPrice * (1 + CA + CF)) * (1 + L);
      return this.roundToTwoDecimals(subtotal);
    },
    finalPrice() {
      const { subtotal, iva } = this;
      const tax = subtotal * (iva / 100);
      const subtotalWithTax = subtotal + tax;
      const stripeFee = 0.25 + 0.015 * subtotalWithTax;
      const finalPrice = subtotalWithTax + stripeFee;
      return this.roundToTwoDecimals(finalPrice);
    },
  },
  methods: {
    roundToTwoDecimals(value) {
      return parseFloat(value.toFixed(2));
    },
  },
  watch: {
    subtotal(newValue) {
      this.$emit('update-form-data', { key: 'price.subtotal', value: newValue });
    },
    finalPrice(newValue) {
      this.$emit('update-form-data', { key: 'price.finalPrice', value: newValue });
    },
  },
};
</script>
