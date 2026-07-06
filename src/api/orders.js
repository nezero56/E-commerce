import client from './client'

export const placeOrder = () =>
  client.post('/api/auth/orders').then((r) => r.data.data.order)

export const buyNow = ({ productId, variantId, quantity = 1 }) =>
  client.post('/api/auth/orders/buy', { productId, variantId, quantity }).then((r) => r.data.data.order)

export const fetchOrders = () =>
  client.get('/api/auth/orders').then((r) => r.data.data)

export const fetchOrder = (id) =>
  client.get(`/api/auth/orders/${id}`).then((r) => r.data.data.order)
