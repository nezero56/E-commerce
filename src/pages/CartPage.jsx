import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="page center">
        <p>Your cart is empty.</p>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <Link to={`/products/${item.id}`} className="cart-item-title">{item.title}</Link>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <div className="cart-item-controls">
              <button
                className="qty-btn"
                onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeFromCart(item.id)}
              >
                −
              </button>
              <span>{item.qty}</span>
              <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              <button className="btn-ghost remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
            <span className="cart-item-subtotal">${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <button className="btn-ghost" onClick={clearCart}>Clear Cart</button>
        <div className="cart-total">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
          <button className="btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  )
}
