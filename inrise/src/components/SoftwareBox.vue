<template>
    <div class="software-box p-4 w-1/3 flex flex-col justify-start items-center cursor-pointer" @click="toggleCheckbox">
      <div class="software-image w-[196px] h-[140px] flex items-center justify-center overflow-hidden">
        <img :src="image" alt="Software Image" class="object-contain w-full h-auto" />
      </div>
  
      <input type="checkbox" :id="value" :checked="selectedTypes.includes(value)" @click.stop="handleCheckboxClick"
             @change="handleCheckboxChange" class="mt-2 w-6 h-6">
  
      <div class="software-info mt-2 flex flex-col items-center justify-start text-center w-full">
        <p class="text-xl font-bold">{{ label }}</p>
        <p class="text-sm font-normal">{{ description }}</p>
        <p class="text-sm font-normal text-gray-500">{{ gpuInfo }}</p> <!-- GPU info here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SoftwareBox',
    props: {
      label: String,
      image: String,
      description: String,
      value: String,
      selectedTypes: Array,
      minimumGPU: String,
      idealGPU: String,  
    },
    computed: {
      gpuInfo() {
        return this.idealGPU
          ? `Ideal GPU: ${this.idealGPU}`
          : this.minimumGPU
          ? `Minimum GPU: ${this.minimumGPU}`
          : '';
      },
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
  .software-box {
    transition: transform 0.3s ease;
  }
  
  .software-box:hover {
    transform: scale(1.05);
  }
  
  input[type="checkbox"]:checked {
    transform: scale(1.2);
  }
  </style>
  