import {createPinia} from "pinia";

const pinia = createPinia()

const stores = [];

// (async () => {
//   const modules = import.meta.glob('../store/*/index.js')
//   for (const path in modules) {
//     const module = await modules[path]()
//     console.log(path, module)
//     stores.push(module)
//   }
// })()

export default pinia

export * from "./product"


