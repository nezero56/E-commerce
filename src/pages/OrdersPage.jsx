import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api/orders'
import { useAuth } from '../context/AuthContext'
import { Spinner, ErrorMessage, EmptyState } from '../components/Feedback'

const STATUS_COLORS = {
  PENDING: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  PAID: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  SHIPPED: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  DELIVERED: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  CANCELLED: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
}

export default function OrdersPage() {
  const { user } = useAuth()

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: !!user,
  })

  if (isLoading) return <div className="max-w-6xl mx-auto px-4 py-8"><Spinner /></div>
  if (isError) return <div className="max-w-6xl mx-auto px-4 py-8"><ErrorMessage message="Failed to load orders." /></div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Order History</h1>

      {!orders?.length ? (
        <EmptyState message="You haven't placed any orders yet." />
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Order #{order.id.slice(-8).toUpperCase()}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {order.status}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">${order.total.toFixed(2)}</span>
                <span className="text-slate-300 dark:text-slate-600">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
