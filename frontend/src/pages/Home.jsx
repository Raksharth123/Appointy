import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const SPECIALITIES = [
  { name: 'General physician', icon: '🩺' },
  { name: 'Gynecologist', icon: '👶' },
  { name: 'Dermatologist', icon: '🌿' },
  { name: 'Pediatricians', icon: '🧒' },
  { name: 'Neurologist', icon: '🧠' },
  { name: 'Gastroenterologist', icon: '💊' },
]

const SUCCESS_STORIES = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    condition: 'Chronic Migraines',
    story: 'I had been suffering from migraines for 3 years. Within a week of booking through Appointy, I finally got the right neurologist and a treatment plan that changed my life.',
    avatar: '👩',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    location: 'Delhi',
    condition: 'Heart Checkup',
    story: 'My father needed an urgent cardiology appointment. Appointy helped us book a top cardiologist the same day. The process was so smooth during a very stressful time.',
    avatar: '👨',
    rating: 5,
  },
  {
    name: 'Ananya Iyer',
    location: 'Bangalore',
    condition: 'Skin Condition',
    story: 'After months of struggling with a skin issue, I found an amazing dermatologist on Appointy. Three appointments later, my skin is completely healed. So grateful!',
    avatar: '👩🏽',
    rating: 5,
  },
]

const Home = () => {
  const { doctors, token } = useContext(AppContext)  // ✅ added token
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d4d3e 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)'
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)'
        }} />

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          position: 'relative', zIndex: 1
        }}>
          <div className="animate-fadeInUp">
            <span className="badge" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              marginBottom: 20,
              display: 'inline-block'
            }}>
              🌟 Trusted by 10,000+ patients
            </span>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '3rem',
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 20
            }}>
              Book Appointments<br />
              <span style={{ color: '#86efac' }}>With Ease</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: 32, maxWidth: 400 }}>
              Connect with top doctors in your area. Book appointments online in just a few clicks.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                className="btn-primary"
                onClick={() => navigate('/doctors')}
                style={{ background: 'white', color: 'var(--primary)' }}
              >
                Find Doctors →
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate('/about')}
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Mission Statement */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 24,
            padding: 36,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            position: 'relative'
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>❤️</div>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.4rem',
              color: 'white',
              lineHeight: 1.6,
              marginBottom: 20,
              fontStyle: 'italic'
            }}>
              "We built Appointy because everyone deserves access to great healthcare — without the wait, without the hassle."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20
              }}>👨‍💼</div>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>Raksharth, Founder</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Appointy Health</div>
              </div>
            </div>
            <div style={{
              marginTop: 24,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              gap: 24
            }}>
              {[
                { icon: '🎯', text: 'Our Mission', sub: 'Healthcare for everyone' },
                { icon: '🌱', text: 'Our Vision', sub: 'A healthier India' },
              ].map(item => (
                <div key={item.text}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{item.text}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patient Success Stories */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 12, display: 'inline-block' }}>Real Stories</span>
            <h2 className="section-title">Lives We've Touched</h2>
            <p className="section-subtitle">Hear from patients whose lives changed after using Appointy</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 28
          }}>
            {SUCCESS_STORIES.map((story, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: 20,
                padding: 28,
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 16, right: 20,
                  fontSize: 60, color: '#e5e7eb',
                  fontFamily: 'Georgia, serif', lineHeight: 1,
                  userSelect: 'none'
                }}>"</div>
                <div style={{ marginBottom: 12 }}>
                  {'⭐'.repeat(story.rating)}
                </div>
                <span style={{
                  background: '#dcfce7',
                  color: '#16a34a',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 20,
                  display: 'inline-block',
                  marginBottom: 14
                }}>
                  {story.condition}
                </span>
                <p style={{
                  color: '#4b5563',
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 20
                }}>
                  {story.story}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), #0d4d3e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22
                  }}>
                    {story.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: 14 }}>{story.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: 12 }}>📍 {story.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialities */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 12, display: 'inline-block' }}>Browse by Category</span>
            <h2 className="section-title">Find by Speciality</h2>
            <p className="section-subtitle">Choose from our wide range of medical specialities</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 16
          }}>
            {SPECIALITIES.map(spec => (
              <div
                key={spec.name}
                onClick={() => navigate(`/doctors/${spec.name}`)}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '24px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '2px solid var(--border)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(26,107,90,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{spec.icon}</div>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--dark)', lineHeight: 1.4 }}>{spec.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section style={{ padding: '0 0 80px', background: 'var(--light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48, paddingTop: 48 }}>
            <span className="badge" style={{ marginBottom: 12, display: 'inline-block' }}>Our Team</span>
            <h2 className="section-title">Top Doctors</h2>
            <p className="section-subtitle">Book appointments with the most trusted doctors</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            marginBottom: 48
          }}>
            {doctors.slice(0, 8).map(doc => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-outline" onClick={() => navigate('/doctors')}>
              View All Doctors →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'var(--primary)',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            color: 'white',
            marginBottom: 12
          }}>
            Ready to Book Your Appointment?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>
            Join thousands of patients who trust Appointy for their healthcare needs.
          </p>
          {/* ✅ FIXED: goes to /doctors if logged in, /login if not */}
          <button
            className="btn-primary"
            onClick={() => navigate(token ? '/doctors' : '/login')}
            style={{ background: 'white', color: 'var(--primary)', fontSize: 16 }}
          >
            {token ? 'Browse Doctors →' : 'Get Started Today →'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home