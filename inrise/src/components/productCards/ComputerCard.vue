<template>
  <div class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
    <h3 class="h-12 mb-4 text-xl font-semibold text-gray-800">{{ product.name }}</h3>
    <p class="text-gray-600">Potência: {{ product.potency }} W</p>
    <p class="text-gray-600">Potência Real: {{ product.potencyReal }} W</p>
    <p class="text-gray-600">Selo: {{ formattedStamp }}</p>
    <p class="text-gray-600">Modular: {{ formattedModular }}</p>
    <p v-if="product.price" class="mt-4 text-lg font-bold text-blue-600">Preço: {{ formatCurrency(product.price) }}</p>
    <p v-else class="mt-4 text-lg text-gray-500">Preço não disponível</p>
  </div>
</template>
<script>
export default {
  //@TODO FAZER AQUI AAAA tem que REGISTRAR PCS AINDA
  name: 'ComputerCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
    formatCurrency: {
      type: Function,
      required: true,
    },
  },

};
</script>
