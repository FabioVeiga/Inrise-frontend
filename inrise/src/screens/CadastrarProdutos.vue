<template>
  <div class="cadastrar-produtos">
    <h1 class=" text-4xl font-bold">Cadastrar Produto</h1>
    
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
    </div>
  </div>
</template>

<script>
import CadastroRam from './CadastroRam.vue';
import CadastroFonte from './CadastroFonte.vue';

export default {
  name: 'CadastrarProduto',
  components: {
    CadastroRam,
    CadastroFonte,
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
