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
import LandingPageBeta from '@/screens/LandingPageBeta.vue';
import AdminsList from '@/screens/AdminsList.vue';

const routes = [
  /*{
    path: '/:catchAll(.*)',
    beforeEnter: (to, from, next) => {
      window.location.href = `https://inrise.pt${to.fullPath}`;
    }
  },*/
  {
    "route": "/**",
    "redirect": "https://inrise.pt{request.uri}/",
    "statusCode": 301
  },
  {
    "route": "/css/",
    "headers": {
      "Cache-Control": "max-age=31536000"
    }
  },
  {
    "route": "/js/",
    "headers": {
      "Cache-Control": "max-age=31536000"
    }
  },
  {
    "route": "/client",
    "rewrite": "/index.html"
  },
  {
    "route": "/adminLogin",
    "rewrite": "/index.html"
  },
  {
    "route": "/landingPage",
    "rewrite": "/index.html"
  },
  {
    "route": "/userCadastro",
    "rewrite": "/index.html"
  },
  {
    "route": "/admin",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/meusProdutos",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/cadastrarProdutos",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/computadoresProntos",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/cadastrarSoftwares",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/gruposDeSoftware",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/cadastroDeCategorias",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/usuarios",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/todosOsPedidos",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/admin/analiseFinanceira",
    "rewrite": "/admin/index.html"
  },
  {
    "route": "/client/activity",
    "rewrite": "/client/index.html"
  },
  {
    "route": "/client/software",
    "rewrite": "/client/index.html"
  },
  {
    "route": "/client/pcpartpicker",
    "rewrite": "/client/index.html"
  },
  {
    "route": "/client/orders",
    "rewrite": "/client/index.html"
  },
  {
    "route": "/client/picker",
    "rewrite": "/client/index.html"
  },
  {
    "route": "/client/prebuilts",
    "rewrite": "/client/index.html"
  },
  {
    "route": "/client/peripherals",
    "rewrite": "/client/index.html"
  },
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
      if (isAuthenticatedAdmin()) {
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
        path: 'pedidos',
        name: 'Pedidos',
        component: TodosOsPedidos
      },
      {
        path: 'admins',
        name: 'Admins',
        component: AdminsList
      },
      {
        path: 'analiseFinanceira',
        name: 'AnaliseFinanceira',
        component: AnaliseFinanceira
      }, 
      {
        path: 'landingPageBeta',
        name: 'LandingPageBeta',
        component: LandingPageBeta
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/client' 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
