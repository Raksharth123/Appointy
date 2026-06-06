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
  const [appointmentId, setAppointmentId] = useState(null)

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

  // Step 1 - Book appointment first, then open Razorpay
  const bookAppointment = async () => {
    if (!token) { toast.error('Please login first'); navigate('/login'); return }
    if (!selectedTime) { toast.error('Please select a time slot'); return }

    setLoading(true)
    try {
      const date = slots[selectedDay].date
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

      // First book the appointment
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      )

      if (data.success) {
        // Get the latest appointment id
        const apptRes = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
        const appointments = apptRes.data.appointments
        const latest = appointments[appointments.length - 1]
        setAppointmentId(latest._id)

        // Open Razorpay
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

  // Step 2 - Init Razorpay payment
  const initRazorpayPayment = async (apptId, amount) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId: apptId },
        { headers: { token } }
      )

      if (!data.success) {
        toast.error(data.message)
        return
      }

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
          } catch (err) {
            toast.error('Payment verification error')
          }
        },
        prefill: {
          name: '',
          email: '',
        },
        theme: {
          color: '#0a6c5a'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (err) {
      toast.error('Payment initialization failed')
    }
  }

  if (!doctor) return (
    <div style={{ textAlign: 'center', padding: '80px', color: 'var(--grey)' }}>
      Loading doctor details...
    </div>
  )

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      {/* Doctor Info */}
      <div className="card" style={{ padding: 32, display: 'flex', gap: 32, marginBottom: 32 }}>
        <img
          src={doctor.image}
          alt={doctor.name}
          style={{
            width: 160, height: 160,
            borderRadius: 16, objectFit: 'cover',
            background: 'var(--primary-light)'
          }}
          onError={e => e.target.src = 'https://via.placeholder.com/160?text=Dr'}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>{doctor.name}</h2>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: doctor.available ? '#dcfce7' : '#fee2e2',
              padding: '4px 12px', borderRadius: 50
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
          <div style={{
            background: 'var(--light)', borderRadius: 12,
            padding: '16px', maxWidth: 500
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

      {/* Booking */}
      <div className="card" style={{ padding: 32 }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: 24 }}>
          Book Your Slot
        </h3>

        {/* Day Selection */}
        <p style={{ fontSize: 13, color: 'var(--grey)', fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>
          SELECT DATE
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => { setSelectedDay(i); setSelectedTime('') }}
              style={{
                flexShrink: 0,
                padding: '12px 20px',
                borderRadius: 12,
                border: '2px solid',
                borderColor: selectedDay === i ? 'var(--primary)' : 'var(--border)',
                background: selectedDay === i ? 'var(--primary)' : 'white',
                color: selectedDay === i ? 'white' : 'var(--dark)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: 80
              }}
            >
              <div style={{ fontSize: 12, marginBottom: 4 }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
          {slots[selectedDay]?.slots.length === 0 ? (
            <p style={{ color: 'var(--grey)', fontSize: 14 }}>No slots available for this day</p>
          ) : (
            slots[selectedDay]?.slots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: '2px solid',
                  borderColor: selectedTime === time ? 'var(--primary)' : 'var(--border)',
                  background: selectedTime === time ? 'var(--primary)' : 'white',
                  color: selectedTime === time ? 'white' : 'var(--dark)',
                  cursor: 'pointer', fontSize: 14,
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
          className="btn-primary"
          style={{
            fontSize: 16, padding: '14px 40px',
            opacity: (!doctor.available || loading) ? 0.6 : 1
          }}
        >
          {loading ? 'Processing...' : `Pay ₹${doctor.fees} & Confirm`}
        </button>
      </div>
    </div>
  )
}

export default Appointment