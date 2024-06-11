<template>
  <div id="app" class="app">
    <AppSidebar></AppSidebar>
    
    <div class="main-content">
      <HomeContentView>
        <HelloWorld></HelloWorld>
      </HomeContentView>
      <HomeImageView></HomeImageView>
    </div>
    
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue'
import HomeImageView from './components/HomeImageView.vue'
import AppFooter from './components/AppFooter.vue'
import HomeContentView from './components/HomeContentView.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    AppSidebar, 
    HomeImageView,
    AppFooter, 
    HomeContentView,
    HelloWorld
  }
}
</script>

<style>
body{
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif; /* Use a fonte customizada */
  margin: 0;
  padding: 0;
}



#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter'; /* Use a fonte customizada */  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
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
