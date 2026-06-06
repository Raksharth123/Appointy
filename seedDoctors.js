import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await doctorModel.deleteMany({});
    console.log("Old doctors cleared");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const doctors = [
      {
        name: "Dr. Rajesh Kumar",
        email: "rajesh@appointy.com",
        password: hashedPassword,
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        speciality: "General physician",
        degree: "MBBS",
        experience: "5 Years",
        about: "Dr. Rajesh Kumar is a dedicated general physician with over 5 years of experience in treating a wide range of illnesses and providing preventive care.",
        available: true,
        fees: 300,
        address: { line1: "12, Lajpat Nagar", line2: "New Delhi, Delhi" },
        date: Date.now(),
        slots_booked: {},
      },
      {
        name: "Dr. Priya Sharma",
        email: "priya@appointy.com",
        password: hashedPassword,
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        speciality: "Gynecologist",
        degree: "MBBS, MD",
        experience: "4 Years",
        about: "Dr. Priya Sharma specializes in women's health, prenatal care, and gynecological treatments with a compassionate approach.",
        available: true,
        fees: 500,
        address: { line1: "34, Malviya Nagar", line2: "Jaipur, Rajasthan" },
        date: Date.now(),
        slots_booked: {},
      },
      {
        name: "Dr. Anjali Singh",
        email: "anjali@appointy.com",
        password: hashedPassword,
        image: "https://randomuser.me/api/portraits/women/13.jpg",
        speciality: "Dermatologist",
        degree: "MBBS, MD",
        experience: "3 Years",
        about: "Dr. Anjali Singh provides expert care for skin, hair, and nail conditions with a focus on both medical and cosmetic dermatology.",
        available: true,
        fees: 400,
        address: { line1: "56, Koregaon Park", line2: "Pune, Maharashtra" },
        date: Date.now(),
        slots_booked: {},
      },
      {
        name: "Dr. Vikram Mehta",
        email: "vikram@appointy.com",
        password: hashedPassword,
        image: "https://randomuser.me/api/portraits/men/14.jpg",
        speciality: "Pediatricians",
        degree: "MBBS, DCH",
        experience: "6 Years",
        about: "Dr. Vikram Mehta is passionate about child health and development, offering comprehensive pediatric care from newborns to adolescents.",
        available: true,
        fees: 350,
        address: { line1: "78, Banjara Hills", line2: "Hyderabad, Telangana" },
        date: Date.now(),
        slots_booked: {},
      },
      {
        name: "Dr. Neha Gupta",
        email: "neha@appointy.com",
        password: hashedPassword,
        image: "https://randomuser.me/api/portraits/women/15.jpg",
        speciality: "Neurologist",
        degree: "MBBS, DM",
        experience: "7 Years",
        about: "Dr. Neha Gupta is an experienced neurologist specializing in disorders of the brain, spinal cord, and nervous system.",
        available: true,
        fees: 600,
        address: { line1: "90, Andheri West", line2: "Mumbai, Maharashtra" },
        date: Date.now(),
        slots_booked: {},
      },
      {
        name: "Dr. Arjun Patel",
        email: "arjun@appointy.com",
        password: hashedPassword,
        image: "https://randomuser.me/api/portraits/men/16.jpg",
        speciality: "Gastroenterologist",
        degree: "MBBS, MD, DM",
        experience: "8 Years",
        about: "Dr. Arjun Patel is a leading gastroenterologist with expertise in digestive disorders, liver diseases, and endoscopic procedures.",
        available: true,
        fees: 550,
        address: { line1: "23, Navrangpura", line2: "Ahmedabad, Gujarat" },
        date: Date.now(),
        slots_booked: {},
      },
    ];

    await doctorModel.insertMany(doctors);
    console.log("✅ Doctors seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();