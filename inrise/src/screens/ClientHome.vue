<template>
  <div id="client-home" class="flex flex-row h-auto p-0 m-0">
    <AppSidebar :isLoggedIn="isLoggedIn" @auth-changed="handleAuthChanged" />
    <div class="main-content flex-1 overflow-visible p-0 m-0">
      <router-view />
    </div>
  </div>
  <AppFooter></AppFooter>
  <LowerFooter></LowerFooter>
</template>

<script>
import AppSidebar from '../components/AppSidebar.vue';
import AppFooter from '../components/AppFooter.vue';
import LowerFooter from '@/components/LowerFooter.vue';
import { isUserTokenValid, logoutUser } from '@/utils/auth';
export default {
  name: 'ClientHome',
  components: {
    AppSidebar,
    AppFooter,
    LowerFooter
  },
  data() {
    return {
      isLoggedIn: false,
      tokenCheckInterval: null,
    };
  },
  created() {
    if (this.isLoggedIn) {
      this.checkTokenValidity();
    } else {
      if (isUserTokenValid()) {
        this.isLoggedIn = true;
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.tokenCheckInterval = setInterval(this.checkTokenValidity, 5000);
    }
  },
  beforeUnmount() {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  },
  methods: {
    handleAuthChanged(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.startExpiryWatcher();
      } else {
        clearInterval(this.tokenCheckInterval);
      }
    },

    checkTokenValidity() {
      if (!isUserTokenValid()) {
        this.handleTokenExpiry();
      }
    },

    handleTokenExpiry() {
      alert('Sua sessão expirou. Por favor, entre novamente.');
      this.logout();
    },

    logout() {
      logoutUser();
      this.isLoggedIn = false;
      this.$router.push('/client');
    },

    startExpiryWatcher() {
      this.tokenCheckInterval = setInterval(() => {
        if (!isUserTokenValid()) {
          this.handleTokenExpiry();
        }
      }, 5000);
    }
  }
};
</script>
