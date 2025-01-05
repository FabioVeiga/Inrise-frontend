<template>
  <div class="flex items-center space-x-6">
    <!-- Step 1: Client Activity -->
    <div class="flex flex-col items-center space-y-2 cursor-default">
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center"
        :class="{'bg-blue-600 text-white': isActiveStep(1), 'border-2 border-blue-600': !isActiveStep(1)}"
      ></div>
      <span :class="{'text-blue-600': isActiveStep(1)}">Computadores</span>
    </div>
    
    <!-- Line between steps -->
    <div v-if="isActiveStep(1)" class="h-1 w-16 bg-blue-600"></div>

    <!-- Step 2: Escolha a Atividade -->
    <div class="flex flex-col items-center space-y-2 cursor-default">
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center"
        :class="{'bg-blue-600 text-white': isActiveStep(2), 'border-2 border-blue-600': !isActiveStep(2)}"
      ></div>
      <span :class="{'text-blue-600': isActiveStep(2)}">Escolha a Atividade</span>
    </div>
    
    <!-- Line between steps -->
    <div v-if="isActiveStep(2)" class="h-1 w-16 bg-blue-600"></div>

    <!-- Step 3: Final Step -->
    <div class="flex flex-col items-center space-y-2 cursor-default">
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center"
        :class="{'bg-blue-600 text-white': isActiveStep(3), 'border-2 border-blue-600': !isActiveStep(3)}"
      ></div>
      <span :class="{'text-blue-600': isActiveStep(3)}">Passo Final</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBreadcrumbs',
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    isActiveStep(stepNumber) {
      const stepNames = ['ClientActivity', 'ClientActivityStep2', 'ClientActivityStep3'];
      return this.currentRouteName === stepNames[stepNumber - 1];
    }
  }
};
</script>

<style scoped>
/* Step ball sizes */
.w-8 {
  width: 2rem;
}
.h-8 {
  height: 2rem;
}
.bg-blue-600 {
  background-color: #3182ce;
}
.text-white {
  color: white;
}
.border-blue-600 {
  border-color: #3182ce;
}
.text-blue-600 {
  color: #3182ce;
}

/* Line between balls */
.h-1 {
  height: 0.25rem;
}
.w-16 {
  width: 4rem;
}
</style>
