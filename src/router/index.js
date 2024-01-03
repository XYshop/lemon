import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/number',
    name: 'number',
    component: () => import('../views/animation/Number.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/shopping',
    component: () => import('../views/shop/Shop.vue'),
    children: [
      {
        path: '',
        meta: { name: 'joy', age: 18 },
        component: () => import('../views/shop/product-list/ProductList.vue')
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('../views/shop/product-list/ProductList.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../components/shopping/Product.vue'),
        beforeEnter: () => {
          console.log('beforeEnter, I am beforeEnter!')
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/shop/shopping-cart/ShoppingCart.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/not-found/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (!window.localStorage.getItem('token') && to.path !== '/login') {
    return { name: 'login' }
  }
})

router.beforeResolve(() =>
  console.log('beforeResolve, I resolve for each route!')
)

router.afterEach(() => console.log('beforeResolve, over!'))

export default router
