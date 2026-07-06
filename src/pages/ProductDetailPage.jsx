import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../api/products'
import { getProductImage } from '../utils/image'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Spinner, ErrorMessage } from '../components/Feedback'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { isLoggedIn } = useAuth()
  const { addItem, isAdding } = useCart()
  const { addToast } = useToast()
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [imgIdx, setImgIdx] = useState(0)

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  })

  if (isLoading) return <div className="max-w-6xl mx-auto px-4 py-8"><Spinner /></div>
  if (isError) return <div className="max-w-6xl mx-auto px-4 py-8"><ErrorMessage message="Product not found." /></div>

  const variant = selectedVariant ?? product.variants?.[0]
  const price = variant?.price ?? product.price
  const rawImages = product.images?.length
    ? product.images.map((img) => img.url || img)
    : (variant?.images?.map((img) => img.url || img) ?? [])
  const images = rawImages.length ? rawImages : [getProductImage(product.name, 600)]

  const handleAdd = () => {
    if (!isLoggedIn) { addToast('Please login to add items to cart', 'error'); return }
    const productWithVariant = selectedVariant
      ? { ...product, variants: [selectedVariant, ...product.variants.filter(v => v.id !== selectedVariant.id)] }
      : product
    addItem(productWithVariant)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 h-80 flex items-center justify-center overflow-hidden">
            <img src={images[imgIdx]} alt={product.name} className="max-h-full max-w-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-colors ${i === imgIdx ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {product.category?.name} · {product.brand}
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{product.name}</h1>
          </div>

          {product.avgRating && (
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(Math.round(product.avgRating))}{'☆'.repeat(5 - Math.round(product.avgRating))}
              <span className="text-slate-500 dark:text-slate-400 ml-1">({product.avgRating.toFixed(1)})</span>
            </div>
          )}

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>

          {product.variants?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Options</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                      (selectedVariant?.id ?? product.variants[0]?.id) === v.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                    }`}
                  >
                    {v.color}{v.size ? ` / ${v.size}` : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">${price.toFixed(2)}</span>
            <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding || product.stock === 0}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            {isAdding ? 'Adding…' : product.variants?.length > 0 ? 'Add to Cart' : 'Buy Now'}
          </button>
        </div>
      </div>

      {product.comments?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Reviews</h2>
          <div className="flex flex-col gap-4">
            {product.comments.map((c) => (
              <div key={c.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{c.user?.email?.split('@')[0] ?? 'User'}</span>
                  {c.rating && <span className="text-amber-400 text-xs">{'★'.repeat(c.rating)}</span>}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
