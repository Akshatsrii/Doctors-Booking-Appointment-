import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import VerifyPayment from './pages/VerifyPayment'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'   // ✅ CHATBOT IMPORT

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/verify-payment" element={<VerifyPayment />} />
      </Routes>

      <Footer />

      {/* 🤖 AI CHATBOT – USER SIDE */}
      <ChatBot />
    </div>
  )
}

export default App
