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
        </HomeContentView>
    </div>
</template>

<script>
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesActivity from '../components/HeaderRectanglesActivity.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActivityTypes from '@/components/ActivityTypes.vue';

export default {
    name: 'ClientActivity',
    components: {
        HomeContentView,
        HomeMenu,
        HeaderRectanglesActivity,
        AppBreadcrumbs,
        ActivityTypes
    }
};
</script>

<style scoped></style>