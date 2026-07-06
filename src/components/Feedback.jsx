export function Spinner({ className = '' }) {
  return (
    <div className={`flex justify-center items-center py-16 ${className}`}>
      <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin" />
    </div>
  )
}

export function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center py-16 gap-2 text-red-500 dark:text-red-400">
      <span className="text-3xl">⚠️</span>
      <p className="font-medium">{message}</p>
    </div>
  )
}

export function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="flex flex-col items-center py-16 gap-2 text-slate-400 dark:text-slate-500">
      <span className="text-4xl">🛍️</span>
      <p>{message}</p>
    </div>
  )
}
