import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchOrder } from '../api/orders'
import { getProductImage } from '../utils/image'
import { Spinner, ErrorMessage } from '../components/Feedback'

const STATUS_COLORS = {
  PENDING: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  PAID: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  SHIPPED: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  DELIVERED: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  CANCELLED: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
}

export default function OrderDetailPage() {
  const { id } = useParams()

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id),
  })

  if (isLoading) return <div className="max-w-6xl mx-auto px-4 py-8"><Spinner /></div>
  if (isError) return <div className="max-w-6xl mx-auto px-4 py-8"><ErrorMessage message="Order not found." /></div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/orders" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
        ← Back to Orders
      </Link>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 mb-6 flex items-center gap-3">
        <span className="text-2xl">🎉</span>
        <div>
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">Order confirmed!</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Order #{order.id.slice(-8).toUpperCase()} · {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_COLORS[order.status] ?? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'}`}>
          {order.status}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Items ordered</p>
        </div>
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <img
              src={getProductImage(item.product?.name, 60)}
              alt={item.product?.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-slate-100 dark:bg-slate-700"
            />
            <div className="flex-1">
              <p className="font-medium text-slate-800 dark:text-slate-100 text-sm">{item.product?.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Qty: {item.quantity} · ${item.price.toFixed(2)} each</p>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex justify-between items-center">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Total</span>
        <span className="text-2xl font-bold text-slate-900 dark:text-white">${order.total.toFixed(2)}</span>
      </div>

      <div className="flex gap-3 mt-6">
        <Link to="/" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
          Continue Shopping
        </Link>
        <Link to="/orders" className="flex-1 text-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl transition-colors">
          View All Orders
        </Link>
      </div>
    </div>
  )
}
