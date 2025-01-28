<template>
    <div class="square p-8 w-1/3 flex flex-col justify-start items-center cursor-pointer" @click="toggleCheckbox">
        <div class="w-[196px] h-[140px] flex items-center justify-center overflow-hidden">
            <img :src="image" alt="Games" class="object-contain w-full h-auto">
        </div>

        <input type="checkbox" :id="value" :checked="selectedTypes.includes(value)" @click.stop="handleCheckboxClick"
            @change="handleCheckboxChange" class="mt-2 w-6 h-6">

        <div class="mt-2 flex flex-col items-center justify-start text-center w-full">
            <p
                class="text-xl font-bold leading-tight mt-2 mb-1 max-h-[2.4em] overflow-hidden text-ellipsis break-words text-center">
                {{ label.toUpperCase() }}</p>
            <p class="text-sm font-normal px-2 max-w-[200px] text-center">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActivityBox',
    props: {
        label: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        selectedTypes: {
            type: Array,
            required: true
        }
    },
    methods: {
        toggleCheckbox() {
            if (this.selectedTypes.includes(this.value)) {
                this.deselect();
            } else {
                this.select();
            }
        },
        handleCheckboxChange(event) {
            const isChecked = event.target.checked;
            let newSelectedTypes = [...this.selectedTypes];

            if (isChecked) {
                newSelectedTypes.push(this.value);
            } else {
                newSelectedTypes = newSelectedTypes.filter(type => type !== this.value);
            }

            this.$emit('update:selectedTypes', newSelectedTypes);
        },
        handleCheckboxClick(event) {
            event.stopPropagation();
        },
        select() {
            this.$emit('update:selectedTypes', [...this.selectedTypes, this.value]);
        },
        deselect() {
            this.$emit('update:selectedTypes', this.selectedTypes.filter(type => type !== this.value));
        }
    }
};
</script>
