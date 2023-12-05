import Koa from 'koa'
import { koaBody } from 'koa-body'
import Router from '@koa/router'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = new Koa()
const router = new Router()

const filePath = fileURLToPath(import.meta.url)

const PRODUCT_DATA_FILE = path.join(
  dirname(filePath),
  '/public/static/shopping/server-product-data.json'
)

const CART_DATA_FILE = path.join(
  dirname(filePath),
  '/public/static/shopping/server-cart-data.json'
)

// A fake API token our server validates
const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA'

const authenticatedRoute = async (ctx, next) => {
  const token = JSON.parse(ctx.request.header.authorization)
  if (token) {
    if (token === API_TOKEN) {
      await next()
    } else {
      ctx.body = {
        code: -1,
        error: 'Invalid token provided'
      }
    }
  } else {
    return ctx.status(403).json({
      success: false,
      error: 'No token provided. Supply token as query param `token`'
    })
  }
}

const FAKE_DELAY = 500 // ms

/**
 * @name router
 * @description routes for router
 */

router.post('/login', async (ctx) => {
  ctx.body = {
    code: 0,
    message: 'success',
    token: API_TOKEN
  }
})

router.get('/shop', authenticatedRoute, async (ctx) => {
  const data = fs.readFileSync(PRODUCT_DATA_FILE, 'utf-8')
  ctx.body = {
    code: 0,
    message: 'success',
    data: JSON.parse(data)
  }
})

router.get('/cart', authenticatedRoute, async (ctx) => {
  const data = fs.readFileSync(CART_DATA_FILE, 'utf-8')
  ctx.body = {
    code: 0,
    message: 'success',
    data: JSON.parse(data)
  }
})

router.get('/product/details/:id', async (ctx) => {
  const data = fs.readFileSync(PRODUCT_DATA_FILE, 'utf-8')
  const id = ctx.request.params.id
  const res = JSON.parse(data).find((item) => item.id === Number(id))
  ctx.body = {
    code: 0,
    message: 'success',
    data: res
  }
})

router.post('/cart/add', async (ctx) => {
  const body = JSON.parse(ctx.request.body)
  if (body) {
    const data = fs.readFileSync(CART_DATA_FILE, 'utf-8')
    const cartProducts = JSON.parse(data)
    const newCartProduct = {
      id: body.id,
      title: body.title,
      description: body.description,
      price: body.price,
      image_tag: body.image_tag,
      quantity: 1
    }
    let cartProductExists = false
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.quantity++
        cartProductExists = true
      }
    })
    if (!cartProductExists) cartProducts.push(newCartProduct)
    fs.writeFileSync(CART_DATA_FILE, JSON.stringify(cartProducts))
    ctx.body = {
      code: 0,
      data: null,
      message: 'success'
    }
  } else {
    ctx.body = {
      code: 1,
      data: null,
      message: 'parameters not exist'
    }
  }
})

router.delete('/cart/delete/:id', async (ctx) => {
  const id = ctx.request.params.id
  if (id) {
    const data = fs.readFileSync(CART_DATA_FILE, 'utf-8')
    const cartProduct = JSON.parse(data)
    cartProduct.forEach((item) => {
      if (item.id === Number(id) && item.quantity > 1) {
        item.quantity--
      } else if (item.id === Number(id) && item.quantity === 1) {
        const index = cartProduct.findIndex((item) => item.id === Number(id))
        cartProduct.splice(index, 1)
      }
    })
    fs.writeFileSync(CART_DATA_FILE, JSON.stringify(cartProduct))
    ctx.body = {
      code: 0,
      data: null,
      message: 'success'
    }
  } else {
    ctx.body = {
      code: 1,
      data: null,
      message: 'error to delete'
    }
  }
})

router.delete('/cart/empty', async (ctx) => {
  console.log(123)
  const emptyCart = []
  fs.writeFileSync(CART_DATA_FILE, JSON.stringify(emptyCart))
  ctx.body = {
    code: 0,
    data: null,
    message: 'success'
  }
})

app
  .use(koaBody({ jsonLimit: '0.5kb' }))
  .use(router.routes())
  .listen(3000)
