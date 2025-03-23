<template>
    <div class="square p-8 w-[32%] flex flex-col justify-start items-center cursor-pointer" @click="toggleCheckbox">
        <div class="relative w-[196px] h-[96px] flex items-center justify-center overflow-hidden">
            <!-- Information Icon -->
            <button type="button" @click.stop="openModal"
                class="absolute top-1 right-1 bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition">
                ℹ️
            </button>

            <img :src="images[0]?.url" :alt="name" class="object-contain w-full h-auto">
        </div>

        <!-- Checkbox -->
        <input type="checkbox" :id="value" :checked="isSelected" @click.stop="handleCheckboxClick"
            @change="handleCheckboxChange" class="mt-2 w-6 h-6">

        <!-- Name and price -->
        <p class="text-2xl font-bold my-2">{{ name.toUpperCase() }}</p>
        <!--<p class="text-lg font-semibold">{{ formatCurrency(price.finalPrice) }}</p>-->

        <!-- Markdown Modal -->
        <MarkdownModal :isVisible="showModal" :markdownContent="description" @close="closeModal" />
    </div>
</template>

<script>
import MarkdownModal from '@/components/MarkdownModal.vue'; // Ensure the correct path

export default {
    name: 'PcPart',
    components: {
        MarkdownModal,
    },
    props: {
        name: { type: String, required: true },
        images: { type: Array, required: true },
        value: { type: String, required: true },
        price: { type: Object, required: true },
        description: { type: String, required: true },
        id: { type: Number, required: true },
        selectedPart: { type: Object, required: true },
        partType: { type: String, required: true },
        valueClassification: { type: Number, required: true }
    },
    data() {
        return {
            showModal: false,
        };
    },
    computed: {
        isSelected() {
            return this.selectedPart?.id === this.id;
        }
    },
    methods: {
        toggleCheckbox() {
            if (this.isSelected) {
                this.deselect();
            } else {
                this.select();
            }
        },
        handleCheckboxChange(event) {
            event.target.checked ? this.select() : this.deselect();
        },
        handleCheckboxClick(event) {
            event.stopPropagation();
        },
        select() {
            this.$emit('update:selectedPart', {
                id: this.id,
                value: this.value,
                partType: this.partType,
                name: this.name,
                finalPrice: this.price.finalPrice,
            });
        },
        deselect() {
            this.$emit('update:selectedPart', { id: null, value: "", partType: "", name: "", finalPrice: 0 });
        }
        ,
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    }
};
</script>
