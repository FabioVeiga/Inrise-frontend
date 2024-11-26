<template>
  <div class="cadastrar-produtos my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <h2 class="col-span-2 text-2xl font-bold">Informações Gerais</h2>
      <div class="form-group">
        <label for="productName" class="block mb-1 font-semibold">Nome do Produto</label>
        <input type="text" v-model="formData.name" id="productName" required class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="valueClassification" class="block mb-1 font-semibold">Classificação do Valor</label>
        <input type="number" v-model="formData.valueClassification" id="valueClassification" required
          class="w-full border p-2" />
      </div>

      <div class="form-group col-span-2">
        <label for="description" class="block mb-1 font-semibold">Descrição</label>
        <textarea v-model="formData.description" id="description" required
          class="resize-none w-full h-24 border p-2"></textarea>
      </div>

      <h2 class="col-span-2 text-2xl font-bold">Memória RAM</h2>
      <div class="form-group">
        <label for="socket" class="block mb-1 font-semibold">Socket</label>
        <input type="text" v-model="formData.socket" id="socket" required class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="frequency" class="block mb-1 font-semibold">Frequência (MHz)</label>
        <input type="number" v-model="formData.frequency" id="frequency" required class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
        <input type="number" v-model="formData.capacity" id="capacity" required class="w-full border p-2" />
      </div>

      <h2 class="col-span-2 text-2xl font-bold">Valores e Custos</h2>

      <div class="form-group">
        <label for="costPrice" class="block mb-1 font-semibold">Preço de Custo</label>
        <input type="number" v-model="formData.price.costPrice" id="costPrice" required class="w-full border p-2" />
      </div>

      <div class="form-group">
        <label for="porcentageProfit" class="block mb-1 font-semibold">Porcentagem de Lucro</label>
        <input type="number" v-model="formData.price.porcentageProfit" id="porcentageProfit" required
          class="w-full border p-2" />
      </div>

      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Atualizar Memória RAM
        </button>
      </div>
    </form>
  </div>
  
    <!--<div class="product-card">
    Exibe os detalhes do produto
    <h3>{{ product.name }}</h3>
    <p>{{ formatCurrency(product.price) }}</p>

     Botão para editar 
    <button @click="$emit('edit-product', product)">Editar</button>
  </div>
</template> -->

  </template>

  <script>
  //@TODO: criar um edit ram na rota de PUT
  import { fetchRamById, editRam } from '@/api';
  
  export default {
    name: 'EditRam',
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
          },
        },
      };
    },
    async created() {
      const productId = this.$route.params.productId;
      await this.loadProductDetails(productId);
    },
    methods: {
      async loadProductDetails(productId) {
        try {
          const response = await fetchRamById(productId);
          const product = response.data.data;
  
          this.formData = {
            name: product.name,
            socket: product.socket,
            frequency: product.frequency,
            capacity: product.capacity,
            description: product.description,
            valueClassification: product.valueClassification,
            price: {
              costPrice: product.price.costPrice,
              porcentageProfit: product.price.porcentageProfit,
            },
          };
        } catch (error) {
          console.error('Erro ao carregar detalhes do produto:', error);
        }
      },
      async submitForm() {
        try {
          const response = await editRam(this.formData);
          console.log('Memória RAM atualizada com sucesso!', response);
          alert('Produto atualizado com sucesso!');
          this.$router.push({ name: 'meusProdutos' });
        } catch (error) {
          console.error('Erro ao atualizar memória RAM:', error);
          alert('Erro ao atualizar produto!');
        }
      },
    },
  };
  </script>
