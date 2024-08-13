<template>
    <div id="client-home" class="app">
      <AppSidebar></AppSidebar>
      
      <div class="main-content">
        <HomeContentView>
          <HomeMenu></HomeMenu>
          <HeaderRectangles></HeaderRectangles>
          <p style="white-space: nowrap" class='customize'>Customize o computador do seu jeito <br> e a InRise monta e leva até você!</p>
          <HomeSteps></HomeSteps>
          <HomeLargeButton></HomeLargeButton>
          <HomeTextHeader text="Ver computadores prontos"></HomeTextHeader>
        </HomeContentView>
        <HomeImageView></HomeImageView>
      </div>
      
      <AppFooter></AppFooter>
    </div>
  </template>
  
  <script>
  import AppSidebar from '../components/AppSidebar.vue';
  import HomeImageView from '../components/HomeImageView.vue';
  import AppFooter from '../components/AppFooter.vue';
  import HomeContentView from '../components/HomeContentView.vue';
  import HeaderRectangles from '../components/HeaderRectangles.vue';
  import HomeMenu from '../components/HomeMenu.vue';
  import HomeSteps from '../components/HomeSteps.vue';
  import HomeLargeButton from '../components/HomeLargeButton.vue';
  import HomeTextHeader from '../components/HomeTextHeader.vue';
  
  export default {
    name: 'ClientHome',
    components: {
      AppSidebar, 
      HomeImageView,
      AppFooter, 
      HomeContentView,
      HeaderRectangles,
      HomeMenu,
      HomeSteps,
      HomeLargeButton,
      HomeTextHeader
    }
  }
  </script>
  
<style scoped>

body{
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}


.customize{
  font-size: 30px;
  font-weight: 400;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter';  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.main-content {
  display: flex;
  flex: 1;
  overflow-x: hidden; 
}

.home-image-view {
  margin-left: auto; 
  flex-shrink: 0; 
  width: 32vw; 
}  
</style>
  