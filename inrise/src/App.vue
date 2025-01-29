<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif; 
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.nav-button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
}

.nav-button:hover {
  background-color: #358a63;
}
</style>
