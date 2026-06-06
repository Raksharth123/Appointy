import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d4d3e 100%)',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '2.8rem', marginBottom: 16 }}>
            About Appointy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto' }}>
            Connecting patients with the right doctors, effortlessly.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="container" style={{ padding: '80px 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 64, alignItems: 'center', marginBottom: 80
        }}>
          <div>
            <span className="badge" style={{ marginBottom: 16, display: 'inline-block' }}>Our Mission</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 16 }}>
              Healthcare Made Simple
            </h2>
            <p style={{ color: 'var(--grey)', lineHeight: 1.8, marginBottom: 16 }}>
              Appointy was built with one goal: make accessing quality healthcare as easy as possible. We believe no one should struggle to find or book a doctor.
            </p>
            <p style={{ color: 'var(--grey)', lineHeight: 1.8 }}>
              Our platform connects patients with verified, experienced doctors across multiple specialities, enabling instant appointment booking from the comfort of your home.
            </p>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
          }}>
            {[
              { icon: '🎯', title: 'Trusted Doctors', desc: 'All doctors are verified and experienced' },
              { icon: '⚡', title: 'Instant Booking', desc: 'Book appointments in under a minute' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your health data stays protected' },
              { icon: '📱', title: 'Easy to Use', desc: 'Simple interface for all ages' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--primary-light)',
                borderRadius: 16, padding: 24
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ marginBottom: 6, color: 'var(--dark)' }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--grey)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'var(--primary)',
          borderRadius: 24, padding: '48px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.8rem', marginBottom: 12 }}>
            Start Your Health Journey Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>
            Join thousands of patients who trust Appointy
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/doctors')}
            style={{ background: 'white', color: 'var(--primary)', fontSize: 16 }}
          >
            Find a Doctor →
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
