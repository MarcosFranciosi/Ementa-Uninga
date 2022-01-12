import { createRouter, createWebHistory } from 'vue-router'
import cadastro from '../views/Cadastro.vue'
import login from '../views/Login.vue'
import cadastroEmenta from '../views/CadastroEmenta.vue'
import cadastrarProva from '../views/CadastrarProva.vue'
import home from '../views/Home.vue'
import store from '../store'
 
const routes = [

  {
    path: '/cadastro/:name?',
    name: 'Cadastro',
    component: cadastro
  },

  {
    path: '/',
    name: 'Login',
    component: login
  },

  {
    path: '/cadastro-ementa/:id?',
    name: 'Cadastrar-Ementa',
    component: cadastroEmenta
  },

  {
    path: '/cadastrar-prova/:id?',
    name: 'Cadastrar-Prova',
    component: cadastrarProva
  },

  {
    path: '/home',
    name: 'Home',
    component: home
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.usuario_logado.id) {
    return next({name: 'Login'});
  }
  return next();
});

export default router
