import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'
import { useNavigate } from 'react-router-dom'

const SPECIALITIES = [
  'General physician', 'Gynecologist', 'Dermatologist',
  'Pediatricians', 'Neurologist', 'Gastroenterologist'
]

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = doctors.filter(doc => {
    const matchSpec = speciality ? doc.speciality === speciality : true
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(search.toLowerCase())
    return matchSpec && matchSearch
  })

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d4d3e 100%)',
        padding: '48px 0'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white', fontSize: '2.5rem', marginBottom: 16
          }}>
            Find Your Doctor
          </h1>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search by name or speciality..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 20px',
                borderRadius: 50, border: 'none',
                fontSize: 15, boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px', display: 'flex', gap: 32 }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <h3 style={{ marginBottom: 16, fontSize: '1rem', color: 'var(--grey)' }}>
            SPECIALITIES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => navigate('/doctors')}
              style={{
                textAlign: 'left', padding: '10px 16px',
                borderRadius: 10, border: '2px solid',
                borderColor: !speciality ? 'var(--primary)' : 'var(--border)',
                background: !speciality ? 'var(--primary-light)' : 'white',
                color: !speciality ? 'var(--primary)' : 'var(--dark)',
                fontWeight: !speciality ? 600 : 400,
                cursor: 'pointer', fontSize: 14, transition: 'all 0.2s'
              }}
            >
              All Doctors
            </button>
            {SPECIALITIES.map(spec => (
              <button
                key={spec}
                onClick={() => navigate(`/doctors/${spec}`)}
                style={{
                  textAlign: 'left', padding: '10px 16px',
                  borderRadius: 10, border: '2px solid',
                  borderColor: speciality === spec ? 'var(--primary)' : 'var(--border)',
                  background: speciality === spec ? 'var(--primary-light)' : 'white',
                  color: speciality === spec ? 'var(--primary)' : 'var(--dark)',
                  fontWeight: speciality === spec ? 600 : 400,
                  cursor: 'pointer', fontSize: 14, transition: 'all 0.2s'
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--grey)', marginBottom: 24, fontSize: 14 }}>
            {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
            {speciality ? ` in ${speciality}` : ''}
          </p>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              color: 'var(--grey)'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: '1.1rem' }}>No doctors found</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or speciality</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24
            }}>
              {filtered.map(doc => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
