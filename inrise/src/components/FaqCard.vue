<template>
    <div
      :class="['faq-card', { 'bg-[#BB59F9] text-white': isOpen, 'bg-white text-black': !isOpen }]"
      @click="toggle"
    >
      <div class="faq-header my-[41px] ml-[60px] flex justify-between items-center">
        <div class="flex items-center">
          <h3 :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-6xl font-medium mr-[25px]">{{ number }}</h3>
          <h3 :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-3xl font-medium">{{ question }}</h3>
        </div>
        <button
          class="toggle-btn mx-[60px]"
          @click.stop="toggle"
        >
          {{ isOpen ? '-' : '+' }}
        </button> 
      </div>
      <transition name="fade">
        <div class="mx-[60px]">
            <div v-if="isOpen" class="separator h-[2px] my-[30px] bg-gray-300"></div>
        </div>
       </transition>

      <transition name="fade">
        <p v-if="isOpen" :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-lg font-normal mb-[30px] mx-[60px]">{{ answer }}</p>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      number: String,
      question: String,
      answer: String
    },
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
      formatNumber(num) {
        return num < 10 ? `0${num}` : `${num}`;
      }
    }
  }
  </script>
  
  <style scoped>
  .faq-card {
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 45px;
    border: solid 1px;
    border-bottom-width: 5px;
    border-color: black;
    width: 1234px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .toggle-btn {
  background: none;
  border: solid 1px black;
  width: 58px;
  height: 58px;
  border-radius: 50%; 
  font-size: 46px; 
  font-weight: 800;
  background-color: white;
  color: black; 
  display: flex;
  align-items: center;
  justify-content: center; 
  cursor: pointer;
  outline: none;
}
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  