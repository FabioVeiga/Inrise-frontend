<template>
    <div class="flex flex-wrap justify-start gap-4">
        <!-- Loop through a slice of the parts array to render a maximum of 3 objects -->
        <PcPart 
            v-for="(part, index) in parts.slice(0, 3)" 
            :key="index" 
            :name="part.name" 
            :images="part.images"
            :value="part.valueClassification" 
            :price="part.price" 
            :selectedParts="localSelectedParts" 
            :partType="partType"
            @update:selectedParts="updateSelectedParts" 
        />
    </div>
</template>

<script>
// Import cookies (js-cookie library)
import Cookies from 'js-cookie';
import PcPart from './PcPart.vue';

export default {
    name: 'PcPartRow',
    components: {
        PcPart
    },
    props: {
        partType: {  // Part Type (e.g., 'CPU', 'GPU', 'RAM')
            type: String,
            required: true
        },
        parts: {  // Array of parts to display in this row
            type: Array,
            required: true
        },
        selectedParts: {  // Currently selected parts from the parent
            type: Array,
            required: true
        }
    },
    data() {
        return {
            localSelectedParts: [...this.selectedParts]  // Create a local copy of selectedParts
        };
    },
    created() {
        // Load selected parts from cookies if they exist
        const savedParts = Cookies.get('selectedPcParts');
        if (savedParts) {
            // Parse the cookie and ensure the object is clean (not proxied)
            try {
                this.localSelectedParts = JSON.parse(savedParts);
            } catch (e) {
                console.error("Error parsing cookie data:", e);
            }
        }
    },
    methods: {
        updateSelectedParts(updatedParts) {
            const cleanParts = JSON.parse(JSON.stringify(updatedParts)); // Deep copy to avoid proxies

            // Update the local selected parts array
            this.localSelectedParts = cleanParts;

            // Emit the updated parts to the parent component
            this.$emit('update:selectedParts', cleanParts);

            // Save the updated selected parts to cookies
            Cookies.set('selectedPcParts', JSON.stringify(cleanParts), { path: '/' });
        }
    }
};
</script>
