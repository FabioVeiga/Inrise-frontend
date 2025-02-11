<template>
    <div class="flex flex-col items-start">
        <select v-model="localSelectedPart" @change="handleSelectionChange" class="w-full p-2 border rounded">
            <option disabled value="">Escolha uma peça...</option>
            <option v-for="part in parts" :key="part.id" :value="part">
                {{ part.name }}
            </option>
        </select>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'PcMenu',
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
    setup(props, { emit }) {
        const localSelectedPart = ref(props.selectedParts[0] || null);
        const handleSelectionChange = () => {
            if (localSelectedPart.value) {
                const selectedPart = {
                    id: localSelectedPart.value.id,
                    value: localSelectedPart.value.valueClassification,
                    partType: props.partType,
                    name: localSelectedPart.value.name,
                    finalPrice: localSelectedPart.value.price.finalPrice
                };
                emit('update:selectedParts', selectedPart);
            }
        };

        const formatCurrency = (value) => {
            return value ? value.toLocaleString('pt', {
                style: 'currency',
                currency: 'EUR',
            }) : 'Preço não disponível';
        };

        return {
            localSelectedPart,
            handleSelectionChange,
            formatCurrency
        };
    }
};
</script>

<style scoped>
select {
    font-size: 1rem;
    border-radius: 8px;
    padding: 10px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
}

select:focus {
    outline: none;
    border-color: #3b82f6;
}
</style>
