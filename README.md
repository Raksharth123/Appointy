# Appointy - Doctor Appointment Booking Web App

Appointy is a full-stack web application designed to make healthcare more accessible by simplifying the process of booking doctor appointments. Patients can search for doctors, book appointments, and pay securely online — all from one platform. Built using the MERN stack with Vite for a lightning-fast frontend experience.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Payment Gateway | Razorpay |
| Authentication | JSON Web Token (JWT) |
| Image Storage | Cloudinary |

---

## 🔑 Key Features

- 🔍 **Browse Doctors** — Search and filter doctors by specialization
- 📅 **Book Appointments** — Select date and time slots with ease
- 💳 **Razorpay Payment** — Secure online payment integration
- 🔐 **JWT Authentication** — Secure user login and session management
- 👤 **User Profile** — View and manage your bookings
- ☁️ **Cloudinary** — Profile image upload and storage

---

## 🏠 Home Page

- Search for doctors by specialty
- View top doctors and their profiles
- About Us, Contact, and other informational sections

---

## 🩺 All Doctors Page

- Lists all available doctors
- Filter doctors by specialty
- Click a doctor's profile to go to the appointment booking page

---

## 📅 Doctor Appointment Page

- Doctor's profile picture, qualification, experience, and description
- Appointment booking form: choose date and time
- Secure payment via Razorpay
- Must be logged in to book an appointment

---

## 👤 User Profile

- View and edit profile (name, email, address, gender, birthday)
- Upload profile picture via Cloudinary
- View upcoming and past appointments
- Cancel appointments

---

## 💳 Payment Integration

- **Razorpay** — order creation → payment → verification flow
- Secure and reliable payment experience

---

## 🌐 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Raksharth123/Appointy.git
cd Appointy
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the Application

```bash
# Run backend
cd backend
npm run server

# Run frontend (in a new terminal)
cd frontend
npm run dev
```

---

## 📦 Folder Structure

```
Appointy/
├── frontend/          # React.js + Vite (Frontend)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── backend/           # Node.js + Express.js (Backend)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
└── .env               # Environment Variables
```

---

## 🚀 Deployment

- **Live Link** - https://appointy-frontend-9mlq.onrender.com/
  
---

## 🤝 Contributing

Feel free to fork the repository, raise issues, and submit pull requests. Contributions are welcome!

---

## 🌟 Acknowledgements

Thanks to the developers of MongoDB, Express.js, React.js, Node.js, Vite, Razorpay, and Cloudinary for their amazing tools and libraries.
