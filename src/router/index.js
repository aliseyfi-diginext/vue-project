import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BMIView from '../views/BMIView.vue'
import ProductView from '../views/ProductView.vue'
import QuizView from '../views/QuizView.vue'
import PeopleInSpaceView from '../views/PeopleInSpaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/bmi',
      name: 'bmi',
      component: BMIView
    },
    {
      path: '/people-in-space',
      name: 'people-in-space',
      component: PeopleInSpaceView
    },
    {
      path: '/quiz/:number?',
      name: 'iqtest',
      component: QuizView
    },
  ]
})

export default router
