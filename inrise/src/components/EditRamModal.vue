<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">Editar Memória RAM</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Nome do Produto -->
        <div class="form-group col-span-2">
          <label for="productName" class="block mb-1 font-semibold">Nome do Produto</label>
          <input type="text" v-model="editedProduct.name" id="productName" required class="w-full border p-2" />
        </div>

        <!-- Classificação do valor -->
        <div class="form-group">
          <label for="valueClassification" class="block mb-1 font-semibold">Classificação do Valor</label>
          <input type="number" v-model="editedProduct.valueClassification" id="valueClassification" required
            class="w-full border p-2" />
        </div>

        <!-- Descrição -->
        <div class="form-group col-span-2">
          <label for="description" class="block mb-1 font-semibold">Descrição</label>
          <textarea v-model="editedProduct.description" id="description" required
            class="resize-none w-full h-24 border p-2"></textarea>
        </div>

        <!-- Exclusivos de memoria ram -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class=" col-span-2 text-2xl font-bold">Memória RAM</h2>

          <!-- Socket -->
          <div class="form-group">
            <label for="socket" class="block mb-1 font-semibold">Socket</label>
            <input type="text" v-model="editedProduct.socket" id="socket" required class="w-full border p-2" />
          </div>

          <!-- Frequência -->
          <div class="form-group">
            <label for="frequency" class="block mb-1 font-semibold">Frequência (MHz)</label>
            <input type="number" v-model="editedProduct.frequency" id="frequency" required class="w-full border p-2" />
          </div>

          <!-- Capacidade -->
          <div class="form-group">
            <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
            <input type="number" v-model="editedProduct.capacity" id="capacity" required class="w-full border p-2" />
          </div>
        </div>

        <!-- Preço -->
        <h2 class=" col-span-2 text-2xl font-bold">Valores e Custos</h2>

        <div class="form-group">
          <label for="costPrice" class="block mb-1 font-semibold">Preço de Custo</label>
          <input type="number" v-model="editedProduct.price.costPrice" id="costPrice" required
            class="w-full border p-2" />
        </div>

        <div class="form-group">
          <label for="porcentageProfit" class="block mb-1 font-semibold">Porcentagem de Lucro</label>
          <input type="number" v-model="editedProduct.price.porcentageProfit" id="porcentageProfit" required
            class="w-full border p-2" />
        </div>

        <div class="form-group">
          <label for="porcentageFixedCost" class="block mb-1 font-semibold">Porcentagem de Custo Fixo</label>
          <input type="number" v-model="editedProduct.price.porcentageFixedCost" id="porcentageFixedCost" required
            class="w-full border p-2" />
        </div>

        <div class="form-group">
          <label for="porcentageADMCost" class="block mb-1 font-semibold">Porcentagem de Custo ADM</label>
          <input type="number" v-model="editedProduct.price.porcentageADMCost" id="porcentageADMCost" required
            class="w-full border p-2" />
        </div>

        <div class="form-group">
          <label for="porcentageDiscount" class="block mb-1 font-semibold">Porcentagem de Desconto</label>
          <input type="number" v-model="editedProduct.price.porcentageDiscount" id="porcentageDiscount" required
            class="w-full border p-2" />
        </div>

        <div class="form-group">
          <label for="subtotal" class="block mb-1 font-semibold">Subtotal</label>
          <input type="number" v-model="editedProduct.price.subtotal" id="subtotal" required
            class="w-full border p-2" />
        </div>

        <div class="form-group">
          <label for="iva" class="block mb-1 font-semibold">IVA</label>
          <input type="number" v-model="editedProduct.price.iva" id="iva" required class="w-full border p-2" />
        </div>

        <div class="form-group h-16">
          <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
          <input type="number" v-model="editedProduct.price.finalPrice" id="finalPrice" required
            class="w-full h-full border p-2" />
        </div>

        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Memória RAM
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editRam } from '@/api';

export default {
  name: 'EditRamModal',
  props: {
    product: Object,
  },
  created() {
    console.log('Produto para edição:', this.product);
    console.log('Preço do produto:', this.product.price);
  },
  data() {
    return {
      editedProduct: this.product && typeof this.product === 'object' ? {
        ...this.product,
        price: this.product.price || {
          costPrice: 0,
          porcentageProfit: 0,
          porcentageFixedCost: 0,
          porcentageADMCost: 0,
          porcentageDiscount: 0,
          subtotal: 0,
          iva: 0,
          finalPrice: 0
        }
      } : {
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
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const updatedRam = await editRam(this.editedProduct.id, this.editedProduct);
        console.log('Memória RAM editada com sucesso!', updatedRam);
        this.$emit('save', updatedRam);  // Emitindo o evento com o produto atualizado
        this.closeModal(); // Fecha o modal após salvar
      } catch (error) {
        console.error('Erro ao editar memória RAM:', error);
        alert('Erro ao editar produto!');
      }
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped></style>
