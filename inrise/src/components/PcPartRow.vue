<template>
    <div class="relative">
        <div class="flex">
            <button type="button"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-gray-800 border-2 border-gray-800 rounded-full w-12 h-12 focus:outline-none bg-white hover:bg-gray-100"
                @click="prevSlide">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="flex flex-wrap justify-between w-[100%] px-20">
                <PcPart v-for="(part, index) in currentParts" :key="index" :name="part.name" :images="part.images"
                    :value="part.valueClassification" :price="part.price" :id="part.id"
                    :selectedPart="localSelectedPart" :partType="partType" @update:selectedPart="updateSelectedPart" />
            </div>

            <button type="button"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-gray-800 border-2 border-gray-800 rounded-full w-12 h-12 focus:outline-none hover:bg-gray-100"
                @click="nextSlide">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script>
import PcPart from './PcPart.vue';

export default {
    name: 'PcPartRow',
    components: {
        PcPart,
    },
    props: {
        partType: {
            type: String,
            required: true,
        },
        parts: {
            type: Array,
            required: true,
        },
        selectedParts: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            localSelectedPart: this.selectedParts[0] || null,
            currentIndex: 0,
        };
    },
    computed: {
        currentParts() {
            return this.parts.slice(this.currentIndex, this.currentIndex + 3);

            /*@TODO: Tomando um undefined se vier a partir da pagina anterior com o codigo abaixo,
            mas ele funciona normalmente se eu so der f5
            currentParts() {
            
            return [
                this.parts[this.currentIndex],
                this.parts[(this.currentIndex + 1) % this.parts.length],
                this.parts[(this.currentIndex + 2) % this.parts.length]
            ];
        }, */
        },
    },
    methods: {
        updateSelectedPart(updatedPart) {
            this.localSelectedPart = updatedPart;
            this.$emit('update:selectedParts', updatedPart);
        },
        prevSlide() {
            if (this.currentIndex === 0) {
                this.currentIndex = this.parts.length - 3; //-2
            } else {
                this.currentIndex -= 1;
            }
        },
        nextSlide() {
            if (this.currentIndex + 3 >= this.parts.length) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }
        },
    },
    watch: {
        selectedParts(newVal) {
            this.localSelectedPart = newVal[0] || null;
        },
    },
};
</script>
