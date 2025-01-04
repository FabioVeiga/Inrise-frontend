<template>
  <div class="cadastrar-pc my-5">
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Componente de Informações Gerais -->
      <InfoGeral :formData="formData" @update-form-data="updateFormData" />

      <!-- Seleção de Componentes -->
      <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 class="col-span-2 text-2xl font-bold">Componentes do PC</h2>

        <!-- Processador -->
        <div class="form-group">
          <label for="processadorId" class="block mb-1 font-semibold">Processador</label>
          <select v-model="formData.processadorId" id="processadorId" class="w-full border p-2" required>
            <option value="" disabled>Selecione um Processador</option>
            <option v-for="item in processadores" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Placa Mãe -->
        <div class="form-group">
          <label for="motherBoardId" class="block mb-1 font-semibold">Placa Mãe</label>
          <select v-model="formData.motherBoardId" id="motherBoardId" class="w-full border p-2" required>
            <option value="" disabled>Selecione uma Placa Mãe</option>
            <option v-for="item in placasMae" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Gabinete -->
        <div class="form-group">
          <label for="towerId" class="block mb-1 font-semibold">Gabinete</label>
          <select v-model="formData.towerId" id="towerId" class="w-full border p-2" required>
            <option value="" disabled>Selecione um Gabinete</option>
            <option v-for="item in gabinetes" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Memória RAM Slot 01 -->
        <div class="form-group">
          <label for="memoryRamSlot01Id" class="block mb-1 font-semibold">Memória RAM Slot 01</label>
          <select v-model="formData.memoryRamSlot01Id" id="memoryRamSlot01Id" class="w-full border p-2" required>
            <option value="" disabled>Selecione Memória RAM</option>
            <option v-for="item in memoriasRam" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Memória RAM Slot 02 -->
        <div class="form-group">
          <label for="memoryRamSlot02Id" class="block mb-1 font-semibold">Memória RAM Slot 02</label>
          <select v-model="formData.memoryRamSlot02Id" id="memoryRamSlot02Id" class="w-full border p-2" required>
            <option value="" disabled>Selecione Memória RAM</option>
            <option v-for="item in memoriasRam" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Disco HHD -->
        <div class="form-group">
          <label for="memoryRomHHDId" class="block mb-1 font-semibold">Disco HDD</label>
          <select v-model="formData.memoryRomHHDId" id="memoryRomHHDId" class="w-full border p-2" required>
            <option value="" disabled>Selecione Disco HDD</option>
            <option v-for="item in discos" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Disco SSD -->
        <div class="form-group">
          <label for="memoryRomSSDId" class="block mb-1 font-semibold">Disco SSD</label>
          <select v-model="formData.memoryRomSSDId" id="memoryRomSSDId" class="w-full border p-2" required>
            <option value="" disabled>Selecione Disco SSD</option>
            <option v-for="item in discos" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Disco SSD M.2 -->
        <!--todo: tem que ser item in discos que tenha a propriedade de ssd-->
        <div class="form-group">
          <label for="memoryRomSSDM2Id" class="block mb-1 font-semibold">Disco SSD M.2</label>
          <select v-model="formData.memoryRomSSDM2Id" id="memoryRomSSDM2Id" class="w-full border p-2" required>
            <option value="" disabled>Selecione Disco SSD M.2</option>
            <option v-for="item in discos" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Placa de Vídeo -->
        <div class="form-group">
          <label for="videoBoardId" class="block mb-1 font-semibold">Placa de Vídeo</label>
          <select v-model="formData.videoBoardId" id="videoBoardId" class="w-full border p-2" required>
            <option value="" disabled>Selecione Placa de Vídeo</option>
            <option v-for="item in placasVideo" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Fonte de Alimentação -->
        <div class="form-group">
          <label for="powerSupplyId" class="block mb-1 font-semibold">Fonte de Alimentação</label>
          <select v-model="formData.powerSupplyId" id="powerSupplyId" class="w-full border p-2" required>
            <option value="" disabled>Selecione Fonte de Alimentação</option>
            <option v-for="item in fontesAlimentacao" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Cooler -->
        <div class="form-group">
          <label for="coolerId" class="block mb-1 font-semibold">Cooler</label>
          <select v-model="formData.coolerId" id="coolerId" class="w-full border p-2" required>
            <option value="" disabled>Selecione Cooler</option>
            <option v-for="item in coolers" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Monitor -->
        <div class="form-group">
          <label for="monitorScreenId" class="block mb-1 font-semibold">Monitor</label>
          <select v-model="formData.monitorScreenId" id="monitorScreenId" class="w-full border p-2" required>
            <option value="" disabled>Selecione Monitor</option>
            <option v-for="item in monitores" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>

        <!-- Preço  -->

        <InfoPreco :formData="formData" @update-form-data="updateFormData" />

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
import InfoPreco from '@/components/admin/cadastro/InfoPreco.vue';

export default {
  name: 'CadastroPC',
  components: {
    InfoGeral,
    InfoPreco
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
      const [
        processadores,
        placasMae,
        gabinetes,
        memoriasRam,
        discos,
        placasVideo,
        fontesAlimentacao,
        coolers,
        monitores,
      ] = await Promise.all([
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

      this.processadores = processadores;
      this.placasMae = placasMae;
      this.gabinetes = gabinetes;
      this.memoriasRam = memoriasRam;
      this.discos = discos;
      this.placasVideo = placasVideo;
      this.fontesAlimentacao = fontesAlimentacao;
      this.coolers = coolers;
      this.monitores = monitores;
    },

    updateFormData(key, value) {
      this.formData[key] = value;
    },

    async submitForm() {
      try {
        await registerPC(this.formData);
        this.$router.push({ name: 'pc-dashboard' }); // Redirecionar após salvar
      } catch (error) {
        console.error('Erro ao salvar PC:', error);
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
