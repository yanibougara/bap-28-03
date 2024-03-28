import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue"
import SingleAsso from "../views/SingleAsso.vue"
import SearchAsso from "../views/Search.vue"
import SingleEvent from "../views/SingleEvent.vue"
import SearchEvent from "../views/SearchEvent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
    },
    {
      name: 'SingleAsso',
      path: '/association/:id',
      component: SingleAsso,
    },
    {
      name: 'SearchAsso',
      path: '/search',
      component: SearchAsso,
    },
    {
      name: 'SingleEvent',
      path: '/event/:id',
      component: SingleEvent,
    },
    {
      name: 'SearchEvent',
      path: '/searchEvent',
      component: SearchEvent,
    },
  ]
})

export default router