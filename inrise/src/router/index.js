import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticatedAdmin } from '@/utils/auth'; 
import ClientHome from '../screens/ClientHome.vue';
import ClientComputers from '@/screens/ClientComputers.vue';
import AdminHome from '@/screens/AdminHome.vue';
import MeusProdutos from '../screens/MeusProdutos.vue';
import CadastrarProdutos from '../screens/CadastrarProdutos.vue';
import ComputadoresProntos from '@/screens/ComputadoresProntos.vue';
import CadastrarSoftwares from '@/screens/CadastrarSoftwares.vue';
import GruposDeSoftware from '@/screens/GruposDeSoftware.vue';
import CadastroDeCategorias from '@/screens/CadastroDeCategorias.vue';
import UsuariosLista from '@/screens/UsuariosLista.vue';
import TodosOsPedidos from '@/screens/TodosOsPedidos.vue';
import AnaliseFinanceira from '@/screens/AnaliseFinanceira.vue';
import CadastroUser from '@/screens/CadastroUser.vue';
import LandingPage from '@/screens/LandingPage.vue';
import AdminLogin from '@/screens/AdminLogin.vue';
import ClientActivity from '@/screens/ClientActivity.vue';
import ClientSoftware from '@/screens/ClientSoftware.vue';
import ClientPCPartPicker from '@/screens/ClientPCPartPicker.vue';
import ClientOrders from '@/screens/ClientOrders.vue';
import ClientPcPrebuilt from '@/screens/ClientPcPrebuilt.vue';
import ClientPcPrebuiltPicker from '@/screens/ClientPcPrebuiltPicker.vue';
import ClientPeripherals from '@/screens/ClientPeripherals.vue';

const routes = [
  {
    path: '/client',
    name: 'client',
    component: ClientHome,
    children: [
      {
        path: '', 
        name: 'ClientComputers',
        component: ClientComputers
      },
      {
        path: 'activity', 
        name: 'ClientActivity',
        component: ClientActivity
      },
      {
        path: 'software', 
        name: 'ClientSoftware',
        component: ClientSoftware
      },
      {
        path: 'pcpartpicker', 
        name: 'ClientPCPartPicker',
        component: ClientPCPartPicker
      },
      {
        path: 'orders', 
        name: 'ClientOrders',
        component: ClientOrders
      },
      {
        path: 'picker', 
        name: 'ClientPcPrebuiltPicker',
        component: ClientPcPrebuiltPicker
      },
      {
        path: 'prebuilts', 
        name: 'ClientPcPrebuilt',
        component: ClientPcPrebuilt
      },
      {
        path: 'peripherals', 
        name: 'ClientPeripherals',
        component: ClientPeripherals
      },
    ]
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: AdminLogin
  },
  {
    path: '/landingPage',
    name: 'landingPage',
    component: LandingPage
  },
  {
    path: '/userCadastro',
    name: 'userCadastro',
    component: CadastroUser
  },
  {
    path: '/admin',
    component: AdminHome, 
    beforeEnter: (to, from, next) => {
      if (isAuthenticatedAdmin()) {  // Check using the new isAuthenticatedAdmin function
        next(); 
      } else {
        next('/adminLogin');  // Redirect to the login page if not authenticated
      }
    },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: AdminHome
      },
      {
        path: 'meusProdutos',
        name: 'MeusProdutos',
        component: MeusProdutos
      },
      {
        path: 'cadastrarProdutos',
        name: 'CadastrarProdutos',
        component: CadastrarProdutos
      },
      {
        path: 'computadoresProntos',
        name: 'ComputadoresProntos',
        component: ComputadoresProntos
      },
      {
        path: 'cadastrarSoftwares',
        name: 'CadastrarSoftwares',
        component: CadastrarSoftwares
      },
      {
        path: 'gruposDeSoftware',
        name: 'GruposDeSoftware',
        component: GruposDeSoftware
      },
      {
        path: 'cadastroDeCategorias',
        name: 'CadastroDeCategorias',
        component: CadastroDeCategorias
      },
      {
        path: 'usuarios',
        name: 'UsuariosLista',
        component: UsuariosLista
      },
      {
        path: 'todosOsPedidos',
        name: 'TodosOsPedidos',
        component: TodosOsPedidos
      },
      {
        path: 'analiseFinanceira',
        name: 'AnaliseFinanceira',
        component: AnaliseFinanceira
      }
    ]
  },
  {
    path: '/:catchAll(.*)', // This catches any unrecognized URL
    redirect: '/client'  // Redirect to login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
