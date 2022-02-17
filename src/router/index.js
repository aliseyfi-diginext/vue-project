import { createRouter, createWebHistory } from 'vue-router'


// در این قسمت فایل های ویو مورد نیازمان را ایمپورت میکنیم
import HomeView from '../views/HomeView.vue'
import BMIView from '../views/BMIView.vue'
import ProductView from '../views/ProductView.vue'
import QuizView from '../views/QuizView.vue'
import PeopleInSpaceView from '../views/PeopleInSpaceView.vue'
import TaskManagerView from '../views/TaskManagerView.vue'

// در این قسمت روت های مورد نیازمان را تعریف میکنیم
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
    {
      path: '/task-manager',
      name: 'task-manager',
      component: TaskManagerView
    },
  ]
})

// توجه داشته باشید که در فایل
// index.html
// چون هنگام ضمیمه کردن این فایل از
// type=module
// استفاده کردیم
// این فایل باید حتما یک اکسپورت دیفالت داشته باشد

export default router
