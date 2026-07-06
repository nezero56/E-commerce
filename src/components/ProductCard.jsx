import { Link } from 'react-router-dom'
import { getProductImage } from '../utils/image'

export default function ProductCard({ product, onAdd, isAdding }) {
  const rawImg = product.images?.[0]?.url || product.variants?.[0]?.images?.[0]?.url
  const image = rawImg || getProductImage(product.name)
  const firstVariant = product.variants?.[0]
  const price = firstVariant?.price ?? product.price
  const hasVariants = product.variants?.length > 0

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
      <Link to={`/products/${product.id}`} className="block overflow-hidden bg-slate-50 dark:bg-slate-700 h-52">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">
          {product.category?.name || product.brand}
        </span>
        <Link to={`/products/${product.id}`} className="font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 leading-snug">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-slate-900 dark:text-white">${price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            disabled={isAdding}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            {isAdding ? '…' : hasVariants ? '+ Cart' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
