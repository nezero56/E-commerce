import client from './client'

export const fetchCart = () =>
  client.get('/api/auth/cart').then((r) => r.data.data.cart)

export const addCartItem = ({ productId, variantId, quantity = 1 }) =>
  client.post('/api/auth/cart/items', { productId, variantId, quantity }).then((r) => r.data.data.cart)

export const updateCartItem = ({ itemId, quantity }) =>
  client.patch(`/api/auth/cart/items/${itemId}`, { quantity }).then((r) => r.data.data.cart)

export const removeCartItem = ({ itemId }) =>
  client.delete(`/api/auth/cart/items/${itemId}`).then((r) => r.data)

export const clearCart = () =>
  client.delete('/api/auth/cart').then((r) => r.data)
