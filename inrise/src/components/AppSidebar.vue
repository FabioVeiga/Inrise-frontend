<template>
  <div class="sidebar transition-all duration-300 overflow-hidden cursor-pointer"
    :class="{ 'w-[60px]': isCollapsed, 'w-[176px]': !isCollapsed }" @click="toggleSidebar">
    <!-- Logo and Hamburger Icon -->
    <div class="flex items-center justify-center relative">
      <img src="@/assets/InRise logo.png" alt="Logo" class="logo transition-all"
        :class="{ 'w-[70px] h-auto': isCollapsed, 'w-[100px] h-auto': !isCollapsed }">
    </div>
    <i v-show="isCollapsed" class="fas fa-bars text-white text-lg"></i>  

    <!-- Sidebar Content -->
    <div v-show="!isMobile || !isCollapsed" class="sidebar-content mt-4">
      <UserAuthButton :isLoggedIn="isLoggedIn" @open-user-auth-modal="openUserAuthModal"
        @auth-changed="handleAuthChanged" />

      <UserButton label="Home" icon="fas fa-home" targetRoute="/client" />
      <UserButton label="Configurador" icon="fas fa-tools" targetRoute="/client/configurador" />
      <UserButton label="Computadores" icon="fas fa-desktop" targetRoute="/client/computadores" />
      <UserButton label="Periféricos" icon="fas fa-keyboard" targetRoute="/client/perifericos" />
      <UserButton label="SAC" icon="fas fa-headset" targetRoute="/client/sac" />
      <UserButton label="Quem Somos" icon="fas fa-users" targetRoute="/client/quem-somos" />

      <UserButton v-if="isLoggedIn" label="Pedidos" icon="fas fa-box" targetRoute="/client/orders" />
    </div>

  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import UserAuthButton from './UserAuthButton.vue';
import UserButton from './UserButton.vue';
import MarkdownModal from '@/components/MarkdownModal.vue';
import { marked } from 'marked';

export default {
  name: 'AppSidebar',
  components: {
    UserAuthButton,
    UserButton,
    MarkdownModal
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const isCollapsed = ref(true); // Start collapsed by default
    const isMobile = ref(window.innerWidth < 1024);

    function toggleSidebar() {
      if (isMobile.value) {
        isCollapsed.value = !isCollapsed.value;
      }
    }

    function checkScreenSize() {
      isMobile.value = window.innerWidth < 1024;
      if (!isMobile.value) {
        isCollapsed.value = false; // Keep sidebar expanded on desktop
      }
    }

    // Update on resize
    onMounted(() => {
      window.addEventListener('resize', checkScreenSize);
      checkScreenSize(); // Initial check
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize);
    });

    return {
      isCollapsed,
      isMobile,
      toggleSidebar
    };
  },
  computed: {
    renderedContent() {
      return marked(this.markdownContent);
    }
  },
  methods: {
    openUserAuthModal() {
      this.$emit('open-user-auth-modal');
    },
    handleAuthChanged(isLoggedIn) {
      console.log("Logged out in sidebar", isLoggedIn);
      this.$emit('auth-changed', isLoggedIn);
    },
  }
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  background-color: #191919;
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

/* Logo transition */
.logo {
  margin-bottom: 20px;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
}

/* Smooth fade effect */
.w-[60px] .sidebar-content {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.w-[176px] .sidebar-content {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
</style>
