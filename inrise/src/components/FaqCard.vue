<template>
  <div
    :class="[
      'faq-card',
      {
        'bg-[#BB59F9] text-white': isOpen,
        'bg-white text-black': !isOpen
      }
    ]"
    @click="toggle"
  >
    <div class="faq-header my-[20px] sm:my-[30px] md:my-[41px] sm:ml-[20px] md:ml-[60px] mx-4 flex justify-between items-center">
      <div class="flex items-center">
        <h3 :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-2xl sm:text-3xl md:text-6xl font-medium mr-[15px] sm:mr-[20px] md:mr-[25px]">{{ number }}</h3>
        <h3 :class="{'text-white': isOpen, 'text-black': !isOpen}" class="text-sm sm:text-lg md:text-3xl font-medium">{{ question }}</h3>
      </div>
      <button
        class="toggle-btn mx-[20px] sm:mx-[30px] md:mx-[60px] border border-black w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[58px] md:h-[58px] rounded-full text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-white text-black flex items-center justify-center cursor-pointer"
        @click.stop="toggle"
      >
        {{ isOpen ? '-' : '+' }}
      </button>
    </div>

    <transition name="fade">
      <div class="mx-[20px] sm:mx-[30px] md:mx-[60px]">
        <div v-if="isOpen" class="separator h-[2px] my-[15px] sm:my-[20px] md:my-[30px] bg-gray-300"></div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isOpen"
        :class="{'text-white': isOpen, 'text-black': !isOpen}"
        class="text-xs sm:text-sm md:text-lg font-normal mb-[15px] sm:mb-[20px] md:mb-[30px] mx-[20px] sm:mx-[30px] md:mx-[60px] transition-all duration-300 ease-in-out"
        v-html="answer"
      ></div>
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
  @apply cursor-pointer mb-2 rounded-[45px] border border-black border-b-4 w-full max-w-[350px] lg:max-w-[1234px] transition-colors ease-in-out duration-300;
  border-radius: 1.5rem;
}

.toggle-btn {
  @apply bg-none border border-black w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[58px] md:h-[58px] rounded-full text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-white text-black flex items-center justify-center cursor-pointer outline-none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
