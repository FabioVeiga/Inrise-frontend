<template>
  <div class="flex justify-center space-x-8">
    <ActivityBox 
      v-for="(item, index) in activityItems" 
      :key="index"
      :label="item.label" 
      :image="item.image" 
      :description="item.description"
      :value="item.value"
      :selectedTypes="selectedTypes"
      @update:selectedTypes="updateSelection"
    />
  </div>
</template>

<script>
//@TODO: Puxar esses programaticamente da API 
//@TODO: Alerta caso nenhum cookie tenha sido escolhido, e pular pra pcs prontos caso só casual tenha sido escolhido.
import Cookies from 'js-cookie';
import ActivityBox from './ActivityBox.vue';

export default {
  name: 'ActivityTypes',
  components: {
    ActivityBox
  },
  data() {
    return {
      selectedTypes: [],
      activityItems: [
        {
          label: 'Jogos',
          image: 'https://inrisecomputadoresdev.blob.core.windows.net/imagens/category/44/act1.png',
          description: 'Jogos da última geração e competitivos',
          value: 'Games'
        },
        {
          label: 'Trabalho',
          image: 'https://inrisecomputadoresdev.blob.core.windows.net/imagens/category/45/act2.png',
          description: 'Designers gráficos, engenheiros, artistas 3D, streamers, etc.',
          value: 'Work'
        },
        {
          label: 'Casual',
          image: 'https://inrisecomputadoresdev.blob.core.windows.net/imagens/category/46/act3.png',
          description: 'Redes sociais, séries e filmes, trabalhos de escola/faculdade, etc.',
          value: 'Casual'
        }
      ]
    };
  },
  created() {
    const savedTypes = Cookies.get('selectedActivities');
    if (savedTypes) {
      this.selectedTypes = JSON.parse(savedTypes);
    }
  },
  methods: {
    updateSelection(newSelection) {
      this.selectedTypes = newSelection;
      Cookies.set('selectedActivities', JSON.stringify(this.selectedTypes));
      this.$emit('type-selected', newSelection);
    }
  }
};
</script>
