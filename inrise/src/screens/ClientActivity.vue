<template>
    <div class="flex flex-row">
        <HomeContentView>
            <HomeMenu></HomeMenu>

            <HeaderRectanglesLarge>
                <p class="whitespace-nowrap">ESCOLHA A ATIVIDADE <br> DO SEU COMPUTADOR</p>
            </HeaderRectanglesLarge>
            <AppBreadcrumbs></AppBreadcrumbs>
            <p style="white-space: nowrap" class="text-3xl font-normal">
                Selecione as atividades de atuação do seu computador. <br> Você poderá escolher até três.
            </p>

            <ActivityTypes @type-selected="handleSelection" />
            <div class="flex justify-between w-full max-w-[1366px]">
                <ActionButton :to="{ name: 'ClientComputers' }" :isNext="false">
                    Página Anterior
                </ActionButton>
                <ActionButton :to="{ name: 'ClientSoftware' }" :isNext="true" :canNavigate="!isNextButtonDisabled">
                    Próxima Página
                </ActionButton>
            </div>
        </HomeContentView>
    </div>
</template>

<script>
import HomeContentView from '../components/HomeContentView.vue';
import HomeMenu from '../components/HomeMenu.vue';
import HeaderRectanglesLarge from '../components/HeaderRectanglesLarge.vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue';
import ActivityTypes from '@/components/ActivityTypes.vue';
import ActionButton from '@/components/ActionButton.vue';
import Cookies from 'js-cookie';

export default {
    name: 'ClientActivity',
    components: {
        HomeContentView,
        HomeMenu,
        HeaderRectanglesLarge,
        AppBreadcrumbs,
        ActivityTypes,
        ActionButton
    },
    data() {
        return {
            selectedTypes: [],
            isNextButtonDisabled: true
        };
    },
    methods: {
        handleSelection(selectedTypes) {
            this.selectedTypes = selectedTypes;
            Cookies.set('selectedActivities', JSON.stringify(this.selectedTypes));
            this.isNextButtonDisabled = !selectedTypes || selectedTypes.length === 0;
        }
    },
    created() {
        const savedTypes = Cookies.get('selectedActivities');
        if (savedTypes) {
            this.selectedTypes = JSON.parse(savedTypes);
            this.isNextButtonDisabled = this.selectedTypes.length === 0;
        }
    }
};
</script>

<style scoped></style>
