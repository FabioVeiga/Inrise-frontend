<template>
    <div class="flex flex-col justify-center items-center w-[200px] h-[250px] p-2 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div class="w-full h-[100px] flex justify-center items-center">
        <img :src="productImage || '@/assets/passo3.png'" alt="PC Product Image" class="h-full max-h-[100px] object-contain" />
      </div>
  
      <div class="text-center mt-2">
        <p class="text-lg font-semibold">{{ productName || 'PC' }}</p>
        <p class="text-sm text-gray-600">{{ productDescription || 'Descrição do PC' }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PcProductCard",
    props: {
      productName: {
        type: String,
        required: true
      },
      productDescription: {
        type: String,
        required: true
      },
      productImage: {
        type: String,
        required: true
      }
    }
  };
  </script>
  