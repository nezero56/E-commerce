import client from './client'

export const fetchProducts = (category) =>
  client
    .get(category ? `/products/category/${encodeURIComponent(category)}` : '/products')
    .then((r) => r.data)

export const fetchProduct = (id) => client.get(`/products/${id}`).then((r) => r.data)

export const fetchCategories = () => client.get('/products/categories').then((r) => r.data)
