<template>
  <div class="flex flex-row">
    <HomeContentView>
      <HomeMenu></HomeMenu>

      <HeaderRectanglesLarge>
        <p class="whitespace-nowrap">SELECIONE <br> OS SOFTWARES</p>
      </HeaderRectanglesLarge>
      <AppBreadcrumbs></AppBreadcrumbs>

      <p v-if="selectedTypes.includes('Games')" style="white-space: nowrap" class="text-xl font-semibold">
        Jogos massivo-multijogador
      </p>
      <SoftwaresRow :categoryIds="[40, 41, 42, 43]" v-if="selectedTypes.includes('Games')" @softwares-selected="handleSoftwareSelection" />

      <p v-if="selectedTypes.includes('Games')" style="white-space: nowrap" class="text-xl font-semibold">
        Jogos Single-player
      </p>
      <SoftwaresRow :categoryIds="[36, 37, 38, 39]" v-if="selectedTypes.includes('Games')" @softwares-selected="handleSoftwareSelection" />

      <p v-if="selectedTypes.includes('Work')" style="white-space: nowrap" class="text-xl font-semibold">
        Softwares de trabalho
      </p>
      <SoftwaresRow :categoryIds="[32, 33, 34, 35]" v-if="selectedTypes.includes('Work')" @softwares-selected="handleSoftwareSelection" />

      <p>Não encontrou o seu jogo? Não se preocupe. A <b>InRise garante que sua máquina atende
        <br>os requisitos</b> ao selecionar um jogo da categoria single player mais recente que um antigo não encontrado!
      </p>
      <div class="flex justify-between w-full max-w-[1366px]">
        <ActionButton :to="{ name: 'ClientActivity' }" :isNext="false">
          Página Anterior
        </ActionButton>

        <ActionButton :to="{ name: 'ClientPCPartPicker' }" :isNext="true" :canNavigate="!isNextButtonDisabled">
          Próxima Página
        </ActionButton>
      </div>
    </HomeContentView>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActionButton from '@/components/ActionButton.vue';
import SoftwaresRow from '@/components/softwares/SoftwaresRow.vue';

export default {
  name: 'ClientSoftware',
  components: {
    HomeContentView,
    HomeMenu,
    HeaderRectanglesLarge,
    AppBreadcrumbs,
    ActionButton,
    SoftwaresRow,
  },
  data() {
    return {
      selectedTypes: [],
      isNextButtonDisabled: true, 
    };
  },
  created() {
    const savedTypes = Cookies.get('selectedActivities');
    if (savedTypes) {
      this.selectedTypes = JSON.parse(savedTypes);
    }
    this.checkSoftwareSelection();
  },
  watch: {
    selectedTypes() {
      this.checkSoftwareSelection(); 
    }
  },
  methods: {
    checkSoftwareSelection() {
      //TODO: Melhorar essa lógica e limpar
      const savedSoftwares = Cookies.get('selectedSoftwares');
      
      if (savedSoftwares && JSON.parse(savedSoftwares).length > 0) {
        this.isNextButtonDisabled = false;
      } else {
        this.isNextButtonDisabled = true;
      }
    },
    handleSoftwareSelection(selectedSoftwares) {
      Cookies.set('selectedSoftwares', JSON.stringify(selectedSoftwares));
      this.checkSoftwareSelection(); 
    }
  }
};
</script>

<style scoped></style>
