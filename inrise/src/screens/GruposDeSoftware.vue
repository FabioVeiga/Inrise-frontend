<template>
  <div class="grupos-de-software p-5">
    <h1 class="text-2xl font-bold mb-4">Grupos de Software</h1>

    <div v-for="category in categories" :key="category.name" class="mb-5">
      <!-- Header da Categoria -->
      <button 
        @click="toggleCategory(category.name)" 
        class="w-full text-left bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        {{ category.name }}
      </button>
      
      <!-- Tabela de Softwares (collapsable) -->
      <div v-if="category.isOpen" class="mt-3">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="border px-4 py-2">Nome do Software</th>
              <th class="border px-4 py-2">Req Min Processador</th>
              <th class="border px-4 py-2">Req Max Processador</th>
              <th class="border px-4 py-2">Req Min GPU</th>
              <th class="border px-4 py-2">Req Max GPU</th>
              <th class="border px-4 py-2">Req Min RAM</th>
              <th class="border px-4 py-2">Req Max RAM</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="software in category.softwares" :key="software.id" class="hover:bg-gray-100">
              <td class="border px-4 py-2">{{ software.softwareName }}</td>
              <td class="border px-4 py-2">{{ software.minProcessor }}</td>
              <td class="border px-4 py-2">{{ software.maxProcessor }}</td>
              <td class="border px-4 py-2">{{ software.minGpu }}</td>
              <td class="border px-4 py-2">{{ software.maxGpu }}</td>
              <td class="border px-4 py-2">{{ software.minRam }}</td>
              <td class="border px-4 py-2">{{ software.maxRam }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GruposDeSoftware',
  data() {
    return {
      categories: [
        {
          name: 'Produtividade',
          isOpen: false,
          softwares: [
            {
              id: 1,
              softwareName: 'Exemplo Software',
              minProcessor: 'Intel i3',
              maxProcessor: 'Intel i5',
              minGpu: 'GTX 1050',
              maxGpu: 'GTX 1060',
              minRam: '4GB',
              maxRam: '8GB'
            }
          ]
        },
        {
          name: 'Multimídia',
          isOpen: false,
          softwares: [
            {
              id: 2,
              softwareName: 'Editor de Vídeo',
              minProcessor: 'Intel i5',
              maxProcessor: 'Intel i7',
              minGpu: 'GTX 1060',
              maxGpu: 'RTX 2060',
              minRam: '8GB',
              maxRam: '16GB'
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleCategory(categoryName) {
      const category = this.categories.find(cat => cat.name === categoryName);
      category.isOpen = !category.isOpen;
    }
  }
};
</script>

