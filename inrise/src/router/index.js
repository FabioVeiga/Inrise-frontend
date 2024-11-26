import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/utils/auth';
import ClientHome from '../screens/ClientHome.vue';
import AdminHome from '../screens/AdminHome.vue';
import MeusProdutos from '../screens/MeusProdutos.vue';
import CadastrarProdutos from '../screens/CadastrarProdutos.vue';
import ComputadoresProntos from '../screens/ComputadoresProntos.vue';
import CadastrarSoftwares from '../screens/CadastrarSoftwares.vue';
import GruposDeSoftware from '../screens/GruposDeSoftware.vue';
import CadastroDeCategorias from '../screens/CadastroDeCategorias.vue';
import UsuariosLista from '../screens/UsuariosLista.vue';
import TodosOsPedidos from '../screens/TodosOsPedidos.vue';
import AnaliseFinanceira from '../screens/AnaliseFinanceira.vue';
import CadastroUser from '@/screens/CadastroUser.vue';
import LandingPage from '@/screens/LandingPage.vue';
import AdminLogin from '@/screens/AdminLogin.vue';
import EditRam from '@/screens/EditRam.vue';

const routes = [
  {
    path: '/client',
    name: 'client',
    component: ClientHome
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
      if (isAuthenticated()) {
        next(); 
      } else {
        next('/adminLogin');
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
        path: '/edit-ram/:productId',
        name: 'editRam',
        component: EditRam,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
