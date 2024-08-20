<template>
  <div
    :class="['faq-card', { 'bg-[#BB59F9] text-white': isOpen, 'bg-white text-black': !isOpen }]"
    @click="toggle"
  >
    <div class="faq-header mt-8 flex justify-start items-center">
      <h3 :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-6xl font-medium">{{ number }}</h3>
      <h3 :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-3xl font-medium">{{ question }}</h3>
      <button
        class="toggle-btn"
        @click.stop="toggle"
      >
        {{ isOpen ? '-' : '+' }}
      </button> 
    </div>
    <transition name="fade">
      <p v-if="isOpen" :class="{'text-white': isOpen, 'text-black': !isOpen}" class="faq-description mt-4">{{ answer }}</p>
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
  };
  </script>
  
  <style scoped>
  .faq-card {
    cursor: pointer;
    padding: 20px;
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
    border: none;
    font-size: 1.5rem;
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
  