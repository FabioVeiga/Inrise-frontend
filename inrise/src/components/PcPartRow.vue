<template>
    <div class="flex flex-wrap justify-start gap-4">
        <!-- Loop through a slice of the parts array to render a maximum of 3 objects -->
        <PcPart v-for="(part, index) in parts.slice(0, 3)" :key="index" :name="part.name" :images="part.images"
            :value="part.valueClassification" :price="part.price" :id="part.id" :selectedPart="localSelectedPart" :partType="partType"
            @update:selectedPart="updateSelectedPart" />
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
    data() {
        return {
            localSelectedPart: this.selectedParts[0] || null,  
        };
    },
    methods: {
        updateSelectedPart(updatedPart) {
            console.log('Part selected in PcPartRow:', updatedPart);  
            this.localSelectedPart = updatedPart;
            this.$emit('update:selectedParts', updatedPart);

            console.log('Updated localSelectedPart in PcPartRow:', this.localSelectedPart);
        }

    },
    watch: {
        selectedParts(newVal) {
            this.localSelectedPart = newVal[0] || null;
        }
    }
};
</script>