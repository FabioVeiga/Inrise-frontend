<template>
    <form @submit.prevent="submitForm('validation')">
        <div class="mb-4">
            <label for="validationCode" class="block text-sm font-medium text-gray-700">Código de Validação:</label>
            <input type="text" id="validationCode" v-model="localValidationCode" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Validar E-mail
        </button>
    </form>
</template>

<script>
export default {
    props: ['validationCode'],
    data() {
        return {
            localValidationCode: this.validationCode  
        };
    },
    methods: {
        submitForm(formType) {
            this.$emit('update-user', { validationCode: this.localValidationCode });
            this.$emit('submit-form', formType);
        },
    },
};
</script>
