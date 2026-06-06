import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/appointment/${doctor._id}`)}
      className="card"
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow)'
      }}
    >
      {/* Image */}
      <div style={{
        background: 'var(--primary-light)',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img
          src={doctor.image}
          alt={doctor.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.src = 'https://via.placeholder.com/200x200?text=Dr' }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        {/* Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: doctor.available ? '#22c55e' : '#ef4444'
          }} />
          <span style={{
            fontSize: 12,
            color: doctor.available ? '#22c55e' : '#ef4444',
            fontWeight: 500
          }}>
            {doctor.available ? 'Available' : 'Not Available'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{doctor.name}</h3>
        <p style={{ color: 'var(--grey)', fontSize: 13 }}>{doctor.speciality}</p>

        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: 13, color: 'var(--grey)' }}>
            {doctor.experience} exp.
          </span>
          <span style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: 12,
            padding: '4px 10px',
            borderRadius: 50,
            fontWeight: 500
          }}>
            Book Now →
          </span>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
