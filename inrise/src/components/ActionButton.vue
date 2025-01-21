<template>
    <button @click="goToActivity" :class="[
        isFinish ? 'w-[200px] h-[50px]' : 'w-[160px] h-[38px]',
        'cursor-pointer rounded-lg flex px-2 items-center justify-between text-[15px] font-semibold',
        isNext ? 'text-white bg-gradient-to-b from-[#60B5EF] to-[#DB3AFD]' : 'text-black bg-white border-2 border-black'
    ]" @mouseover="hover = true" @mouseleave="hover = false">
        <i :class="isNext ? 'hidden' : 'fa-solid fa-arrow-left'"></i>
        <slot></slot>
        <i :class="isNext ? 'fa-solid fa-arrow-right' : 'hidden'"></i>
    </button>
</template>

<script>
export default {
    name: 'ActionButton',
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
        isNext: {
            type: Boolean,
            default: true,
        },
        isFinish: {
            type: Boolean,
            default: false,
        },
        canNavigate: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            hover: false,
        };
    },
    methods: {
        goToActivity() {
            if (this.canNavigate) { 
                this.$router.push(this.to);
            } else {
                alert('Por favor, selecione pelo menos uma atividade.');
            }
        },
    },
};
</script>

<style scoped>
/* Optional scoped styles can go here */
</style>
