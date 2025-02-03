<template>
  <div>
    <button 
      @click="handleButtonClick" 
      class="flex items-center bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none w-full justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14c4.418 0 8 3.582 8 8H4c0-4.418 3.582-8 8-8zM12 10c2.761 0 5-2.239 5-5S14.761 0 12 0 7 2.239 7 5s2.239 5 5 5z" />
      </svg>
      <span class="text-sm">{{ isLoggedIn ? 'Sair' : 'Entra, ou registra-te!' }}</span> <!-- Change text based on login status -->
    </button>

    <UserAuthModal v-if="isModalOpen" @close="closeModal" @auth-changed="handleAuthChanged" />
  </div>
</template>

<script>
import UserAuthModal from '@/screens/UserAuthModal.vue';
import { logoutUser } from '@/utils/auth';

export default {
  name: 'UserAuthButton',
  components: {
    UserAuthModal
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    handleButtonClick() {
      if (this.isLoggedIn) {
        logoutUser();
        this.$emit('auth-changed', false);
      } else {
        this.isModalOpen = true;
      }
    },

    closeModal() {
      this.isModalOpen = false;
    },

    handleAuthChanged(isLoggedIn) {
      console.log("Logged out in button", isLoggedIn)
      this.$emit('auth-changed', isLoggedIn);
    }
  }
};
</script>

<style scoped>
</style>
