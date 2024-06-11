<template>
    <nav class="home-menu">
      <ul>
        <li :class="{ 'active': activeTab === 'computadores' }"><a @click="changeTab('computadores')">COMPUTADORES</a></li>
        <li :class="{ 'active': activeTab === 'perifericos' }"><a @click="changeTab('perifericos')">PERIFÉRICOS</a></li>
        <li :class="{ 'active': activeTab === 'sac' }"><a @click="changeTab('sac')">SAC</a></li>
        <li :class="{ 'active': activeTab === 'quem-somos' }"><a @click="changeTab('quem-somos')">QUEM SOMOS</a></li>
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
        console.log("Clicked:",tab,this.activeTab)
        this.activeTab = tab;
      }
    }
  };
  </script>
  
  <style scoped>
  .home-menu {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  
  .home-menu ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }
  
  .home-menu li {
    margin: 0 15px;
    position: relative;
  }
  
  .home-menu a {
    text-decoration: none;
    color: black;
    font-size: 24px;
    font-weight: 700; /* Peso padrão da fonte */
    position: relative;
    display: block;
    padding: 5px 0;
  }
  
  .home-menu a.active {
    font-weight: 900; /* Peso da fonte quando o item está ativo */
  }
  
  .home-menu a::before {
    content: '';
    position: absolute;
    width: 0;
    height: 5px;
    bottom: 0;
    left: 50%;
    background: linear-gradient(to bottom, #54C0ED, #E431FE);
    transition: all 0.3s ease;
  }
  
  .home-menu a:hover::before {
    width: 100%;
    left: 0;
  }
  </style>
  