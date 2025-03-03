<template>
    <div class="pc-card" @click="navigateToPCTypePage"
        :class="{ 'cursor-pointer': true, 'border-2': true, 'rounded-md': true, 'p-4': true, 'transition-all': true, 'hover:shadow-lg': true, 'hover:bg-gray-200': true, [pcTypeClass]: true }">

        <div class="image-container">
            <img :src="imageSrc" alt="PC Type Image" class="pc-image" />
        </div>

        <div class="pc-specs text-center mt-2">
            <p class="text-lg font-semibold">{{ pcType }}</p>
            <p class="text-sm">{{ pcSpecs[pcType] }}</p>
        </div>
    </div>
</template>

<script>
import passo3 from '@/assets/passo3.png';

export default {
    props: {
        pcType: {
            type: String,
            required: true
        },
        routeName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            imageSrc: passo3,
            pcSpecs: {
                Low: 'Computadores Básicos',
                Med: 'Computadores Medianos',
                High: 'Computadores de alta performance',
                Ultra: 'Computadores de topo de linha'
            }
        };
    },
    computed: {
        pcTypeClass() {
            switch (this.pcType) {
                case 'Low':
                    return 'bg-green-100';
                case 'Med':
                    return 'bg-yellow-100';
                case 'High':
                    return 'bg-blue-100';
                case 'Ultra':
                    return 'bg-red-100';
                default:
                    return '';
            }
        }
    },
    methods: {
        navigateToPCTypePage() {
            this.$router.push({ name: this.routeName, params: { pcType: this.pcType } });
        }
    }
};
</script>

<style scoped>
.pc-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    border-radius: 8px;
    padding: 10px;
    transition: all 0.3s ease;
}

.image-container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pc-image {
    width: auto;
    height: 80%;
    max-height: 80px;
}

.pc-specs {
    margin-top: 8px;
}

.pc-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pc-card.bg-green-100 {
    background-color: #d1fae5;
}

.pc-card.bg-yellow-100 {
    background-color: #fef08a;
}

.pc-card.bg-blue-100 {
    background-color: #bfdbfe;
}

.pc-card.bg-red-100 {
    background-color: #fecaca;
}
</style>
