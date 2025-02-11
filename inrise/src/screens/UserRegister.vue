<template>
    <form @submit.prevent="submitForm('register')">
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nome:</label>
            <input type="text" id="name" v-model="localUser.name" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-4">
            <label for="lastname" class="block text-sm font-medium text-gray-700">Sobrenome:</label>
            <input type="text" id="lastname" v-model="localUser.lastname" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" v-model="localUser.email" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-4">
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Celular:</label>
            <input type="tel" id="phoneNumber" v-model="localUser.phoneNumber" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha:</label>
            <input type="password" id="password" v-model="localUser.password" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-6">
            <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700">Confirmar Senha:</label>
            <input type="password" id="passwordConfirmation" v-model="localUser.passwordConfirmation" required
                :class="{ 'border-red-500': passwordMismatch }"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            <p v-if="passwordMismatch" class="text-sm text-red-500 mt-1">As senhas não correspondem.</p>
        </div>

        <div class="mb-4">
            <label class="inline-flex items-center text-sm">
                <input type="checkbox" v-model="localUser.marketing" class="form-checkbox h-4 w-4 text-blue-500" />
                <span class="ml-2">Desejo receber e-mails e promoções.</span>
            </label>
        </div>

        <div class="mb-4">
            <label class="inline-flex items-center text-sm">
                <input type="checkbox" v-model="localUser.term" required
                    class="form-checkbox h-4 w-4 text-blue-500" />
                <span class="ml-2">Eu concordo com os termos e condições.</span>
            </label>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Registrar
        </button>
    </form>
</template>

<script>
export default {
    props: ['user'],
    data() {
        return {
            localUser: { ...this.user },  
        };
    },
    computed: {
        passwordMismatch() {
            return this.localUser.password !== this.localUser.passwordConfirmation;
        },
    },
    methods: {
        submitForm(formType) {
            this.$emit('update-user', this.localUser);  
            this.$emit('submit-form', formType);
        },
    },
};
</script>
