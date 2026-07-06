import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchCart, addCartItem, updateCartItem, removeCartItem, clearCart } from '../api/cart'
import { buyNow } from '../api/orders'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export function useCart() {
  const { user } = useAuth()
  const qc = useQueryClient()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: fetchCart,
    enabled: !!user,
  })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['cart', user?.id] })

  const addMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => { invalidate(); addToast('Added to cart!') },
    onError: (err) => addToast(err.message, 'error'),
  })

  const buyNowMutation = useMutation({
    mutationFn: buyNow,
    onSuccess: (order) => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      addToast('Order placed! 🎉')
      navigate(`/orders/${order.id}`)
    },
    onError: (err) => addToast(err.message, 'error'),
  })

  const updateMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: invalidate,
    onError: (err) => addToast(err.message, 'error'),
  })

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => { invalidate(); addToast('Item removed') },
    onError: (err) => addToast(err.message, 'error'),
  })

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: invalidate,
    onError: (err) => addToast(err.message, 'error'),
  })

  const addItem = (product) => {
    const firstVariant = product.variants?.[0]
    if (firstVariant) {
      addMutation.mutate({ productId: product.id, variantId: firstVariant.id })
    } else {
      buyNowMutation.mutate({ productId: product.id, quantity: 1 })
    }
  }

  return {
    cart,
    isLoading,
    itemCount: cart?.itemCount ?? 0,
    addItem,
    updateItem: (itemId, quantity) => updateMutation.mutate({ itemId, quantity }),
    removeItem: (itemId) => removeMutation.mutate({ itemId }),
    clearCart: () => clearMutation.mutate(),
    isAdding: addMutation.isPending || buyNowMutation.isPending,
  }
}
