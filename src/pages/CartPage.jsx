import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { placeOrder } from '../api/orders'
import { getProductImage } from '../utils/image'
import { Spinner, EmptyState } from '../components/Feedback'

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem, clearCart } = useCart()
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const orderMutation = useMutation({
    mutationFn: () => placeOrder(),
    onSuccess: (order) => {
      qc.invalidateQueries({ queryKey: ['cart', user.id] })
      qc.invalidateQueries({ queryKey: ['orders'] })
      addToast('Order placed successfully! 🎉')
      navigate(`/orders/${order.id}`)
    },
    onError: (err) => addToast(err.message, 'error'),
  })

  if (isLoading) return <div className="max-w-6xl mx-auto px-4 py-8"><Spinner /></div>

  const items = cart?.items ?? []

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <EmptyState message="Your cart is empty." />
        <div className="flex justify-center mt-4">
          <Link to="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-slate-400 hover:text-red-500 transition-colors">
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <img
              src={getProductImage(item.productName, 80)}
              alt={item.productName}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-slate-100 dark:bg-slate-700"
            />
            <div className="flex-1 min-w-0">
              <Link to={`/products/${item.productId}`} className="font-medium text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                {item.productName}
              </Link>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {item.variant?.color}{item.variant?.size ? ` / ${item.variant.size}` : ''} · ${item.unitPrice.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-semibold text-slate-800 dark:text-slate-100">{item.quantity}</span>
              <button
                onClick={() => updateItem(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                +
              </button>
            </div>
            <span className="font-bold text-slate-900 dark:text-white w-20 text-right">${item.subtotal.toFixed(2)}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors ml-1"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-600 dark:text-slate-300">Subtotal ({cart.itemCount} items)</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">${cart.total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => orderMutation.mutate()}
          disabled={orderMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {orderMutation.isPending ? 'Placing order…' : 'Place Order'}
        </button>
        <Link to="/" className="block text-center text-sm text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mt-3 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
