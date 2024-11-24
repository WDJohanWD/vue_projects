import { createRouter, createWebHashHistory } from 'vue-router'
import PaginaInicio  from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import TablaContacto from '@/components/TablaContacto.vue'
import TablaEmpleo    from '@/components/TablaEmpleo.vue'
import NotFound from '@/components/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TablaClientes
  }, 
  {
    path: '/contacto',
    name: 'contacto',
    component: TablaContacto
  },
  {
    path: '/:pathMatch(.*)*',
    name:'NotFound',
    component: NotFound
  },
  {
    path: '/empleo',
    name: 'empleo',
    component: TablaEmpleo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
