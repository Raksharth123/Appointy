import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const SPECIALITIES = [
  'General physician', 'Gynecologist', 'Dermatologist',
  'Pediatricians', 'Neurologist', 'Gastroenterologist'
]

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = doctors.filter(doc => {
    const matchSpec = speciality ? doc.speciality === speciality : true
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(search.toLowerCase())
    return matchSpec && matchSearch
  })

  const SidebarButtons = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        onClick={() => { navigate('/doctors'); setShowFilter(false) }}
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
          onClick={() => { navigate(`/doctors/${spec}`); setShowFilter(false) }}
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
  )

  return (
    <div style={{ minHeight: '80vh' }}>
      <style>{`
        .doctors-layout {
          display: flex;
          gap: 32px;
          padding: 40px 24px;
        }
        .doctors-sidebar {
          width: 220px;
          flex-shrink: 0;
        }
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .mobile-filter-btn {
          display: none;
        }
        .mobile-filter-drawer {
          display: none;
        }

        @media (max-width: 768px) {
          .doctors-layout {
            flex-direction: column;
            gap: 16px;
            padding: 20px 16px;
          }
          .doctors-sidebar {
            display: none;
          }
          .mobile-filter-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 8px;
          }
          .mobile-filter-drawer {
            display: block;
            background: white;
            border-radius: 16px;
            padding: 16px;
            border: 1px solid var(--border);
            margin-bottom: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          }
          .doctors-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 400px) {
          .doctors-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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
          <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
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

      <div className="container doctors-layout">

        {/* Desktop Sidebar */}
        <div className="doctors-sidebar">
          <h3 style={{ marginBottom: 16, fontSize: '1rem', color: 'var(--grey)' }}>
            SPECIALITIES
          </h3>
          <SidebarButtons />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile filter toggle button */}
          <button
            className="mobile-filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            🔽 {speciality || 'All Doctors'} — Filter
          </button>

          {/* Mobile filter drawer */}
          {showFilter && (
            <div className="mobile-filter-drawer">
              <h3 style={{ marginBottom: 12, fontSize: '0.9rem', color: 'var(--grey)' }}>
                SPECIALITIES
              </h3>
              <SidebarButtons />
            </div>
          )}

          <p style={{ color: 'var(--grey)', marginBottom: 16, fontSize: 14 }}>
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
            <div className="doctors-grid">
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
