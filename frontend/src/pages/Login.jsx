import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' or 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'register') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, form)
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created!')
          navigate('/')
        } else toast.error(data.message)
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, form)
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Welcome back!')
          navigate('/')
        } else toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary-light) 0%, white 100%)',
      padding: '40px 24px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 24,
        boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
        padding: '48px',
        width: '100%',
        maxWidth: 420,
        animation: 'fadeInUp 0.5s ease'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56,
            background: 'var(--primary)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: 28
          }}>🏥</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--grey)', fontSize: 14, marginTop: 4 }}>
            {mode === 'login' ? 'Sign in to your account' : 'Join Appointy today'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{
          display: 'flex', background: 'var(--light)',
          borderRadius: 12, padding: 4, marginBottom: 28
        }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1, padding: '10px',
                borderRadius: 10, border: 'none',
                background: mode === m ? 'white' : 'transparent',
                color: mode === m ? 'var(--primary)' : 'var(--grey)',
                fontWeight: mode === m ? 600 : 400,
                fontSize: 14, cursor: 'pointer',
                boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '2px solid var(--border)', borderRadius: 12,
                  fontSize: 15, transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{
                width: '100%', padding: '12px 16px',
                border: '2px solid var(--border)', borderRadius: 12,
                fontSize: 15, transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{
                width: '100%', padding: '12px 16px',
                border: '2px solid var(--border)', borderRadius: 12,
                fontSize: 15, transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', fontSize: 16, padding: '14px', borderRadius: 12 }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
