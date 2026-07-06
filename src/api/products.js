import client from './client'

export const fetchProducts = ({ page = 1, limit = 12, search = '', categoryId = '' } = {}) => {
  if (categoryId) {
    return client
      .get(`/api/public/products/category/${categoryId}`, { params: { page, limit } })
      .then((r) => ({
        products: r.data.data,
        pagination: r.data.pagination,
      }))
  }
  const params = { page, limit }
  if (search) params.search = search
  return client.get('/api/public/products', { params }).then((r) => ({
    products: r.data.data.all,
    grouped: r.data.data.grouped,
    pagination: r.data.pagination,
  }))
}

export const fetchProduct = (id) =>
  client.get(`/api/public/products/${id}`).then((r) => r.data.data.product)

export const fetchCategories = () =>
  client.get('/api/categories').then((r) => r.data.data)
