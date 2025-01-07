<template>
    <div class="flex flex-row">
      <HomeContentView>
        <HomeMenu></HomeMenu>
  
        <HeaderRectanglesActivity></HeaderRectanglesActivity>
        <AppBreadcrumbs></AppBreadcrumbs>
        <p style="white-space: nowrap" class="text-3xl font-normal">
          Selecione as atividades de atuação do seu computador. <br> Você poderá escolher até três.
        </p>
  
        <ActivityTypes></ActivityTypes>
        <div class="flex justify-between w-full max-w-[1366px]">
          <!-- Previous Button -->
          <ActionButton :to="{ name: 'ClientActivity' }" :isNext="false">
            Página Anterior
          </ActionButton>
  
          <!-- Next Button -->
          <ActionButton :to="{ name: 'NextPage' }" :isNext="true">
            Próxima Página
          </ActionButton>
        </div>
      </HomeContentView>
    </div>
  </template>
  
  <script>
  import HomeContentView from '../components/HomeContentView.vue';
  import HomeMenu from '../components/HomeMenu.vue';
  import HeaderRectanglesActivity from '../components/HeaderRectanglesLarge.vue';
  import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
  import ActivityTypes from '@/components/ActivityTypes.vue';
  import ActionButton from '@/components/ActionButton.vue';
  
  export default {
    name: 'ClientSoftware',
    components: {
      HomeContentView,
      HomeMenu,
      HeaderRectanglesActivity,
      AppBreadcrumbs,
      ActivityTypes,
      ActionButton,
    },
  };
  </script>
  
  <style scoped></style>
  