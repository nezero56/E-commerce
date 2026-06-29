import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../api/products'
import { useCart } from '../context/CartContext'

export default function ProductsPage() {
  const [category, setCategory] = useState('')

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  })

  const { addToCart } = useCart()

  if (isLoading) return <div className="status">Loading products…</div>
  if (isError) return <div className="status error">Failed to load products.</div>

  return (
    <div className="page">
      <div className="category-filter">
        <button
          className={`filter-btn ${category === '' ? 'active' : ''}`}
          onClick={() => setCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-img" />
              <h3 className="product-title">{product.title}</h3>
            </Link>
            <div className="product-footer">
              <span className="product-price">${product.price.toFixed(2)}</span>
              <button className="btn-primary" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
