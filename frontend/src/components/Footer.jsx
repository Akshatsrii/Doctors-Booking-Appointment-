import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* --------- Left Section --------- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6 mb-6'>
            Providing exceptional healthcare services with compassion and expertise. 
            Your health and wellbeing are our top priorities. Trust us for comprehensive 
            medical care delivered by experienced professionals.
          </p>
          
          {/* Social Media Links */}
          <div className='flex gap-3'>
            <div className='w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700'>
              <span>f</span>
            </div>
            <div className='w-9 h-9 flex items-center justify-center bg-blue-400 text-white rounded-full cursor-pointer hover:bg-blue-500'>
              <span>t</span>
            </div>
            <div className='w-9 h-9 flex items-center justify-center bg-pink-600 text-white rounded-full cursor-pointer hover:bg-pink-700'>
              <span>i</span>
            </div>
            <div className='w-9 h-9 flex items-center justify-center bg-blue-700 text-white rounded-full cursor-pointer hover:bg-blue-800'>
              <span>in</span>
            </div>
          </div>
        </div>

        {/* --------- Center Section --------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer hover:text-blue-600'>Home</li>
            <li className='cursor-pointer hover:text-blue-600'>About us</li>
            <li className='cursor-pointer hover:text-blue-600'>Contact us</li>
            <li className='cursor-pointer hover:text-blue-600'>Privacy policy</li>
          </ul>
        </div>

        {/* --------- Right Section --------- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-blue-600 cursor-pointer'>+91-958735946</li>
            <li className='hover:text-blue-600 cursor-pointer'>akshat1234@gmail.com</li>
          </ul>
          
          {/* Emergency Contact */}
          <div className='mt-6 p-3 bg-red-100 border border-red-300 rounded'>
            <p className='text-xs text-red-700 font-medium'>Emergency: 108</p>
            <p className='text-xs text-red-600 mt-1'>24/7 Available</p>
          </div>
        </div>

      </div>

      {/* --------- Copyright Text --------- */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright 2026 @ akshat.hospital - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer