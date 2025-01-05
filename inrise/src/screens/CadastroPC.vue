<template>
  <div class="cadastrar-pc my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" :product-type="'computer'" />

      <!-- Seleção de Componentes -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Componentes do PC</h2>

        <!-- Processador -->
        <div class="form-group">
          <label for="processadorId" class="block mb-1 font-semibold">Processador</label>
          <select v-model="formData.processadorId" id="processadorId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione um Processador</option>
            <option v-for="item in processadores.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Placa Mãe -->
        <div class="form-group">
          <label for="motherBoardId" class="block mb-1 font-semibold">Placa Mãe</label>
          <select v-model="formData.motherBoardId" id="motherBoardId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione uma Placa Mãe</option>
            <option v-for="item in placasMae.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Gabinete -->
        <div class="form-group">
          <label for="towerId" class="block mb-1 font-semibold">Gabinete</label>
          <select v-model="formData.towerId" id="towerId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione um Gabinete</option>
            <option v-for="item in gabinetes.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Memória RAM Slot 01 -->
        <div class="form-group">
          <label for="memoryRamSlot01Id" class="block mb-1 font-semibold">Memória RAM Slot 01</label>
          <select v-model="formData.memoryRamSlot01Id" id="memoryRamSlot01Id" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Memória RAM</option>
            <option v-for="item in memoriasRam.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Memória RAM Slot 02 -->
        <div class="form-group">
          <label for="memoryRamSlot02Id" class="block mb-1 font-semibold">Memória RAM Slot 02</label>
          <select v-model="formData.memoryRamSlot02Id" id="memoryRamSlot02Id" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Memória RAM</option>
            <option v-for="item in memoriasRam.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Disco HHD -->
        <div class="form-group">
          <label for="memoryRomHHDId" class="block mb-1 font-semibold">Disco HDD</label>
          <select v-model="formData.memoryRomHHDId" id="memoryRomHHDId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Disco HDD</option>
            <option v-for="item in discos.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Disco SSD -->
        <div class="form-group">
          <label for="memoryRomSSDId" class="block mb-1 font-semibold">Disco SSD</label>
          <select v-model="formData.memoryRomSSDId" id="memoryRomSSDId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Disco SSD</option>
            <option v-for="item in discos.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Disco SSD M.2 -->
        <div class="form-group">
          <label for="memoryRomSSDM2Id" class="block mb-1 font-semibold">Disco SSD M.2</label>
          <select v-model="formData.memoryRomSSDM2Id" id="memoryRomSSDM2Id" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Disco SSD M.2</option>
            <option v-for="item in discos.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Placa de Vídeo -->
        <div class="form-group">
          <label for="videoBoardId" class="block mb-1 font-semibold">Placa de Vídeo</label>
          <select v-model="formData.videoBoardId" id="videoBoardId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Placa de Vídeo</option>
            <option v-for="item in placasVideo.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Fonte de Alimentação -->
        <div class="form-group">
          <label for="powerSupplyId" class="block mb-1 font-semibold">Fonte de Alimentação</label>
          <select v-model="formData.powerSupplyId" id="powerSupplyId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Fonte de Alimentação</option>
            <option v-for="item in fontesAlimentacao.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Cooler -->
        <div class="form-group">
          <label for="coolerId" class="block mb-1 font-semibold">Cooler</label>
          <select v-model="formData.coolerId" id="coolerId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Cooler</option>
            <option v-for="item in coolers.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Monitor -->
        <div class="form-group">
          <label for="monitorScreenId" class="block mb-1 font-semibold">Monitor</label>
          <select v-model="formData.monitorScreenId" id="monitorScreenId" class="w-full border p-2" required
            @change="calcularPrecoFinal">
            <option value="" disabled>Selecione Monitor</option>
            <option v-for="item in monitores.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Preço Final -->
        <div class="form-group col-span-2">
          <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
          <input type="number" v-model="formData.finalPrice" id="finalPrice" required readonly
            class="w-full text-2xl font-bold text-center h-full border p-2 bg-gray-100" />
        </div>
      </div>

      <!-- Botão de Salvar -->
      <div class="form-group my-4 col-span-2">
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Salvar PC
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
import { fetchAllCpu, fetchAllMobo, fetchAllTower, fetchAllRam, fetchAllStorage, fetchAllGpu, fetchAllPsu, fetchAllCooler, fetchAllMonitor, registerPC } from '@/api';

export default {
  name: 'CadastroPC',
  components: {
    InfoGeral,
  },
  data() {
    return {
      formData: {
        name: '',
        processadorId: 0,
        motherBoardId: 0,
        towerId: 0,
        memoryRamSlot01Id: 0,
        memoryRamSlot02Id: 0,
        memoryRomHHDId: 0,
        memoryRomSSDId: 0,
        memoryRomSSDM2Id: 0,
        videoBoardId: 0,
        powerSupplyId: 0,
        coolerId: 0,
        monitorScreenId: 0,
        finalPrice: 0
      },
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
      try {
        const [processadores, placasMae, gabinetes, memoriasRam, discos, placasVideo, fontesAlimentacao, coolers, monitores] = await Promise.all([
          fetchAllCpu(),
          fetchAllMobo(),
          fetchAllTower(),
          fetchAllRam(),
          fetchAllStorage(),
          fetchAllGpu(),
          fetchAllPsu(),
          fetchAllCooler(),
          fetchAllMonitor(),
        ]);
        console.log("Proce", processadores.data)
        this.processadores = processadores.data;
        this.placasMae = placasMae.data;
        this.gabinetes = gabinetes.data;
        this.memoriasRam = memoriasRam.data;
        this.discos = discos.data;
        this.placasVideo = placasVideo.data;
        this.fontesAlimentacao = fontesAlimentacao.data;
        this.coolers = coolers.data;
        this.monitores = monitores.data;
        console.log("Woof", this.processadores, this.placasMae)
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
    updateFormData({ key, value }) {
      const keys = key.split('.');
      if (keys.length === 2) {
        this.formData[keys[0]][keys[1]] = value;
      } else {
        this.formData[key] = value;
      }
    },

    calcularPrecoFinal() {
      let totalPrice = 10;

      // 
      /*const getPrice = (id) => {
        return item ? item.price : 0;
      };*/

      console.log(this.processadores.items[this.formData.processadorId])
      //totalPrice += this.processadores.items[this.formData.processadorId];
      /*totalPrice += getPrice(this.formData.motherBoardId, this.placasMae);
      totalPrice += getPrice(this.formData.towerId, this.gabinetes);
      totalPrice += getPrice(this.formData.memoryRamSlot01Id, this.memoriasRam);
      totalPrice += getPrice(this.formData.memoryRamSlot02Id, this.memoriasRam);
      totalPrice += getPrice(this.formData.memoryRomHHDId, this.discos);
      totalPrice += getPrice(this.formData.memoryRomSSDId, this.discos);
      totalPrice += getPrice(this.formData.memoryRomSSDM2Id, this.discos);
      totalPrice += getPrice(this.formData.videoBoardId, this.placasVideo);
      totalPrice += getPrice(this.formData.powerSupplyId, this.fontesAlimentacao);
      totalPrice += getPrice(this.formData.coolerId, this.coolers);
      totalPrice += getPrice(this.formData.monitorScreenId, this.monitores);*/

      // Atualiza o preço final
      this.formData.finalPrice = totalPrice;
    },

    async submitForm() {
      try {
        await registerPC(this.formData);
        //this.$router.push({ name: '/admin/cadastrarProdutos' }); TODO: Usar router pra dar refresh ao editar e cadastrar?
        alert('Produto cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar PC:', error);
        alert('Erro ao cadastrar produto!');

      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.cadastrar-pc {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
