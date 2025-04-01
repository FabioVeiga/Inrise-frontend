<template>
    <div class="data-table-container flex flex-col justify-start items-center min-h-[400px]">
      <h2 class="text-4xl font-bold my-8">Inscrições do Beta InRise</h2>
  
     
  
      <table class="w-full max-w-4xl border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Nome</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Aceitou RGPD?</th>
            <th class="border border-gray-300 px-4 py-2">Email Enviado?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-center">
            <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ user.isAcceptRGPD ? 'Sim' : 'Não' }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ user.isSendEmail ? 'Sim' : 'Não' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

     <!-- Export Button -->
     <button 
        @click="exportToExcel"
        class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mb-4"
      >
        Exportar para Excel
      </button>
  </template>
  
  <script>
  import { fetchLandingPage } from '@/api';
  import * as XLSX from 'xlsx';
  
  export default {
    name: 'LandingPageBeta',
    data() {
      return {
        users: [],
      };
    },
    async created() {
      await this.loadData();
    },
    methods: {
      async loadData() {
        try {
          const response = await fetchLandingPage();
          this.users = response.data;
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          alert('Erro ao carregar os dados. Tente novamente.');
        }
      },
      exportToExcel() {
        if (!this.users.length) {
          alert("Não há dados para exportar.");
          return;
        }
  
        // Convert data for export
        const worksheetData = this.users.map(user => ({
          ID: user.id,
          Nome: user.name,
          Email: user.email,
          "Aceitou RGPD?": user.acceptedRgpd ? "Sim" : "Não",
          "Email Enviado?": user.emailSent ? "Sim" : "Não"
        }));
  
        // Create worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LandingPageData");
  
        // Save file
        XLSX.writeFile(workbook, "LandingPageData.xlsx");
      }
    },
  };
  </script>
  
  <style scoped>
  .data-table-container {
    max-width: 900px;
    margin: 0 auto;
  }
  
  button {
    padding: 10px 20px;
    margin: 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  