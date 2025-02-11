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

            <h1 class="text-2xl font-semibold mb-6">
                {{ currentMode === 'login' ? 'Login' : currentMode === 'register' ? 'Cadastrar' : 'Validação de E-mail'
                }}
            </h1>

            <component :is="currentModeComponent" :user="user" @update-user="updateUser" @submit-form="submitForm" />

            <div class="mt-4 text-center">
                <span v-if="currentMode === 'register'">
                    Já tem uma conta?
                    <button @click="setMode('login')" class="text-blue-500">Login</button>
                </span>
                <span v-if="currentMode === 'login'">
                    Não tem uma conta?
                    <button @click="setMode('register')" class="text-blue-500">Cadastrar</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import UserLogin from './UserLogin.vue';
import UserRegister from './UserRegister.vue';
import UserValidation from './UserValidation.vue';
import { loginUser } from '@/utils/auth';
import { registerUser, validateEmail, getCodeEmail } from '@/api';

export default {
    components: {
        UserLogin,
        UserRegister,
        UserValidation
    },
    data() {
        return {
            currentMode: 'login',
            user: {
                name: '',
                lastname: '',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirmation: '',
                marketing: false,
                term: false,
                validationCode: '', 
            },
        };
    },
    computed: {
        currentModeComponent() {
            return this.currentMode === 'login' ? 'UserLogin' :
                this.currentMode === 'register' ? 'UserRegister' :
                    'UserValidation';
        }
    },
    methods: {
        setMode(mode) {
            this.currentMode = mode;
        },
        updateUser(updatedUserData) {
            this.user = { ...this.user, ...updatedUserData };
        },
        async submitForm(formType) {
            if (formType === 'validation') {
                await this.validateEmailAndLogin();
            } else {
                if (this.currentMode === 'register') {
                    await this.registerUser();
                } else if (this.currentMode === 'login') {
                    await this.loginUserMethod();
                }
            }
        },
        async validateEmailAndLogin() {
            try {
                const response = await validateEmail(this.user.email, this.user.validationCode);

                console.log(response); 

                if (response && response.status === 200) {  
                    await this.handleLoginAfterValidation();
                } else {
                    alert('Erro ao validar o e-mail');
                }
            } catch (err) {
                console.error('Error validating email:', err);
                alert(err || 'Erro ao validar o e-mail');
            }
        },
        async handleLoginAfterValidation() {
            const { success, error } = await loginUser({
                email: this.user.email,
                password: this.user.password,
            });
            console.log("suc",success,"er",error)
            if (success) {
                this.$emit('close');
                this.$emit('auth-changed', true);
            } else {
                alert(error || 'An error occurred during login');
            }
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
                if (error && error === 'Este e-mail não foi validado!') {
                    await this.requestValidationCode(this.user.email);
                    this.currentMode = 'validation';
                } else {
                    alert(error || 'Erro durante login');
                }
            }
        },
        async requestValidationCode(email) {
            try {
                const response = await getCodeEmail({ email });
                if (response && response.status === 200) {
                    console.log('Código de validação enviado pro email:', email);
                }
            } catch (error) {
                alert(error.response.data.data || 'Erro ao enviar código de validação. Tente novamente.');
            }
        },
        async registerUser() {
            if (!this.user.term) {
                alert('Você precisa aceitar os termos e condições.');
                return;
            }
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
            try {
                const response = await registerUser(registrationData);

                if (response && response.status === 200) {
                    alert('Cadastro realizado com sucesso!');
                    this.setMode('validation'); 
                }
            } catch (error) {
                console.error('Erro no cadastro:', error);
                const firstError = error.response?.data?.errors
                    ? Object.values(error.response.data.errors)[0][0]
                    : 'Erro ao cadastrar. Tente novamente!';
                alert(firstError);
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
