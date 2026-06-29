import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../api/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  })

  if (isLoading) return <div className="status">Loading…</div>
  if (isError) return <div className="status error">Product not found.</div>

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to Shop</Link>
      <div className="detail-layout">
        <img src={product.image} alt={product.title} className="detail-img" />
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <div className="detail-rating">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-footer">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <button className="btn-primary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
