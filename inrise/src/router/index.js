import { createRouter, createWebHistory } from 'vue-router';
import ClientHome from '../screens/ClientHome.vue';
import AdminHome from '../screens/AdminHome.vue';

const routes = [
  {
    path: '/client',
    name: 'client',
    component: ClientHome
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
