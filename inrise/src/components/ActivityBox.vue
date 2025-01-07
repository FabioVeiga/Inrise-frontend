<template>
    <div 
      class="square p-8 w-1/3 flex flex-col items-center cursor-pointer"
      @click="toggleCheckbox"
    >
      <img :src="require(`@/assets/client/${image}`)" alt="Games" class="w-auto h-auto object-fill">
      <input 
        type="checkbox" 
        :id="value" 
        :checked="selectedTypes.includes(value)"
        @click.stop="handleCheckboxClick"
        @change="handleCheckboxChange"
        class="mt-2 w-6 h-6"
      >
      
      <p class="text-2xl font-bold my-2">{{ label.toUpperCase() }}</p>
      <p class="text-sm font-normal px-16 text-center">{{ description }}</p>
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
  </style>
  