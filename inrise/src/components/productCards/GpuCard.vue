<template>
  <div class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200 ease-in-out">
    <h3 class="h-12 mb-4 text-xl font-semibold text-gray-800">{{ product.name }}</h3>
    <p class="text-gray-600">Socket: {{ product.socket }}</p>
    <p class="text-gray-600">Bits: {{ product.bits }}</p>
        <p class="text-gray-600">Memória: {{ product.capacity }} GB</p>
    <p v-if="product.price" class="mt-4 text-lg font-bold text-blue-600">Preço: {{ formatCurrency(product.price) }}</p>
    <p v-else class="mt-4 text-lg text-gray-500">Preço não disponível</p>
  </div>
</template>

<script>
export default {
  name: 'GpuCard',
  props: {
    product: Object,
    formatCurrency: Function,
  },
};
</script>
