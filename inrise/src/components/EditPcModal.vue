<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white relative p-6 rounded-lg max-w-2xl w-full">
      <h2 class="text-2xl font-bold mb-4">Editar Personalizado</h2>
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
        &times;
      </button>
      <div v-if="loading" class="text-center text-xl text-gray-500">
        <p>Carregando peças...</p>
      </div>
      <form v-if="!loading" @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
        <InfoGeral :form-data="editedProduct" @update-form-data="updateeditedProduct" :product-type="'computer'" />

        <!-- Seleção de Componentes -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 class="col-span-2 text-xl font-semibold">Componentes do PC</h3>

          <!-- Processador -->
          <div class="form-group">
            <label for="processadorId" class="block mb-1 font-semibold">Processador</label>
            <select v-model="editedProduct.processadorId" id="processadorId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione um Processador</option>
              <option v-for="item in processadores" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Placa Mãe -->
          <div class="form-group">
            <label for="motherBoardId" class="block mb-1 font-semibold">Placa Mãe</label>
            <select v-model="editedProduct.motherBoardId" id="motherBoardId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione uma Placa Mãe</option>
              <option v-for="item in placasMae" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>



          <!-- Memória RAM Slot 01 -->
          <div class="form-group">
            <label for="memoryRamSlot01Id" class="block mb-1 font-semibold">Memória RAM Slot 01</label>
            <select v-model="editedProduct.memoryRamSlot01Id" id="memoryRamSlot01Id" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Memória RAM</option>
              <option v-for="item in memoriasRam" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Memória RAM Slot 02 -->
          <div class="form-group">
            <label for="memoryRamSlot02Id" class="block mb-1 font-semibold">Memória RAM Slot 02</label>
            <select v-model="editedProduct.memoryRamSlot02Id" id="memoryRamSlot02Id" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Memória RAM</option>
              <option v-for="item in memoriasRam" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Disco HHD -->
          <div class="form-group">
            <label for="memoryRomHHDId" class="block mb-1 font-semibold">Disco HDD</label>
            <select v-model="editedProduct.memoryRomHHDId" id="memoryRomHHDId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Disco HDD</option>
              <option v-for="item in discos" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Disco SSD -->
          <div class="form-group">
            <label for="memoryRomSSDId" class="block mb-1 font-semibold">Disco SSD</label>
            <select v-model="editedProduct.memoryRomSSDId" id="memoryRomSSDId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Disco SSD</option>
              <option v-for="item in discos" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Disco SSD M.2 -->
          <div class="form-group">
            <label for="memoryRomSSDM2Id" class="block mb-1 font-semibold">Disco SSD M.2</label>
            <select v-model="editedProduct.memoryRomSSDM2Id" id="memoryRomSSDM2Id" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Disco SSD M.2</option>
              <option v-for="item in discos" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Placa de Vídeo -->
          <div class="form-group">
            <label for="videoBoardId" class="block mb-1 font-semibold">Placa de Vídeo</label>
            <select v-model="editedProduct.videoBoardId" id="videoBoardId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Placa de Vídeo</option>
              <option v-for="item in placasVideo" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Fonte de Alimentação -->
          <div class="form-group">
            <label for="powerSupplyId" class="block mb-1 font-semibold">Fonte de Alimentação</label>
            <select v-model="editedProduct.powerSupplyId" id="powerSupplyId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Fonte de Alimentação</option>
              <option v-for="item in fontesAlimentacao" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Cooler -->
          <div class="form-group">
            <label for="coolerId" class="block mb-1 font-semibold">Cooler</label>
            <select v-model="editedProduct.coolerId" id="coolerId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Cooler</option>
              <option v-for="item in coolers" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Monitor -->
          <div class="form-group">
            <label for="monitorScreenId" class="block mb-1 font-semibold">Monitor</label>
            <select v-model="editedProduct.monitorScreenId" id="monitorScreenId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione Monitor</option>
              <option v-for="item in monitores" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Gabinete -->
          <div class="form-group">
            <label for="towerId" class="block mb-1 font-semibold">Gabinete</label>
            <select v-model="editedProduct.towerId" id="towerId" class="w-full border p-2" required
              @change="calcularPrecoFinal">
              <option value="" disabled>Selecione um Gabinete</option>
              <option v-for="item in gabinetes" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

          <!-- Preço Final -->
          <div class="form-group col-span-2">
            <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
            <input type="number" v-model="editedProduct.finalPrice" id="finalPrice" required readonly
              class="w-full text-2xl font-bold text-center h-full border p-2 bg-gray-100" />
          </div>
        </div>

        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2 flex flex-col justify-between">
          <button type="button" @click="closeModal"
            class="w-full my-4 md:w-auto bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" class="w-full md:w-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar Personalizado
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';//
import { editPC, registerImage } from '@/api';
import { loadProducts } from '@/utils/productUtils';

export default {
  name: 'EditPcModal',
  components: {
    InfoGeral,
  },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      editedProduct: { ...this.product, images: this.product?.images || [] },
      processadores: [],
      placasMae: [],
      gabinetes: [],
      memoriasRam: [],
      discos: [],
      placasVideo: [],
      fontesAlimentacao: [],
      coolers: [],
      monitores: [],
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const [processadores, placasMae, gabinetes, memoriasRam, discos, placasVideo, fontesAlimentacao, coolers, monitores] = await Promise.all([
          loadProducts('processador'),
          loadProducts('placaMae'),
          loadProducts('gabinete'),
          loadProducts('ram'),
          loadProducts('disco'),
          loadProducts('placaDeVideo'),
          loadProducts('psu'),
          loadProducts('cooler'),
          loadProducts('monitor'),
        ]);
        this.loading = false;
        this.processadores = processadores;
        this.placasMae = placasMae;
        this.gabinetes = gabinetes;
        this.memoriasRam = memoriasRam;
        this.discos = discos;
        this.placasVideo = placasVideo;
        this.fontesAlimentacao = fontesAlimentacao;
        this.coolers = coolers;
        this.monitores = monitores;
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
    updateeditedProduct({ key, value }) {
      const keys = key.split('.');
      if (keys.length === 2) {
        this.editedProduct[keys[0]][keys[1]] = value;
      } else {
        this.editedProduct[key] = value;
      }
    },

    calcularPrecoFinal() {
      let totalPrice = 0;
      const selectedItems = [
        { id: this.editedProduct.processadorId, list: this.processadores },
        { id: this.editedProduct.motherBoardId, list: this.placasMae },
        { id: this.editedProduct.towerId, list: this.gabinetes },
        { id: this.editedProduct.memoryRamSlot01Id, list: this.memoriasRam },
        { id: this.editedProduct.memoryRamSlot02Id, list: this.memoriasRam },
        { id: this.editedProduct.memoryRomHHDId, list: this.discos },
        { id: this.editedProduct.memoryRomSSDId, list: this.discos },
        { id: this.editedProduct.memoryRomSSDM2Id, list: this.discos },
        { id: this.editedProduct.videoBoardId, list: this.placasVideo },
        { id: this.editedProduct.powerSupplyId, list: this.fontesAlimentacao },
        { id: this.editedProduct.coolerId, list: this.coolers },
        { id: this.editedProduct.monitorScreenId, list: this.monitores },
      ];

      selectedItems.forEach(({ id, list }) => {
        const item = list.find(item => item.id === id);
        if (item && item.price && item.price.finalPrice) {
          totalPrice += item.price.finalPrice;
        }
      });

      this.editedProduct.finalPrice = totalPrice;
    },

    async submitForm() {
      try {
        const updatedPC = await editPC(this.product.id, this.editedProduct);
        console.log(updatedPC)
        const prodId = this.editedProduct.id;
        if (this.editedProduct?.images[0] && this.editedProduct?.image) {
          console.log('Img antes da request:', this.editedProduct.image);
          const imageResponse = await registerImage('computer', prodId, this.editedProduct.image);
          console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        alert('PC editado com sucesso!');
        this.$emit('save', this.editedProduct);
        this.closeModal();
        this.$emit('close');
      } catch (error) {
        console.error('Erro ao editar PC:', error);
        alert('Erro ao editar produto!');
      }
    },

    closeModal() {
      this.$emit('close');
    }
  },

  mounted() {
    console.log("Edited product", this.editedProduct)
    console.log("Thisprod", this.product)
    this.fetchData()
  },
};
</script>

<style scoped></style>
