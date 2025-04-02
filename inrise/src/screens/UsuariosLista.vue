<template>
  <div class="usuariosLista">
    <h1 class="text-3xl font-semibold my-12 text-center">Lista de Usuários</h1>

    <div v-if="loading" class="text-center text-gray-500">Carregando usuários...</div>

    <table v-if="users.length > 0" class="min-w-full bg-white shadow-md my-12 rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Nome</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Telefone</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Ativo</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Pedidos</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b">
          <td class="px-4 py-2 text-sm text-gray-800">{{ user.name }} {{ user.lastname }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ user.email }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ user.phoneNumber || 'N/A' }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">
            <span :class="user.active ? 'text-green-600' : 'text-red-600'">
              {{ user.active ? 'Sim' : 'Não' }}
            </span>
          </td>
          <td class="px-4 py-2 text-sm text-gray-800">
            <router-link :to="{ name: 'UserOrders', params: { userId: user.id } }" class="action-button view">
              Ver Pedidos
            </router-link>
          </td>
          <td class="px-4 py-2 text-sm text-gray-800 flex space-x-2">
            <button @click="editUser(user)" class="action-button edit">✏️</button>
            <button @click="deleteUser(user.id)" class="action-button delete">🗑️</button>
            <button @click="toggleActive(user)"
              :class="user.active ? 'action-button deactivate' : 'action-button activate'">
              {{ user.active ? '🔴' : '🟢' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchAllUsers, updateUserStatus, deleteUserById } from "@/api/";

export default {
  name: "UsuariosLista",
  data() {
    return {
      users: [],
      loading: false,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await fetchAllUsers({ profile: 2 });
        this.users = response.data.items;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async toggleActive(user) {
      user.active = !user.active;
      await updateUserStatus(user.id, user.active);
    },
    async deleteUser(userId) {
      await deleteUserById(userId);
      this.fetchUsers();
    },
    editUser(user) {
      alert(`Editando usuário: ${user.name}`);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.action-button {
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.edit {
  background: #ffc107;
}

.delete {
  background: #dc3545;
  color: white;
}

.activate {
  background: #28a745;
}

.deactivate {
  background: #ff5722;
}

.view {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
}
</style>