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
            <router-link :to="`/user-orders/${user.id}`" class="action-button">
              Ver Pedidos
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="users.length === 0 && !loading" class="text-center text-gray-500">
      Nenhum usuário encontrado.
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="!pagination.hasPreviousPage">Anterior</button>
      <span>Página {{ pagination.pageIndex }} de {{ pagination.totalPages }}</span>
      <button @click="nextPage" :disabled="!pagination.hasNextPage">Próxima</button>
    </div>
  </div>
</template>

<script>
import { fetchAllUsers } from "@/api/"; 

export default {
  name: "UsuariosLista",
  data() {
    return {
      users: [],
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetchAllUsers({
          pageIndex: this.pagination.pageIndex,
          pageSize: this.pagination.pageSize,
          profile: 2,
        });

        this.users = response.data.items;
        this.pagination.pageIndex = response.data.pageIndex;
        this.pagination.totalPages = response.data.totalPages;
        this.pagination.hasNextPage = response.data.hasNextPage;
        this.pagination.hasPreviousPage = response.data.hasPrevieusPage;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    nextPage() {
      if (this.pagination.hasNextPage) {
        this.pagination.pageIndex++;
        this.fetchUsers();
      }
    },
    prevPage() {
      if (this.pagination.hasPreviousPage) {
        this.pagination.pageIndex--;
        this.fetchUsers();
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.usuariosLista {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

thead {
  background-color: #f8f9fa;
}

tr:nth-child(even) {
  background-color: #f4f4f4;
}

.action-button {
  text-decoration: none;
  color: white;
  background: #007bff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.action-button:hover {
  background: #0056b3;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
