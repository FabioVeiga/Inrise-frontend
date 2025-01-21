<template>
    <div class="flex flex-wrap justify-start gap-4">
        <PcPart v-for="(part, index) in parts.slice(0, 3)" :key="index" :name="part.name" :images="part.images"
            :value="part.valueClassification" :price="part.price" :selectedParts="selectedParts" :partType="partType"
            @update:selectedParts="updateSelectedParts" />
    </div>
</template>


<script>
import PcPart from './PcPart.vue';

export default {
    name: 'PcPartRow',
    components: {
        PcPart
    },
    props: {
        partType: {  
            type: String,
            required: true
        },
        parts: { 
            type: Array,
            required: true
        },
        selectedParts: { 
            type: Array,
            required: true
        }
    },
    mounted(){
        console.log("PArtsrow",this.parts)
    },
    methods: {
        updateSelectedParts(updatedParts) {
            this.$emit('update:selectedParts', updatedParts);
        }
    }
};
</script>