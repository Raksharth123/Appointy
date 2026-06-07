import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, token, backendUrl, getDoctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const doc = doctors.find(d => d._id === docId)
    if (doc) setDoctor(doc)
  }, [doctors, docId])

  useEffect(() => {
    if (!doctor) return
    const today = new Date()
    const allSlots = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const daySlots = []

      for (let h = 10; h <= 21; h++) {
        const time = h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`
        const dateKey = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
        const booked = doctor.slots_booked?.[dateKey]
        if (!booked || !booked.includes(time)) {
          daySlots.push(time)
        }
      }
      allSlots.push({ date, slots: daySlots })
    }
    setSlots(allSlots)
  }, [doctor])

  const bookAppointment = async () => {
    if (!token) { toast.error('Please login first'); navigate('/login'); return }
    if (!selectedTime) { toast.error('Please select a time slot'); return }

    setLoading(true)
    try {
      const date = slots[selectedDay].date
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      )

      if (data.success) {
        const apptRes = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
        const appointments = apptRes.data.appointments
        const latest = appointments[appointments.length - 1]

        await initRazorpayPayment(latest._id, latest.amount)
        getDoctors()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  const initRazorpayPayment = async (apptId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId: apptId },
        { headers: { token } }
      )

      if (!data.success) { toast.error(data.message); return }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Appointy',
        description: `Appointment with ${doctor.name}`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              `${backendUrl}/api/user/verifyRazorpay`,
              { razorpay_order_id: response.razorpay_order_id },
              { headers: { token } }
            )
            if (verifyRes.data.success) {
              toast.success('Payment Successful! Appointment Confirmed!')
              navigate('/my-appointments')
            } else {
              toast.error('Payment verification failed')
            }
          } catch {
            toast.error('Payment verification error')
          }
        },
        prefill: { name: '', email: '' },
        theme: { color: '#0a6c5a' }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      toast.error('Payment initialization failed')
    }
  }

  if (!doctor) return (
    <div style={{ textAlign: 'center', padding: '80px', color: 'var(--grey)' }}>
      Loading doctor details...
    </div>
  )

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      <style>{`
        .appt-doctor-card {
          display: flex;
          flex-direction: row;
          gap: 32px;
          padding: 32px;
        }
        .appt-doctor-img {
          width: 160px;
          height: 160px;
          border-radius: 16px;
          object-fit: cover;
          flex-shrink: 0;
          background: var(--primary-light);
        }
        .appt-name-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .appt-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
        }
        .time-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .appt-doctor-card {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            align-items: center;
            text-align: center;
          }
          .appt-doctor-img {
            width: 120px;
            height: 120px;
          }
          .appt-name {
            font-size: 1.4rem;
          }
          .appt-name-row {
            justify-content: center;
          }
          .appt-about {
            max-width: 100% !important;
          }
          .appt-book-card {
            padding: 20px !important;
          }
          .appt-confirm-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* Doctor Info Card */}
      <div className="card appt-doctor-card" style={{ marginBottom: 24 }}>
        <img
          src={doctor.image}
          alt={doctor.name}
          className="appt-doctor-img"
          onError={e => e.target.src = 'https://via.placeholder.com/160?text=Dr'}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="appt-name-row">
            <h2 className="appt-name">{doctor.name}</h2>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: doctor.available ? '#dcfce7' : '#fee2e2',
              padding: '4px 12px', borderRadius: 50,
              flexShrink: 0
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: doctor.available ? '#22c55e' : '#ef4444'
              }} />
              <span style={{
                fontSize: 12, fontWeight: 500,
                color: doctor.available ? '#16a34a' : '#dc2626'
              }}>
                {doctor.available ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>

          <p style={{ color: 'var(--primary)', fontWeight: 500, marginBottom: 8 }}>
            {doctor.speciality}
          </p>
          <p style={{ color: 'var(--grey)', fontSize: 14, marginBottom: 16 }}>
            {doctor.degree} • {doctor.experience} experience
          </p>

          <div className="appt-about" style={{
            background: 'var(--light)', borderRadius: 12,
            padding: '14px', maxWidth: 500
          }}>
            <p style={{ fontSize: 14, color: 'var(--dark)', lineHeight: 1.7 }}>
              {doctor.about}
            </p>
          </div>

          <p style={{ marginTop: 16, fontWeight: 600, color: 'var(--primary)' }}>
            Consultation Fee: ₹{doctor.fees}
          </p>
        </div>
      </div>

      {/* Booking Card */}
      <div className="card appt-book-card" style={{ padding: 32 }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: 24 }}>
          Book Your Slot
        </h3>

        {/* Day Selection */}
        <p style={{ fontSize: 13, color: 'var(--grey)', fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>
          SELECT DATE
        </p>
        <div style={{
          display: 'flex', gap: 10, marginBottom: 28,
          overflowX: 'auto', paddingBottom: 8,
          WebkitOverflowScrolling: 'touch'
        }}>
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => { setSelectedDay(i); setSelectedTime('') }}
              style={{
                flexShrink: 0,
                padding: '10px 16px',
                borderRadius: 12,
                border: '2px solid',
                borderColor: selectedDay === i ? 'var(--primary)' : 'var(--border)',
                background: selectedDay === i ? 'var(--primary)' : 'white',
                color: selectedDay === i ? 'white' : 'var(--dark)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: 64
              }}
            >
              <div style={{ fontSize: 11, marginBottom: 4 }}>
                {DAYS[slot.date.getDay()]}
              </div>
              <div style={{ fontWeight: 600 }}>{slot.date.getDate()}</div>
            </button>
          ))}
        </div>

        {/* Time Selection */}
        <p style={{ fontSize: 13, color: 'var(--grey)', fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>
          SELECT TIME
        </p>
        <div className="time-grid">
          {slots[selectedDay]?.slots.length === 0 ? (
            <p style={{ color: 'var(--grey)', fontSize: 14 }}>No slots available for this day</p>
          ) : (
            slots[selectedDay]?.slots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 10,
                  border: '2px solid',
                  borderColor: selectedTime === time ? 'var(--primary)' : 'var(--border)',
                  background: selectedTime === time ? 'var(--primary)' : 'white',
                  color: selectedTime === time ? 'white' : 'var(--dark)',
                  cursor: 'pointer', fontSize: 13,
                  transition: 'all 0.2s'
                }}
              >
                {time}
              </button>
            ))
          )}
        </div>

        <button
          onClick={bookAppointment}
          disabled={loading || !doctor.available}
          className="btn-primary appt-confirm-btn"
          style={{
            fontSize: 16, padding: '14px 40px',
            opacity: (!doctor.available || loading) ? 0.6 : 1,
            marginTop: 8
          }}
        >
          {loading ? 'Processing...' : `Pay ₹${doctor.fees} & Confirm`}
        </button>
      </div>
    </div>
  )
}

export default Appointment
