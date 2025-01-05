<template>
    <div class="flex justify-center space-x-8">
      <!-- Games Box -->
      <div 
        class="square p-8 w-1/3 flex flex-col items-center cursor-pointer"
        @click="toggleCheckbox('Games')"
      >
        <img src="@/assets/client/passo1.png" alt="Games" class="w-auto h-auto object-fill">
        <input 
          type="checkbox" 
          id="games" 
          v-model="selectedTypes"
          value="Games" 
          @change="updateSelection"
          class="mt-2 w-6 h-6"
        >
        <p class="text-2xl font-bold my-2">JOGOS</p>
        <p class="text-sm font-normal px-16 text-center">Selecione a finalidade do seu computador entre jogos, trabalho ou estudo</p>
      </div>
  
      <!-- Work Box -->
      <div 
        class="square p-8 w-1/3 flex flex-col items-center cursor-pointer"
        @click="toggleCheckbox('Work')"
      >
        <img src="@/assets/client/passo2.png" alt="Work" class="w-auto h-auto object-fill">
        <input 
          type="checkbox" 
          id="work" 
          v-model="selectedTypes"
          value="Work" 
          @change="updateSelection"
          class="mt-2 w-6 h-6"
        >
        <p class="text-2xl font-bold my-2">TRABALHO</p>
        <p class="text-sm font-normal px-16 text-center">Escolha os programas que pretende usar no seu computador</p>
      </div>
  
      <!-- Casual Box -->
      <div 
        class="square p-8 w-1/3 flex flex-col items-center cursor-pointer"
        @click="toggleCheckbox('Casual')"
      >
        <img src="@/assets/client/passo3.png" alt="Casual" class="w-auto h-auto object-fill">
        <input 
          type="checkbox" 
          id="casual" 
          v-model="selectedTypes"
          value="Casual" 
          @change="updateSelection"
          class="mt-2 w-6 h-6"
        >
        <p class="text-2xl font-bold my-2">CASUAL</p>
        <p class="text-sm font-normal px-16 text-center">Monte e compre seu futuro computador com a InRise!</p>
      </div>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  
  export default {
    name: 'ActivityTypes',
    data() {
      return {
        selectedTypes: []
      };
    },
    created() {
      const savedTypes = Cookies.get('selectedActivities');
      console.log("Saved Types from Cookie:", savedTypes);
      if (savedTypes) {
        this.selectedTypes = JSON.parse(savedTypes);
      }
    },
    methods: {
      toggleCheckbox(type) {
        const index = this.selectedTypes.indexOf(type);
        if (index > -1) {
          this.selectedTypes.splice(index, 1);
        } else {
          this.selectedTypes.push(type);
        }
        this.updateSelection();
      },
      updateSelection() {
        this.$emit('software-selected', this.selectedTypes);    
        Cookies.set('selectedActivities', JSON.stringify(this.selectedTypes));
        console.log("Updated Cookies:", Cookies.get('selectedActivities'));
      }
    }
  }
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
  