<template>
    <div>
        <div class="flex flex-wrap justify-start gap-4">
            <PcPart v-for="(part, index) in currentParts" :key="index" :name="part.name" :images="part.images"
                :value="part.valueClassification" :price="part.price" :id="part.id" :selectedPart="localSelectedPart"
                :partType="partType" @update:selectedPart="updateSelectedPart" />
        </div>

        <div class="flex justify-between mt-4">
            <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded" @click="prevSlide">
                Anterior
            </button>
            <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded" @click="nextSlide">
                Próximo
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

<style scoped>
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>