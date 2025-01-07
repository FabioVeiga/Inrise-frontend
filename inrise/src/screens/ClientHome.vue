<template>
  <div id="client-home" class="flex flex-col h-screen p-0 m-0">
    <AppSidebar></AppSidebar>

    <div class="main-content flex-1 overflow-hidden p-0 m-0">
      <router-view />
    </div>

  </div>
  <AppFooter></AppFooter>

</template>

<script>
import AppSidebar from '../components/AppSidebar.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'ClientHome',
  components: {
    AppSidebar,
    AppFooter
  }
};
</script>

