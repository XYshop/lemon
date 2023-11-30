import Koa from 'koa'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = new Koa()

const filePath = fileURLToPath(import.meta.url)

const PRODUCT_DATA_FILE = path.join(
    dirname(filePath),
    '/public/static/shopping/server-product-data.json'
)

app.use(async (ctx, next) => {
  if (ctx.request.url === "/shop") {
    const data = fs.readFileSync(PRODUCT_DATA_FILE, 'utf-8')
    ctx.body = {
      code: 0,
      message: 'success',
      data: JSON.parse(data)
    }
  }
})

app.listen(3000)
