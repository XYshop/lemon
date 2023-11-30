import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/shop'
  },
  // {
  //   path: '/main',
  //   name: 'main',
  //   component: () => import('@/')
  // },
  {
    path: '/shop',
    component: () => import('../views/shop/Shop.vue'),
    children: [
      {
        path: '',
        meta: {name: 'joy', age: 18},
        component: () => import('../views/shop/product-list/ProductList.vue')
      },
      {
        path: 'product',
        name: 'product',
        // component: () => import('@/views/router-demo/shop/Shopping.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        // component: () => import('@/components/product/ProductDetails.vue'),
        beforeEnter: () => {
          console.log('beforeEnter, I am beforeEnter!')
        }
      },
      {
        path: 'cart',
        name: 'cart',
        // component: () => import('@/views/router-demo/cart/ShoppingCart.vue')
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
  routes: routes
})

router.beforeEach(() => console.log('beforeEach, I listen to each route!'))

router.beforeResolve(() =>
    console.log('beforeResolve, I resolve for each route!')
)

router.afterEach(() => console.log('beforeResolve, over!'))

export default router

