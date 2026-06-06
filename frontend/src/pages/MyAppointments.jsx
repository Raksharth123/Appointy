import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { token, backendUrl } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      })
      if (data.success) setAppointments(data.appointments.reverse())
    } catch (err) {
      toast.error(err.message)
    }
    setLoading(false)
  }

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId: id },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Appointment cancelled')
        fetchAppointments()
      } else toast.error(data.message)
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (token) fetchAppointments()
  }, [token])

  if (!token) return (
    <div style={{ textAlign: 'center', padding: 80, color: 'var(--grey)' }}>
      Please <a href="/login" style={{ color: 'var(--primary)' }}>login</a> to view appointments.
    </div>
  )

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 32 }}>
        My Appointments
      </h1>

      {loading ? (
        <p style={{ color: 'var(--grey)', textAlign: 'center', padding: 40 }}>Loading...</p>
      ) : appointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📅</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: 8 }}>No appointments yet</h3>
          <p style={{ marginBottom: 24 }}>Book your first appointment with a doctor</p>
          <a href="/doctors" className="btn-primary" style={{ display: 'inline-block' }}>Find Doctors</a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {appointments.map(apt => (
            <div key={apt._id} className="card" style={{ padding: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
              {/* Doctor Image */}
              <img
                src={apt.docData?.image}
                alt={apt.docData?.name}
                style={{
                  width: 80, height: 80, borderRadius: 12,
                  objectFit: 'cover', background: 'var(--primary-light)',
                  flexShrink: 0
                }}
                onError={e => e.target.src = 'https://via.placeholder.com/80?text=Dr'}
              />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{apt.docData?.name}</h3>
                <p style={{ color: 'var(--grey)', fontSize: 13, marginBottom: 8 }}>{apt.docData?.speciality}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 13, color: 'var(--dark)' }}>
                    📅 {apt.slotDate?.replace(/_/g, '/')}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--dark)' }}>
                    🕐 {apt.slotTime}
                  </span>
                </div>
              </div>

              {/* Status & Action */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                <span style={{
                  padding: '4px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                  background: apt.cancelled ? '#fee2e2' : apt.isCompleted ? '#dcfce7' : '#fef9c3',
                  color: apt.cancelled ? '#dc2626' : apt.isCompleted ? '#16a34a' : '#ca8a04'
                }}>
                  {apt.cancelled ? 'Cancelled' : apt.isCompleted ? 'Completed' : 'Upcoming'}
                </span>
                {!apt.cancelled && !apt.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(apt._id)}
                    style={{
                      padding: '8px 16px', borderRadius: 8,
                      border: '1px solid #ef4444', background: 'white',
                      color: '#ef4444', fontSize: 13, cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.target.style.background = '#ef4444'; e.target.style.color = 'white' }}
                    onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.color = '#ef4444' }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
