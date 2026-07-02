import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--dark)',
      color: 'white',
      padding: '60px 0 24px'
    }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 400px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-brand {
            grid-column: 1;
          }
        }
      `}</style>

      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36,
                background: 'var(--primary)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
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
              <Link
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
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
            <p style={{ color: '#9ca3af', marginBottom: 8, wordBreak: 'break-word' }}>📧 support@appointy.com</p>
            <p style={{ color: '#9ca3af', marginBottom: 8 }}>📞 +91 7006836670 </p>
            <p style={{ color: '#9ca3af' }}>🕒 24/7 Available </p>
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
