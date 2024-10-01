<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-6">Login de Admin</h1>
      <form @submit.prevent="loginAdmin">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="admin.email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <!-- Senha -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Senha:</label>
          <input
            type="password"
            id="password"
            v-model="admin.password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <!-- Botão de Login -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { authenticateUser } from '@/api'; // Ajuste o caminho para o seu api.js

export default {
  data() {
    return {
      admin: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async loginAdmin() {
      try {
        const response = await authenticateUser({
          email: this.admin.email,
          password: this.admin.password,
          profile: 1 // Ajuste conforme necessário
        });
        console.log('Login realizado com sucesso:', response.data);

        // Armazenar o token em um lugar seguro (localStorage, Vuex, etc.)
        console.log("Login token", response.data.data.acessToken.token)
        localStorage.setItem('authToken', response.token);

        // Redirecionar para a página AdminHome após o login
        this.$router.push('/admin');
      } catch (error) {
        console.error('Erro ao realizar login:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Nenhum estilo adicional necessário, pois Tailwind CSS já cuida da estilização */
</style>
