import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginUser(data.token, form.username)
      navigate('/')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="page center">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {mutation.isError && (
          <p className="error-msg">Invalid credentials. Try: mor_2314 / 83r5^_</p>
        )}
        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="current-password"
          />
        </label>
        <button className="btn-primary" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in…' : 'Login'}
        </button>
        <p className="login-hint">Demo: <code>mor_2314</code> / <code>83r5^_</code></p>
      </form>
    </div>
  )
}
