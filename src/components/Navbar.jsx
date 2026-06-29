import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { totalItems } = useCart()
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Ecomus</Link>
      <div className="nav-links">
        <Link to="/">Shop</Link>
        {isLoggedIn ? (
          <>
            <span className="nav-user">Hi, {user}</span>
            <button onClick={handleLogout} className="btn-ghost">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart" className="cart-link">
          🛒 <span className="cart-badge">{totalItems}</span>
        </Link>
      </div>
    </nav>
  )
}
