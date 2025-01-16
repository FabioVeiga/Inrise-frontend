<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-4 text-center">Editar Disco</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
        <!-- Componente InfoGeral -->
        <InfoGeral :form-data="editedProduct" @update-form-data="updateFormData" :product-type="'memoryRom'" />

        <!-- Informações Específicas do Disco -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Informações do Disco</h2>

          <!-- Socket -->
          <div class="form-group">
            <label for="socket" class="block mb-1 font-semibold">Socket</label>
            <input type="text" v-model="editedProduct.socket" id="socket" required class="w-full border p-2" />
          </div>

          <!-- Velocidade de Leitura -->
          <div class="form-group">
            <label for="velocityRead" class="block mb-1 font-semibold">Velocidade de Leitura (MB/s)</label>
            <input type="number" v-model="editedProduct.velocityRead" id="velocityRead" required
              class="w-full border p-2" />
          </div>

          <!-- Velocidade de Escrita -->
          <div class="form-group">
            <label for="velocityWrite" class="block mb-1 font-semibold">Velocidade de Escrita (MB/s)</label>
            <input type="number" v-model="editedProduct.velocityWrite" id="velocityWrite" required
              class="w-full border p-2" />
          </div>

          <!-- Capacidade -->
          <div class="form-group">
            <label for="capacity" class="block mb-1 font-semibold">Capacidade (GB)</label>
            <input type="number" v-model="editedProduct.capacity" id="capacity" required class="w-full border p-2" />
          </div>

          <!-- Potência -->
          <div class="form-group">
            <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
            <input type="number" v-model="editedProduct.potency" id="potency" required class="w-full border p-2" />
          </div>

          <!-- Tipo de Disco -->
          <div class="form-group">
            <label for="diskType" class="block mb-1 font-semibold">Tipos de Disco</label>
            <div class="flex justify-center items-center space-x-4">
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="editedProduct.isHHD" id="isHHD" />
                <span>HDD</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="editedProduct.isSSD" id="isSSD" />
                <span>SSD</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="editedProduct.isSSDM2" id="isSSDM2" />
                <span>SSD M.2</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Componente InfoPreco -->
        <InfoPreco :form-data="editedProduct" @update-form-data="updateFormData" />

        <!-- Botões -->
        <div class="form-group my-4 col-span-2 flex flex-col justify-between">
          <button type="button" @click="closeModal"
            class="w-full my-4 md:w-auto bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" class="w-full md:w-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Disco
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editRom, registerImage } from '@/api';
//@TODO: Adicionar o alerta ao fazer a req com sucesso
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
  name: 'EditRomModal',
  components: {
    InfoGeral,
    InfoPreco,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      editedProduct: this.product && typeof this.product === 'object' ? { ...this.product } : {
        name: '',
        socket: '',
        velocityRead: 0,
        velocityWrite: 0,
        capacity: 0,
        potency: 0,
        isHHD: false,
        isSSD: false,
        isSSDM2: false,
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
    async submitForm() {
      try {
        const updatedRom = await editRom(this.editedProduct.id, this.editedProduct);
        console.log('Disco editado com sucesso!', updatedRom);
        const prodId = this.editedProduct.id;
        if (this.editedProduct.images[0]) {
          console.log('Img antes da request:', this.editedProduct.image);
          const imageResponse = await registerImage('memoryRom', prodId, this.editedProduct.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        alert('Disco editado com sucesso!');
        this.$emit('save', updatedRom);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao editar disco:', error);
        alert('Erro ao editar produto!');
      }
    },
    updateFormData({ key, value }) {
      const keys = key.split('.');
      let target = this.editedProduct;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in target)) {
          target[k] = {};
        }
        target = target[k];
      }

      target[keys[keys.length - 1]] = value;
    },

    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
