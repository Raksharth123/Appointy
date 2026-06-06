import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--dark)',
      color: 'white',
      padding: '60px 0 24px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: 48,
          marginBottom: 48
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36,
                background: 'var(--primary)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ fontSize: 20 }}>🏥</span>
              </div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700 }}>
                Appointy
              </span>
            </div>
            <p style={{ color: '#9ca3af', lineHeight: 1.8, maxWidth: 280 }}>
              Your trusted platform for booking doctor appointments. Quality healthcare, made simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: 16, fontFamily: 'Playfair Display, serif' }}>Quick Links</h4>
            {['Home', 'Doctors', 'About'].map(link => (
              <Link key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                style={{ display: 'block', color: '#9ca3af', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#9ca3af'}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ marginBottom: 16, fontFamily: 'Playfair Display, serif' }}>Contact</h4>
            <p style={{ color: '#9ca3af', marginBottom: 8 }}>📧 support@appointy.com</p>
            <p style={{ color: '#9ca3af', marginBottom: 8 }}>📞 +91 98765 43210</p>
            <p style={{ color: '#9ca3af' }}>🕒 Mon–Sat, 9am–6pm</p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: 24,
          textAlign: 'center',
          color: '#6b7280',
          fontSize: 14
        }}>
          © {new Date().getFullYear()} Appointy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
