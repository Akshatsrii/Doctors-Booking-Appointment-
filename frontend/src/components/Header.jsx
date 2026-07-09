import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#5f6FFF] rounded-lg px-6 md:px-10 lg:px-20 relative overflow-hidden'>
      
      {/* Decorative Background Elements */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl'></div>

      {/* --------- Left Side --------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] relative z-10'>
        
        {/* Badge */}
        <div className='flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full mb-2'>
          <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
          <p className='text-white text-xs font-medium'>Trusted by 10,000+ Patients</p>
        </div>

        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br /> 
          With <span className='text-yellow-300'>Trusted Doctors</span>
        </p>
        
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="Profiles" />
          <p className='leading-relaxed'>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> 
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* Stats Section */}
        <div className='flex gap-6 mt-4 mb-2'>
          <div className='text-white'>
            <p className='text-2xl font-bold'>500+</p>
            <p className='text-xs opacity-80'>Verified Doctors</p>
          </div>
          <div className='w-px bg-white opacity-30'></div>
          <div className='text-white'>
            <p className='text-2xl font-bold'>50+</p>
            <p className='text-xs opacity-80'>Specialties</p>
          </div>
          <div className='w-px bg-white opacity-30'></div>
          <div className='text-white'>
            <p className='text-2xl font-bold'>24/7</p>
            <p className='text-xs opacity-80'>Support</p>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
          <a 
            href="#speciality" 
            className='flex items-center justify-center gap-2 bg-white px-8 py-3 rounded-full text-[#5f6FFF] text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300'
          >
            Book appointment 
            <img className='w-3' src={assets.arrow_icon} alt="" />
          </a>
          
          <a 
            href="#doctors" 
            className='flex items-center justify-center gap-2 bg-transparent border-2 border-white px-8 py-3 rounded-full text-white text-sm font-medium hover:bg-white hover:text-[#5f6FFF] transition-all duration-300'
          >
            View Doctors
          </a>
        </div>

        {/* Features List */}
        <div className='flex flex-col gap-2 mt-4 text-white text-xs'>
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            <span>Instant appointment confirmation</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            <span>100% verified healthcare professionals</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            <span>Secure and private consultations</span>
          </div>
        </div>

      </div>

      {/* --------- Right Side --------- */}
      <div className='md:w-1/2 relative'>
        <img 
          className='w-full md:absolute bottom-0 h-auto rounded-lg' 
          src={assets.header_img} 
          alt="Doctors" 
        />
        
        {/* Floating Card */}
        <div className='hidden md:block absolute top-20 right-10 bg-white p-4 rounded-lg shadow-lg'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Regular Checkup</p>
              <p className='text-xs text-gray-500'>Stay healthy always</p>
            </div>
          </div>
        </div>

        {/* Rating Card */}
        <div className='hidden md:block absolute bottom-32 left-5 bg-white p-3 rounded-lg shadow-lg'>
          <div className='flex items-center gap-2'>
            <div className='flex text-yellow-400'>
              {'★'.repeat(5)}
            </div>
          </div>
          <p className='text-xs font-semibold text-gray-800 mt-1'>4.9/5 Rating</p>
          <p className='text-xs text-gray-500'>From 10k+ reviews</p>
        </div>
      </div>

    </div>
  )
}

export default Header