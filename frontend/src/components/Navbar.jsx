import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--primary)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontSize: 20 }}>🏥</span>
          </div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--primary)'
          }}>Appointy</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/doctors', label: 'Doctors' },
            { path: '/about', label: 'About' },
          ].map(({ path, label }) => (
            <NavLink key={path} to={path} style={({ isActive }) => ({
              color: isActive ? 'var(--primary)' : 'var(--grey)',
              fontWeight: isActive ? 600 : 400,
              fontSize: 15,
              transition: 'color 0.2s'
            })}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {token && userData ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--primary-light)',
                  border: 'none', borderRadius: 50,
                  padding: '8px 16px 8px 8px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={userData.image}
                  alt="profile"
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 500 }}>
                  {userData.name?.split(' ')[0]}
                </span>
                <span style={{ fontSize: 10, color: 'var(--primary)' }}>▼</span>
              </button>
              {menuOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '110%',
                  background: 'white', borderRadius: 12,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  padding: '8px 0', minWidth: 180,
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {[
                    { label: '👤 My Profile', path: '/my-profile' },
                    { label: '📅 My Appointments', path: '/my-appointments' },
                  ].map(({ label, path }) => (
                    <button
                      key={path}
                      onClick={() => { navigate(path); setMenuOpen(false) }}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '10px 20px', background: 'none',
                        border: 'none', cursor: 'pointer', fontSize: 14,
                        color: 'var(--dark)', transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.target.style.background = 'var(--light)'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                    >
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                  <button
                    onClick={logout}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '10px 20px', background: 'none',
                      border: 'none', cursor: 'pointer', fontSize: 14,
                      color: '#ef4444'
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
