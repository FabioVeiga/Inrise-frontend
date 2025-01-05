<template>
  <nav class="flex justify-center py-2">
    <ul class="flex list-none p-0 m-0">
      <li class="relative mx-4" :class="{ 'active': activeTab === 'computadores' }">
        <a @click="changeTab('computadores')" class="relative block py-1 text-2xl font-semibold text-black hover:after:w-full hover:after:left-0">COMPUTADORES</a>
      </li>
      <li class="relative mx-4" :class="{ 'active': activeTab === 'perifericos' }">
        <a @click="changeTab('perifericos')" class="relative block py-1 text-2xl font-semibold text-black hover:after:w-full hover:after:left-0">PERIFÉRICOS</a>
      </li>
      <li class="relative mx-4" :class="{ 'active': activeTab === 'sac' }">
        <a @click="changeTab('sac')" class="relative block py-1 text-2xl font-semibold text-black hover:after:w-full hover:after:left-0">SAC</a>
      </li>
      <li class="relative mx-4" :class="{ 'active': activeTab === 'quem-somos' }">
        <a @click="changeTab('quem-somos')" class="relative block py-1 text-2xl font-semibold text-black hover:after:w-full hover:after:left-0">QUEM SOMOS</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HomeMenu',
  data() {
    return {
      activeTab: null
    };
  },
  methods: {
    changeTab(tab) {
      console.log("Clicked:", tab, this.activeTab);
      this.activeTab = tab;
    }
  }
};
</script>
