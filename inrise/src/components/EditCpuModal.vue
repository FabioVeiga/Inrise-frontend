<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto relative">
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                aria-label="Fechar Modal">
                &times;
            </button>

            <h2 class="text-2xl font-semibold mb-4 text-center">Editar Processador</h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-4">
                <!-- Componente InfoGeral -->
                <InfoGeral 
                :form-data="editedProduct" 
                @update-form-data="updateFormData" 
                productType="processor" />

                <!-- Informações Específicas do Processador -->
                <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h2 class="col-span-2 text-2xl font-bold">Informações do Processador</h2>

                    <!-- Geração -->
                    <div class="form-group">
                        <label for="generation" class="block mb-1 font-semibold">Geração</label>
                        <input type="text" v-model="editedProduct.generation" id="generation" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Socket -->
                    <div class="form-group">
                        <label for="socket" class="block mb-1 font-semibold">Socket</label>
                        <input type="text" v-model="editedProduct.socket" id="socket" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Núcleos -->
                    <div class="form-group">
                        <label for="core" class="block mb-1 font-semibold">Núcleos</label>
                        <input type="number" v-model="editedProduct.core" id="core" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Frequência -->
                    <div class="form-group">
                        <label for="frequency" class="block mb-1 font-semibold">Frequência (GHz)</label>
                        <input type="number" step="0.01" v-model="editedProduct.frequency" id="frequency" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Potência -->
                    <div class="form-group">
                        <label for="potency" class="block mb-1 font-semibold">Potência (W)</label>
                        <input type="number" v-model="editedProduct.potency" id="potency" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Suporte à Memória RAM -->
                    <div class="form-group">
                        <label for="suportMemoryRAM" class="block mb-1 font-semibold">Suporte à Memória RAM</label>
                        <input type="text" v-model="editedProduct.suportMemoryRAM" id="suportMemoryRAM" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Suporte à Memória ROM -->
                    <div class="form-group">
                        <label for="suportMemoryROM" class="block mb-1 font-semibold">Suporte à Memória ROM</label>
                        <input type="text" v-model="editedProduct.suportMemoryROM" id="suportMemoryROM" required
                            class="w-full border p-2" />
                    </div>

                    <!-- Suporte a Vídeo -->
                    <div class="form-group">
                        <label for="suportVideo" class="block mb-1 font-semibold">Suporte a Vídeo</label>
                        <input type="text" v-model="editedProduct.suportVideo" id="suportVideo" required
                            class="w-full border p-2" />
                    </div>
                </div>

                <!-- Componente InfoPreco -->
                <InfoPreco :form-data="editedProduct" @update-form-data="updateFormData" />

                <!-- Botões -->
                <div class="form-group my-4 col-span-2 flex flex-col justify-between">
                    <button type="button" @click="closeModal"
                        class="w-full my-4 md:w-auto bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="w-full md:w-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Salvar Processador
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { editCpu } from '@/api'; // Certifique-se de ter essa função na sua API
import InfoGeral from './admin/cadastro/InfoGeral.vue';
import InfoPreco from './admin/cadastro/InfoPreco.vue';

export default {
    name: 'EditCpuModal',
    components: {
        InfoGeral,
        InfoPreco,
    },
    props: {
        product: Object,
    },
    data() {
        return {
            editedProduct: this.product && typeof this.product === 'object' ? { ...this.product } : {
                generation: '',
                socket: '',
                core: '',
                frequency: '',
                potency: '',
                suportMemoryRAM: '',
                suportMemoryROM: '',
                suportVideo: '',
                price: {
                    costPrice: 0,
                    porcentageProfit: 0,
                    porcentageFixedCost: 0,
                    porcentageADMCost: 0,
                    porcentageDiscount: 0,
                    subtotal: 0,
                    iva: 0,
                    finalPrice: 0,
                },
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                const updatedCpu = await editCpu(this.editedProduct.id, this.editedProduct);
                console.log('Processador editado com sucesso!', updatedCpu);
                this.$emit('save', updatedCpu);
                this.closeModal();
            } catch (error) {
                console.error('Erro ao editar o processador:', error);
                alert('Erro ao editar produto!');
            }
        },

        updateFormData({ key, value }) {
            const keys = key.split('.');
            let target = this.editedProduct;

            for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];
                if (!(k in target)) {
                    target[k] = {};
                }
                target = target[k];
            }

            target[keys[keys.length - 1]] = value;
        },

        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped></style>