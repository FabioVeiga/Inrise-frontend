<template>
    <form @submit.prevent="submitForm('login')">
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" v-model="localUser.email" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha:</label>
            <input type="password" id="password" v-model="localUser.password" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Login
        </button>
    </form>
</template>

<script>
export default {
    props: ['user'],
    data() {
        return {
            localUser: { ...this.user } 
        };
    },
    methods: {
        submitForm(formType) {
            this.$emit('update-user', this.localUser); 
            this.$emit('submit-form', formType);
        },
    },
};
</script>
