import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, getUserData } = useContext(AppContext)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!userData) return (
    <div style={{ textAlign: 'center', padding: 80, color: 'var(--grey)' }}>
      Please <a href="/login" style={{ color: 'var(--primary)' }}>login</a> to view your profile.
    </div>
  )

  const startEdit = () => {
    setForm({ ...userData })
    setEditing(true)
  }

  const saveProfile = async () => {
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('phone', form.phone)
      fd.append('address', JSON.stringify(form.address))
      fd.append('gender', form.gender)
      fd.append('dob', form.dob)
      if (image) fd.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, fd, {
        headers: { token }
      })
      if (data.success) {
        toast.success('Profile updated!')
        await getUserData()
        setEditing(false)
        setImage(null)
      } else toast.error(data.message)
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  const current = editing ? form : userData

  return (
    <div className="container" style={{ padding: '48px 24px', maxWidth: 700 }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 32 }}>
        My Profile
      </h1>

      <div className="card" style={{ padding: 32 }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <div style={{ position: 'relative' }}>
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }}
            />
            {editing && (
              <label style={{
                position: 'absolute', bottom: 0, right: 0,
                background: 'var(--primary)', color: 'white',
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 14
              }}>
                ✏️
                <input type="file" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
              </label>
            )}
          </div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem' }}>{userData.name}</h2>
            <p style={{ color: 'var(--grey)', fontSize: 14 }}>{userData.email}</p>
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { label: 'Full Name', key: 'name', type: 'text' },
            { label: 'Phone', key: 'phone', type: 'text' },
            { label: 'Date of Birth', key: 'dob', type: 'date' },
            { label: 'Gender', key: 'gender', type: 'select', options: ['Not Selected', 'Male', 'Female', 'Other'] },
          ].map(({ label, key, type, options }) => (
            <div key={key}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--grey)', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>
                {label.toUpperCase()}
              </label>
              {editing ? (
                type === 'select' ? (
                  <select
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '2px solid var(--border)', borderRadius: 10,
                      fontSize: 14, background: 'white'
                    }}
                  >
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '2px solid var(--border)', borderRadius: 10,
                      fontSize: 14
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                )
              ) : (
                <p style={{ padding: '10px 0', fontSize: 14, color: 'var(--dark)', borderBottom: '1px solid var(--border)' }}>
                  {current[key] || '—'}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Address */}
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--grey)', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>
            ADDRESS
          </label>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                placeholder="Line 1"
                value={form.address?.line1 || ''}
                onChange={e => setForm({ ...form, address: { ...form.address, line1: e.target.value } })}
                style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--border)', borderRadius: 10, fontSize: 14 }}
              />
              <input
                placeholder="Line 2"
                value={form.address?.line2 || ''}
                onChange={e => setForm({ ...form, address: { ...form.address, line2: e.target.value } })}
                style={{ width: '100%', padding: '10px 14px', border: '2px solid var(--border)', borderRadius: 10, fontSize: 14 }}
              />
            </div>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--dark)', borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
              {userData.address?.line1 || '—'}{userData.address?.line2 ? `, ${userData.address.line2}` : ''}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
          {editing ? (
            <>
              <button className="btn-primary" onClick={saveProfile} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button className="btn-outline" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={startEdit}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
