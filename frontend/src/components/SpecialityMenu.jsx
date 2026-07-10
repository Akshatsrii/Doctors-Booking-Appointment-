import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='relative flex flex-col items-center gap-4 py-16 text-gray-800 overflow-hidden'>

      {/* Decorative background blobs */}
      <div className='absolute top-10 left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40 animate-[pulse_5s_ease-in-out_infinite]'></div>
      <div className='absolute bottom-10 right-10 w-52 h-52 bg-blue-100 rounded-full blur-3xl opacity-40 animate-[pulse_6s_ease-in-out_infinite]'></div>

      {/* Header Section */}
      <div className='relative z-10 text-center mb-4 animate-[fadeInUp_0.6s_ease-out]'>
        <span className='inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-2'>
          Specialities
        </span>
        <h1 className='text-3xl md:text-4xl font-semibold text-gray-900 mb-2'>
          Find by Speciality
        </h1>
        <div className='w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4'></div>
        <p className='sm:w-1/2 mx-auto text-center text-sm md:text-base text-gray-600 leading-relaxed'>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
      </div>

      {/* --------- Infinite Auto-Sliding Carousel --------- */}
      <div className='relative z-10 w-full group'>

        {/* Left & right fade gradients for a polished edge */}
        <div className='pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-20'></div>
        <div className='pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-20'></div>

        <div className='overflow-hidden'>
          <div className='flex w-max gap-4 md:gap-6 pt-5 px-5 animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]'>
            {[...specialityData, ...specialityData].map((item, index) => (
              <Link
                key={index}
                onClick={() => window.scrollTo(0, 0)}
                className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group/card'
                to={`/doctors/${item.speciality}`}
              >
                {/* Card with hover effect */}
                <div className='relative w-20 h-20 sm:w-28 sm:h-28 mb-3 bg-blue-50 rounded-full flex items-center justify-center group-hover/card:bg-blue-100 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:-translate-y-1'>

                  {/* Image */}
                  <img
                    className='w-12 sm:w-16 group-hover/card:scale-110 transition-transform duration-300'
                    src={item.image}
                    alt={item.speciality}
                  />

                  {/* Decorative ring on hover */}
                  <div className='absolute inset-0 rounded-full border-2 border-blue-600 opacity-0 group-hover/card:opacity-100 scale-90 group-hover/card:scale-100 transition-all duration-300'></div>
                </div>

                {/* Label */}
                <p className='text-sm sm:text-base font-medium text-gray-700 group-hover/card:text-blue-600 transition-colors duration-300 text-center max-w-[100px]'>
                  {item.speciality}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className='relative z-10 flex items-center gap-2 mt-4 text-xs text-gray-500 animate-[fadeInUp_0.6s_ease-out_0.3s_both]'>
        <svg className='w-4 h-4 animate-pulse' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'/>
        </svg>
        <span>Hover to pause &amp; explore specialties</span>
      </div>

      {/* View All Button */}
      <Link
        to='/doctors'
        onClick={() => window.scrollTo(0, 0)}
        className='relative z-10 group/btn overflow-hidden mt-6 px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 hover:shadow-lg animate-[fadeInUp_0.6s_ease-out_0.45s_both]'
      >
        <span className='relative z-10 flex items-center gap-2'>
          View All Doctors
          <span className='transition-transform duration-300 group-hover/btn:translate-x-1'>→</span>
        </span>
      </Link>
    </div>
  )
}

export default SpecialityMenu;