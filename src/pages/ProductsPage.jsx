import { useState, useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../api/products'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'
import { Spinner, ErrorMessage, EmptyState } from '../components/Feedback'

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
]

const PRICE_GROUPS = [
  { value: '', label: 'All Prices' },
  { value: 'under50', label: 'Under $50' },
  { value: 'between50And150', label: '$50 – $150' },
  { value: 'over150', label: 'Over $150' },
]

function sortProducts(products, sort) {
  if (!sort) return products
  const sorted = [...products]
  if (sort === 'price-asc') return sorted.sort((a, b) => (a.variants?.[0]?.price ?? a.price) - (b.variants?.[0]?.price ?? b.price))
  if (sort === 'price-desc') return sorted.sort((a, b) => (b.variants?.[0]?.price ?? b.price) - (a.variants?.[0]?.price ?? a.price))
  if (sort === 'name-asc') return sorted.sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'name-desc') return sorted.sort((a, b) => b.name.localeCompare(a.name))
  return sorted
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [priceGroup, setPriceGroup] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)

  const { isLoggedIn } = useAuth()
  const { addItem, isAdding } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [search])

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['products', { page, search: debouncedSearch, categoryId }],
    queryFn: () => fetchProducts({ page, limit: 12, search: debouncedSearch, categoryId }),
    placeholderData: keepPreviousData,
  })

  const handleAdd = (product) => {
    if (!isLoggedIn) { addToast('Please login to add items to cart', 'error'); return }
    addItem(product)
  }

  const handleCategoryChange = (id) => {
    setCategoryId(id)
    setPage(1)
    setSearch('')
    setDebouncedSearch('')
    setPriceGroup('')
  }

  const categories = categoriesData
    ? [...new Map(categoriesData.map((c) => [c.name, c])).values()]
    : []

  let rawProducts = data?.products ?? []
  if (priceGroup && !categoryId && data?.grouped) {
    rawProducts = data.grouped[priceGroup] ?? []
  }
  const products = sortProducts(rawProducts, sort)
  const pagination = data?.pagination

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            categoryId === ''
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              categoryId === cat.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Price range filter */}
      {!categoryId && (
        <div className="flex flex-wrap gap-2 mb-8">
          {PRICE_GROUPS.map((g) => (
            <button
              key={g.value}
              onClick={() => setPriceGroup(g.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                priceGroup === g.value
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorMessage message="Failed to load products. Please try again." />
      ) : products.length === 0 ? (
        <EmptyState message="No products found. Try a different search or filter." />
      ) : (
        <>
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
                isAdding={isAdding}
              />
            ))}
          </div>

          {!priceGroup && pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                ← Prev
              </button>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
