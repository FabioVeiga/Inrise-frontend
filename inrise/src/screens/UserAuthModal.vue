<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" @click="closeModal">
        <div class="bg-white p-8 w-full max-w-md rounded-lg shadow-md relative" @click.stop>
            <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h1 class="text-2xl font-semibold mb-6">{{ isRegister ? 'Cadastrar' : 'Login' }}</h1>

            <form @submit.prevent="submitForm">
                <div v-if="isRegister" class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nome:</label>
                    <input type="text" id="name" v-model="user.name" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div v-if="isRegister" class="mb-4">
                    <label for="lastname" class="block text-sm font-medium text-gray-700">Sobrenome:</label>
                    <input type="text" id="lastname" v-model="user.lastname" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" v-model="user.email" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div v-if="isRegister" class="mb-4">
                    <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Celular:</label>
                    <input type="tel" id="phoneNumber" v-model="user.phoneNumber" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">Senha:</label>
                    <input type="password" id="password" v-model="user.password" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div v-if="isRegister" class="mb-6">
                    <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700">Confirm
                        Password:</label>
                    <input type="password" id="passwordConfirmation" v-model="user.passwordConfirmation" required
                        :class="{ 'border-red-500': passwordMismatch }"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <p v-if="passwordMismatch" class="text-sm text-red-500 mt-1">As senhas não correspondem.</p>
                </div>

                <div v-if="isRegister" class="mb-4">
                    <label class="inline-flex items-center text-sm">
                        <input type="checkbox" v-model="user.marketing" class="form-checkbox h-4 w-4 text-blue-500" />
                        <span class="ml-2">Desejo receber e-mails e promoções da Inrise.</span>
                    </label>
                </div>

                <div v-if="isRegister" class="mb-4">
                    <label class="inline-flex items-center text-sm">
                        <input type="checkbox" v-model="user.term" required
                            class="form-checkbox h-4 w-4 text-blue-500" />
                        <span class="ml-2">Eu concordo com os termos e condições.</span>
                    </label>
                </div>

                <button type="submit"
                    class="w-full bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {{ isRegister ? 'Register' : 'Login' }}
                </button>
            </form>

            <div class="mt-4 text-center">
                <span v-if="isRegister">
                    Já tens uma conta?
                    <button @click="toggleRegister" class="text-blue-500">Login</button>
                </span>
                <span v-else>
                    Não tens uma conta?
                    <button @click="toggleRegister" class="text-blue-500">Cadastrar</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { loginUser } from '@/utils/auth';
import { registerUser } from '@/api';

export default {
    name: 'UserAuthModal',
    data() {
        return {
            isRegister: false,
            user: {
                name: '',
                lastname: '',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirmation: '',
                marketing: false,
                term: false,
            },
        };
    },
    computed: {
        passwordMismatch() {
            return this.user.password !== this.user.passwordConfirmation;
        },
    },
    methods: {
        toggleRegister() {
            this.isRegister = !this.isRegister;
        },

        async loginUserMethod() {
            const { success, error } = await loginUser({
                email: this.user.email,
                password: this.user.password,
            });

            if (success) {
                this.$emit('close');
                this.$emit('auth-changed', true);
            } else {
                alert(error || 'An error occurred during login');
            }
        },

        //@TODO: modular o register e o validate também
        async registerUser() {
            if (!this.user.term) {
                alert('Você precisa aceitar os termos e condições.');
                return;
            }

            try {
                const registrationData = {
                    name: this.user.name,
                    lastname: this.user.lastname,
                    email: this.user.email,
                    phoneNumber: this.user.phoneNumber,
                    password: this.user.password,
                    profile: 2,
                    marketing: this.user.marketing,
                    term: this.user.term,
                };

                await registerUser(registrationData);
                alert('Ocorreu um erro ao cadastrar. Tente novamente!');

                this.$emit('close');
            } catch (error) {
                console.error('Erro no cadastro:', error);
                const firstError = error.response?.data?.errors
                    ? Object.values(error.response.data.errors)[0][0]
                    : 'Erro ao cadastrar. Tente novamente!';
                alert(firstError);
            }
        },

        async submitForm() {
            if (this.isRegister) {
                await this.registerUser();
            } else {
                await this.loginUserMethod();
            }
        },

        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

