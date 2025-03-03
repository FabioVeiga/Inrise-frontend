<template>
  <div class="cadastrar-produtos">
    <h1 class="text-4xl font-bold my-8">Cadastrar Produto</h1>
    
    <div class="form-group my-8">
      <select v-model="productType" id="productType" @change="resetForm" required>
        <option value="memoryRam">Memória RAM</option>
        <option value="powerSupply">Fonte</option>
        <option value="monitorScreen">Pre-Build</option>
        <option value="videoBoard">Placa de Vídeo</option>
        <option value="processor">Processador</option>
        <option value="tower">Gabinete</option>
        <option value="cooler">Cooler</option>
        <option value="memoryRom">Disco</option>
        <option value="computer">Computador</option>
        <option value="motherBoard">Placa Mãe</option>
      </select>
    </div>

    <div>
      <CadastroRam v-if="productType === 'memoryRam'" />
      <CadastroFonte v-if="productType === 'powerSupply'" />
      <CadastroGabinete v-if="productType === 'tower'" />
      <CadastroMonitor v-if="productType === 'monitorScreen'" />
      <CadastroPlacaDeVideo v-if="productType === 'videoBoard'" />
      <CadastroProcessador v-if="productType === 'processor'" />
      <CadastroCooler v-if="productType === 'cooler'" />
      <CadastroDisco v-if="productType === 'memoryRom'" />
      <CadastroPC v-if="productType === 'computer'" />
      <CadastroMobo v-if="productType === 'motherBoard'" />
    </div>
  </div>
</template>

<script>
import CadastroRam from './CadastroRam.vue';
import CadastroFonte from './CadastroFonte.vue';
import CadastroGabinete from './CadastroGabinete.vue';
import CadastroMonitor from './CadastroMonitor.vue';
import CadastroPlacaDeVideo from './CadastroPlacaDeVideo.vue';
import CadastroProcessador from './CadastroProcessador.vue';
import CadastroCooler from './CadastroCooler.vue';
import CadastroDisco from './CadastroDisco.vue';
import CadastroPC from './CadastroPC.vue';
import CadastroMobo from './CadastroMobo.vue';

export default {
  name: 'CadastrarProduto',
  components: {
    CadastroRam,
    CadastroFonte,
    CadastroGabinete,
    CadastroMonitor,
    CadastroPlacaDeVideo,
    CadastroProcessador,
    CadastroCooler,
    CadastroDisco,
    CadastroPC,
    CadastroMobo
  },
  data() {
    return {
      productType: 'memoryRam',
    };
  },
  methods: {
    resetForm() {
      console.log(`Produto no CadastrarProdutos: ${this.productType}`);
    }
  }
};
</script>

<style scoped>
.cadastrar-produtos {
  margin: 20px;
}

.form-group {
  margin-bottom: 15px;
}

select {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
