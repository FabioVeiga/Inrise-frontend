<template>
    <div class="cadastrar-pc my-5">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Componente de Informações Gerais -->
        <InfoGeral :formData="formData" @update-form-data="updateFormData" />
  
        <!-- Seleção de Componentes -->
        <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 class="col-span-2 text-2xl font-bold">Componentes do PC</h2>
  
          <!-- Processador -->
          <div class="form-group">
            <label for="processadorId" class="block mb-1 font-semibold">Processador</label>
            <input
              type="number"
              v-model="formData.processadorId"
              id="processadorId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Placa Mãe -->
          <div class="form-group">
            <label for="motherBoardId" class="block mb-1 font-semibold">Placa Mãe</label>
            <input
              type="number"
              v-model="formData.motherBoardId"
              id="motherBoardId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Gabinete -->
          <div class="form-group">
            <label for="towerId" class="block mb-1 font-semibold">Gabinete</label>
            <input
              type="number"
              v-model="formData.towerId"
              id="towerId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Memória RAM Slot 01 -->
          <div class="form-group">
            <label for="memoryRamSlot01Id" class="block mb-1 font-semibold">Memória RAM Slot 01</label>
            <input
              type="number"
              v-model="formData.memoryRamSlot01Id"
              id="memoryRamSlot01Id"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Memória RAM Slot 02 -->
          <div class="form-group">
            <label for="memoryRamSlot02Id" class="block mb-1 font-semibold">Memória RAM Slot 02</label>
            <input
              type="number"
              v-model="formData.memoryRamSlot02Id"
              id="memoryRamSlot02Id"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Disco HHD -->
          <div class="form-group">
            <label for="memoryRomHHDId" class="block mb-1 font-semibold">Disco HDD</label>
            <input
              type="number"
              v-model="formData.memoryRomHHDId"
              id="memoryRomHHDId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Disco SSD -->
          <div class="form-group">
            <label for="memoryRomSSDId" class="block mb-1 font-semibold">Disco SSD</label>
            <input
              type="number"
              v-model="formData.memoryRomSSDId"
              id="memoryRomSSDId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Disco SSD M.2 -->
          <div class="form-group">
            <label for="memoryRomSSDM2Id" class="block mb-1 font-semibold">Disco SSD M.2</label>
            <input
              type="number"
              v-model="formData.memoryRomSSDM2Id"
              id="memoryRomSSDM2Id"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Placa de Vídeo -->
          <div class="form-group">
            <label for="videoBoardId" class="block mb-1 font-semibold">Placa de Vídeo</label>
            <input
              type="number"
              v-model="formData.videoBoardId"
              id="videoBoardId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Fonte de Alimentação -->
          <div class="form-group">
            <label for="powerSupplyId" class="block mb-1 font-semibold">Fonte de Alimentação</label>
            <input
              type="number"
              v-model="formData.powerSupplyId"
              id="powerSupplyId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Cooler -->
          <div class="form-group">
            <label for="coolerId" class="block mb-1 font-semibold">Cooler</label>
            <input
              type="number"
              v-model="formData.coolerId"
              id="coolerId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Monitor -->
          <div class="form-group">
            <label for="monitorScreenId" class="block mb-1 font-semibold">Monitor</label>
            <input
              type="number"
              v-model="formData.monitorScreenId"
              id="monitorScreenId"
              required
              class="w-full border p-2"
            />
          </div>
  
          <!-- Preço Final -->
          <div class="form-group">
            <label for="finalPrice" class="block mb-1 font-semibold">Preço Final</label>
            <input
              type="number"
              v-model="formData.finalPrice"
              id="finalPrice"
              required
              class="w-full border p-2"
            />
          </div>
        </div>
  
        <!-- Botão de Salvar -->
        <div class="form-group my-4 col-span-2">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Salvar PC
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import InfoGeral from '@/components/admin/cadastro/InfoGeral.vue';
  import { registerPC } from '@/api';
  
  export default {
    name: 'CadastroPC',
    components: {
      InfoGeral,
    },
    data() {
      return {
        formData: {
          name: '',
          processadorId: 0,
          motherBoardId: 0,
          towerId: 0,
          memoryRamSlot01Id: 0,
          memoryRamSlot02Id: 0,
          memoryRomHHDId: 0,
          memoryRomSSDId: 0,
          memoryRomSSDM2Id: 0,
          videoBoardId: 0,
          powerSupplyId: 0,
          coolerId: 0,
          monitorScreenId: 0,
          finalPrice: 0,
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await registerPC(this.formData);
          console.log('PC cadastrado com sucesso!', response);
          alert('PC cadastrado com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar PC:', error);
          alert('Erro ao cadastrar PC!');
        }
      },
      resetForm() {
        this.formData = {
          name: '',
          processadorId: 0,
          motherBoardId: 0,
          towerId: 0,
          memoryRamSlot01Id: 0,
          memoryRamSlot02Id: 0,
          memoryRomHHDId: 0,
          memoryRomSSDId: 0,
          memoryRomSSDM2Id: 0,
          videoBoardId: 0,
          powerSupplyId: 0,
          coolerId: 0,
          monitorScreenId: 0,
          finalPrice: 0,
        };
      },
    },
  };
  </script>
  