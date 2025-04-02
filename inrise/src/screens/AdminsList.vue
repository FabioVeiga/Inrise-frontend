<template>
    <div class="adminsLista">
      <h1 class="text-3xl font-semibold my-12 text-center">Lista de Administradores</h1>
  
      <div v-if="loading" class="text-center text-gray-500">Carregando administradores...</div>
  
      <table v-if="admins.length > 0" class="min-w-full bg-white shadow-md my-12 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Nome</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Telefone</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Ativo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id" class="border-b">
            <td class="px-4 py-2 text-sm text-gray-800">{{ admin.name }} {{ admin.lastname }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ admin.email }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">{{ admin.phoneNumber || 'N/A' }}</td>
            <td class="px-4 py-2 text-sm text-gray-800">
              <span :class="admin.active ? 'text-green-600' : 'text-red-600'">
                {{ admin.active ? 'Sim' : 'Não' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="admins.length === 0 && !loading" class="text-center text-gray-500">
        Nenhum administrador encontrado.
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
    name: "AdminsList",
    data() {
      return {
        admins: [],
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
      async fetchAdmins() {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetchAllUsers({
            pageIndex: this.pagination.pageIndex,
            pageSize: this.pagination.pageSize,
            profile: 1, // Fetch only admins
          });
  
          this.admins = response.data.items;
          this.pagination.pageIndex = response.data.pageIndex;
          this.pagination.totalPages = response.data.totalPages;
          this.pagination.hasNextPage = response.data.hasNextPage;
          this.pagination.hasPreviousPage = response.data.hasPreviousPage;
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      },
      nextPage() {
        if (this.pagination.hasNextPage) {
          this.pagination.pageIndex++;
          this.fetchAdmins();
        }
      },
      prevPage() {
        if (this.pagination.hasPreviousPage) {
          this.pagination.pageIndex--;
          this.fetchAdmins();
        }
      },
    },
    created() {
      this.fetchAdmins();
    },
  };
  </script>
  
  <style scoped>
  .adminsLista {
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
  