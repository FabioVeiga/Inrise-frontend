<template>
    <div class="square p-8 w-[32%] flex flex-col justify-start items-center cursor-pointer" @click="toggleCheckbox">
        <div class="w-[196px] h-[96px] flex items-center justify-center overflow-hidden">
            <img :src="images[0]?.url" :alt="name" class="object-contain w-full h-auto">
        </div>

        <!-- Checkbox -->
        <input type="checkbox" :id="value" :checked="isSelected" @click.stop="handleCheckboxClick"
            @change="handleCheckboxChange" class="mt-2 w-6 h-6">

        <!-- Name and price -->
        <p class="text-2xl font-bold my-2">{{ name.toUpperCase() }}</p>
        <p class="text-lg font-semibold">{{ formatCurrency(price.finalPrice) }}</p>
    </div>
</template>

<script>
export default {
    name: 'PcPart',
    props: {
        name: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        price: {
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        selectedPart: {
            type: Object,
            required: true
        },
        partType: {
            type: String,
            required: true
        },
        valueClassification: {
            type: Number,
            required: true
        }
    },
    computed: {
        isSelected() {
            return this.selectedPart?.id === this.id;
        }
    },
    methods: {
        formatCurrency(value) {
            return value ? value.toLocaleString('pt', {
                style: 'currency',
                currency: 'EUR',
            }) : 'Preço não disponível';
        },
        toggleCheckbox() {
            console.log(`Toggling checkbox for part: ${this.name}`);
            if (this.isSelected) {
                console.log(`${this.name} is already selected. Deselecting...`);
                this.deselect();
            } else {
                console.log(`${this.name} is not selected. Selecting...`);
                this.select();
            }
        },
        handleCheckboxChange(event) {
            const isChecked = event.target.checked;
            if (isChecked) {
                this.select();
            } else {
                this.deselect();
            }
        },
        handleCheckboxClick(event) {
            event.stopPropagation();
        },
        select() {
            const selectedPart = {
                id: this.id,
                value: this.value,
                partType: this.partType,
                name: this.name,
                finalPrice: this.price.finalPrice,
            };
            this.$emit('update:selectedPart', selectedPart);
        },
        deselect() {
            this.$emit('update:selectedPart', null);
        }
    }
};
</script>
