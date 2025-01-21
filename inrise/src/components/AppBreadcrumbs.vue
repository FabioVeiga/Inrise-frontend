<template>
  <div class="relative min-w-[800px] my-12 flex justify-between items-center">
    <!-- Line behind steps -->
    <div class="absolute inset-0 mb-14 flex justify-center items-center z-0">
      <div class="h-1 w-[33%] bg-gray-500"></div>
      <div class="h-1 w-[33%] bg-gray-500"></div>
    </div>

    <!-- Step 1: Client Activity -->
    <div class="flex flex-col items-center w-[33%] space-y-2 cursor-default z-10 mx-12">
      <div 
        class="w-8 h-8  rounded-full flex items-center justify-center"
        :class="{'bg-blue-600 text-white': isActiveStep(1), 'border-2 border-blue-600 bg-white': !isActiveStep(1)}"
      ></div>
      <span class="max-w-[200px]" :class="{'text-blue-600': isActiveStep(1)}">Selecione a atividade do seu computador </span>
    </div>
    
    <!-- Step 2: Escolha a Atividade -->
    <div class="flex flex-col items-center w-[33%] space-y-2 cursor-default z-10 mx-12">
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center"
        :class="{'bg-blue-600 text-white': isActiveStep(2), 'border-2 border-blue-600 bg-white': !isActiveStep(2)}"
      ></div>
      <span class="max-w-[200px]" :class="{'text-blue-600': isActiveStep(2)}">Selecione os softwares que pretende usar</span>
    </div>
    
    <!-- Step 3: Final Step -->
    <div class="flex flex-col items-center w-[33%] space-y-2 cursor-default z-10 mx-12">
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center"
        :class="{'bg-blue-600 text-white': isActiveStep(3), 'border-2 border-blue-600 bg-white': !isActiveStep(3)}"
      ></div>
      <span class="max-w-[200px]" :class="{'text-blue-600': isActiveStep(3)}">Monte e compre seu próximo computador</span>
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
      const stepNames = ['ClientActivity', 'ClientSoftware', 'ClientPCPartPicker'];
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
