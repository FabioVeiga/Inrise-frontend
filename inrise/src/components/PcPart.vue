<template>
    <div class="square p-8 w-[32%] flex flex-col justify-start items-center cursor-pointer" @click="toggleCheckbox">
        <div class="w-[196px] h-[96px] flex items-center justify-center overflow-hidden">
            <!-- Use the first image from the images array -->
            <img :src="images[0]?.url" :alt="name" class="object-contain w-full h-auto">
        </div>

        <!-- Checkbox for selecting parts -->
        <input type="checkbox" :id="value" :checked="isSelected" @click.stop="handleCheckboxClick"
            @change="handleCheckboxChange" class="mt-2 w-6 h-6">

        <!-- Display part name and price -->
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
            type: String,
            required: true
        },
        selectedParts: {
            type: Array,
            required: true
        },
        partType: {
            type: String,
            required: true
        }
    },
    mounted(){
        console.log(`Images for ${this.name}:`, this.images);
    },
    computed: {
        isSelected() {
            return this.selectedParts.some(part => part.value === this.value);
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
            if (this.isSelected) {
                this.deselect();
            } else {
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
            const newSelectedParts = this.selectedParts.filter(part => part.partType !== this.partType);
            newSelectedParts.push({ value: this.value, partType: this.partType });

            this.$emit('update:selectedParts', newSelectedParts);

            this.saveToCookies(newSelectedParts);
        },
        deselect() {
            const newSelectedParts = this.selectedParts.filter(part => part.value !== this.value);

            this.$emit('update:selectedParts', newSelectedParts);

            this.saveToCookies(newSelectedParts);
        },
        saveToCookies(selectedParts) {
            this.$cookies.set('selectedPcParts', selectedParts, { path: '/' });
        }
    }
};
</script>

<style scoped>
.square {
    transition: transform 0.3s ease;
}

.square:hover {
    transform: scale(1.05);
}

input[type="checkbox"] {
    transition: transform 0.2s ease;
}

input[type="checkbox"]:checked {
    transform: scale(1.2);
}
</style>