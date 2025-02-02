<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-6">Login de Admin</h1>
      <form @submit.prevent="handleLoginAdmin">
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
import { loginAdmin } from '@/utils/auth';

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
    async handleLoginAdmin() {
      const { success } = await loginAdmin(this.admin);
      
      if (success) {
        this.$router.push('/admin');
      } 
    },
  },
};
</script>
