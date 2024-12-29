<template>
  <div class="cadastrar-produtos">
    <h1 class="text-4xl font-bold my-8">Cadastrar Produto</h1>
    
    <div class="form-group my-8">
      <select v-model="productType" id="productType" @change="resetForm" required>
        <option value="ram">Memória RAM</option>
        <option value="fonte">Fonte</option>
        <option value="monitor">Monitor</option>
        <option value="placaDeVideo">Placa de Vídeo</option>
        <option value="processador">Processador</option>
        <option value="gabinete">Gabinete</option>
        <option value="cooler">Cooler</option>
        <option value="disco">Disco</option>
        <option value="computador">Computador</option>
      </select>
    </div>

    <div>
      <CadastroRam v-if="productType === 'ram'" />
      <CadastroFonte v-if="productType === 'fonte'" />
      <CadastroGabinete v-if="productType === 'gabinete'" />
      <CadastroMonitor v-if="productType === 'monitor'" />
      <CadastroPlacaDeVideo v-if="productType === 'placaDeVideo'" />
      <CadastroProcessador v-if="productType === 'processador'" />
      <CadastroCooler v-if="productType === 'cooler'" />
      <CadastroDisco v-if="productType === 'disco'" />
      <CadastroPC v-if="productType === 'computador'" />
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
  },
  data() {
    return {
      productType: 'ram', 
    };
  },
  methods: {
    resetForm() {
      console.log(`Selecionado: ${this.productType}`);
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
