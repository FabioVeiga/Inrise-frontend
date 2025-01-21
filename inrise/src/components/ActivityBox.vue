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

<style scoped>
.square {
    transition: transform 0.3s ease;
}

.square:hover {
    transform: scale(1.05)
}

input[type="checkbox"] {
    transition: transform 0.2s ease;
}

input[type="checkbox"]:checked {
    transform: scale(1.2);
}

.square {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.square:hover {
    transform: scale(1.05);
}

.image-container {
    flex-shrink: 0;
}

.content-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
}

.label {
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    line-height: 1.2em;
    max-height: 2.4em;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.5rem 0;
}

.description {
    line-height: 1.5;
    max-width: 200px;
    text-align: center;
}
</style>