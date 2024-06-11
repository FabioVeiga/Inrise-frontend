<template>
  <div id="app" class="app">
    <AppSidebar></AppSidebar>
    <div class="main-content">
      <HomeContentView></HomeContentView>
    </div>
    <HomeImageView></HomeImageView>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue'
import HomeImageView from './components/HomeImageView.vue'
import AppFooter from './components/AppFooter.vue'
import HomeContentView from './components/HomeContentView.vue'

export default {
  name: 'App',
  components: {
    AppSidebar, 
    HomeImageView,
    AppFooter, 
    HomeContentView
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
}

.main-content {
  display: flex;
  flex: 1;
  overflow-x: hidden; /* Evita a rolagem horizontal */
}

/* Ajustes para a imageView */
.home-image-view {
  margin-left: auto; /* Alinha à direita da tela */
  flex-shrink: 0; /* Evita que a imagem seja reduzida para caber */
  width: 32vw; /* Define a largura desejada */
}
</style>
