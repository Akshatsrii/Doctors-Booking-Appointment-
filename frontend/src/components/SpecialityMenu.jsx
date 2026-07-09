import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
      
      {/* Header Section */}
      <div className='text-center mb-4'>
        <h1 className='text-3xl md:text-4xl font-semibold text-gray-900 mb-2'>
          Find by Speciality
        </h1>
        <div className='w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4'></div>
        <p className='sm:w-1/2 mx-auto text-center text-sm md:text-base text-gray-600 leading-relaxed'>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
      </div>

      {/* Speciality Cards Container */}
      <div 
        className='flex sm:justify-center gap-4 md:gap-6 pt-5 w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden px-5'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {specialityData.map((item, index) => (
          <Link 
            key={index}
            onClick={() => window.scrollTo(0, 0)} 
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group' 
            to={`/doctors/${item.speciality}`}
          >
            {/* Card with hover effect */}
            <div className='relative w-20 h-20 sm:w-28 sm:h-28 mb-3 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-all duration-300 group-hover:shadow-lg'>
              
              {/* Image */}
              <img 
                className='w-12 sm:w-16 group-hover:scale-110 transition-transform duration-300' 
                src={item.image} 
                alt={item.speciality} 
              />
              
              {/* Decorative ring on hover */}
              <div className='absolute inset-0 rounded-full border-2 border-blue-600 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300'></div>
            </div>

            {/* Label */}
            <p className='text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-center max-w-[100px]'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>

      {/* Optional: Scroll Hint for Mobile */}
      <div className='sm:hidden flex items-center gap-2 mt-4 text-xs text-gray-500'>
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6'/>
        </svg>
        <span>Swipe to see more specialties</span>
      </div>

      {/* View All Button */}
      <Link 
        to='/doctors'
        className='mt-6 px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg'
      >
        View All Doctors
      </Link>
    </div>
  )
}

export default SpecialityMenu