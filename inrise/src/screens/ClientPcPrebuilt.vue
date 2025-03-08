<template>
    <div class="flex flex-row">
        <HomeContentView>
            <HomeMenu></HomeMenu>

            <HeaderRectanglesLarge>
                <p class="whitespace-nowrap">ESCOLHA <br> A SUA MÁQUINA</p>
            </HeaderRectanglesLarge>

            <div class="flex flex-wrap justify-start gap-6 p-12">
                <div v-if="loading" class="text-center text-xl text-gray-500">
                    <p>Carregando peças...</p>
                </div>
                <PcProductCard v-for="(product, index) in products" :key="index" :productName="product.name" 
                    :productDescription="product.description" :productImage="product.images[0]?.url" :productPrice="product.price.finalPrice"/>
            </div>

            <div class="flex justify-between w-full max-w-[1366px]">
                <ActionButton :to="{ name: 'PreviousPage' }" :isNext="false">
                    Página Anterior
                </ActionButton>
                <ActionButton :to="{ name: 'NextPage' }" :isNext="true" :canNavigate="!isNextButtonDisabled">
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
import ActionButton from '@/components/ActionButton.vue';
import PcProductCard from '@/components/PcProductCard.vue';
import { fetchAllMonitor } from '@/api';

export default {
    name: 'ClientPcPrebuilt',
    components: {
        HomeContentView,
        HomeMenu,
        HeaderRectanglesLarge,
        AppBreadcrumbs,
        ActionButton,
        PcProductCard
    },
    data() {
        return {
            products: [],
            loading:false,
            isNextButtonDisabled: true
        };
    },
    async created() {
        this.loading = true;
        try {
            const response = await fetchAllMonitor();
            console.log("Resp", response)
            this.products = response.data.items;
        } catch (error) {
            alert('Erro  :', error);
        } finally {
            this.loading = false;
        }
    }
};
</script>
