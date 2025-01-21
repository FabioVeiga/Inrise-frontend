<template>
  <div id="client-home" class="flex flex-col h-auto p-0 m-0">
    <AppSidebar></AppSidebar>

    <div class="main-content flex-1 overflow-visible p-0 m-0">
      <router-view />
    </div>

  </div>
  <AppFooter></AppFooter>
  <LowerFooter></LowerFooter>

</template>

<script>
import AppSidebar from '../components/AppSidebar.vue';
import AppFooter from '../components/AppFooter.vue';
import LowerFooter from '@/components/LowerFooter.vue';

export default {
  name: 'ClientHome',
  components: {
    AppSidebar,
    AppFooter,
    LowerFooter
  }
};
</script>

