import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='md:mx-10 border-t border-gray-100 pt-16 pb-8'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1.2fr] gap-10 mb-16 text-sm'>

        {/* --------- Left Section --------- */}
        <div className='space-y-4'>
          <img 
            onClick={() => { navigate('/'); window.scrollTo(0, 0) }} 
            className='mb-4 w-36 cursor-pointer hover:opacity-85 transition-opacity' 
            src={assets.logo} 
            alt="Logo" 
          />
          <p className='w-full md:w-4/5 text-gray-500 leading-relaxed'>
            Providing exceptional healthcare services with compassion and expertise.
            Your health and wellbeing are our top priorities. Trust us for comprehensive
            medical care delivered by experienced professionals.
          </p>

          {/* Social Media Links */}
          <div className='flex gap-3 pt-2'>
            <a href="#" target="_blank" rel="noopener noreferrer" className='w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-sm'>
              <span className='text-sm font-semibold'>f</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className='w-9 h-9 flex items-center justify-center bg-sky-500 text-white rounded-full cursor-pointer hover:bg-sky-600 hover:scale-110 transition-all duration-300 shadow-sm'>
              <span className='text-sm font-semibold'>t</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className='w-9 h-9 flex items-center justify-center bg-pink-600 text-white rounded-full cursor-pointer hover:bg-pink-700 hover:scale-110 transition-all duration-300 shadow-sm'>
              <span className='text-sm font-semibold'>i</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className='w-9 h-9 flex items-center justify-center bg-blue-700 text-white rounded-full cursor-pointer hover:bg-blue-800 hover:scale-110 transition-all duration-300 shadow-sm'>
              <span className='text-xs font-semibold'>in</span>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className='w-9 h-9 flex items-center justify-center bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 hover:scale-110 transition-all duration-300 shadow-sm'
              title="Chat on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='w-4 h-4'>
                <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.8 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.9 7.9 0 0 0-2.35-5.64Zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.58 6.58 0 0 1 10.24-8.1 6.53 6.53 0 0 1 1.94 4.66 6.6 6.6 0 0 1-6.58 6.54Zm3.6-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.45.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.83-.3-1.58-.97-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.1.2-.23.35-.35.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.48-.16-.38-.33-.33-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.67s.72 1.94.82 2.07c.1.13 1.4 2.14 3.4 3 .48.2.85.33 1.14.42.48.15.91.13 1.26.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.09-.18-.14-.38-.24Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* --------- Center Section --------- */}
        <div>
          <p className='text-base font-bold text-gray-800 mb-5 tracking-wide uppercase'>Company</p>
          <ul className='flex flex-col gap-3 text-gray-500 font-medium'>
            <li onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 w-fit'>Home</li>
            <li onClick={() => { navigate('/about'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 w-fit'>About us</li>
            <li onClick={() => { navigate('/contact'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 w-fit'>Contact us</li>
            <li onClick={() => { navigate('/about'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 w-fit'>Privacy policy</li>
          </ul>
        </div>

        {/* --------- Right Section --------- */}
        <div>
          <p className='text-base font-bold text-gray-800 mb-5 tracking-wide uppercase'>Get In Touch</p>
          <ul className='flex flex-col gap-3.5 text-gray-500 font-medium'>
            <li className='flex items-start gap-2.5'>
              <span className='text-lg mt-0.5 text-indigo-500'>📍</span>
              <span className='leading-normal'>221, Vaishali Nagar,<br />Jaipur, Rajasthan – 302021</span>
            </li>
            <li className='flex items-center gap-2.5 hover:text-[#5f6FFF] cursor-pointer transition-colors w-fit'>
              <span className='text-base text-indigo-500'>📞</span>
              <a href="tel:+919876543210" className='hover:underline'>+91-98765-43210</a>
            </li>
            <li className='flex items-center gap-2.5 hover:text-[#5f6FFF] cursor-pointer transition-colors w-fit'>
              <span className='text-base text-indigo-500'>✉️</span>
              <a href="mailto:contact@akshathospital.com" className='hover:underline'>contact@akshathospital.com</a>
            </li>
            <li className='flex items-center gap-2.5'>
              <span className='text-base text-indigo-500'>🕒</span>
              <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
            </li>
          </ul>

          {/* Emergency Contact */}
          <div className='mt-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-pulse'>
            <div className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm'>
              🚨
            </div>
            <div>
              <p className='text-xs text-red-700 font-bold uppercase tracking-wider'>Emergency Support</p>
              <p className='text-sm text-red-600 font-extrabold mt-0.5'>Call: 108 (24/7)</p>
            </div>
          </div>
        </div>

      </div>

      {/* --------- Copyright Text --------- */}
      <div className='pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500 font-medium'>
        <p>Copyright 2026 @ akshat.hospital - All Rights Reserved.</p>
        <div className='flex gap-5'>
          <a href="#" className='hover:text-gray-800 transition-colors'>Terms of Service</a>
          <a href="#" className='hover:text-gray-800 transition-colors'>Privacy Policy</a>
          <a href="#" className='hover:text-gray-800 transition-colors'>Cookie Policy</a>
        </div>
      </div>
    </div>
  )
}

export default Footer