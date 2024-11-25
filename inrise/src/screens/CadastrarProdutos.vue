<template>
  <div class="cadastrar-produtos">
    <h1>Cadastrar Produto</h1>
    
    <div class="form-group">
      <label for="productType">Selecione o Tipo de Produto</label>
      <select v-model="selectedProduct" id="productType" @change="resetForm" required>
        <option value="ram">Memória RAM</option>
        <option value="fonte">Fonte</option>
        <option value="placaDeVideo">Placa de Vídeo</option>
        <option value="processador">Processador</option>
        <option value="gabinete">Gabinete</option>
        <option value="cooler">Cooler</option>
        <option value="disco">Disco</option>
      </select>
    </div>

    <div>
      <CadastroRam v-if="selectedProduct === 'ram'" />
      <!--<CadastroFonte v-if="selectedProduct === 'fonte'" />-->
    </div>
  </div>
</template>

<script>
import CadastroRam from './CadastroRam.vue';
//import CadastroFonte from './CadastroFonte.vue';

export default {
  name: 'CadastrarProduto',
  components: {
    CadastroRam,
    //CadastroFonte,
  },
  data() {
    return {
      selectedProduct: 'ram', 
    };
  },
  methods: {
    resetForm() {
      console.log(`Selecionado: ${this.selectedProduct}`);
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
