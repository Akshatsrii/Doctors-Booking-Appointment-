import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl md:text-4xl font-semibold'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm md:text-base text-gray-600'>Simply browse through our extensive list of trusted doctors.</p>
            
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-105 hover:border-blue-400 transition-all duration-500 bg-white'
                    >
                        <img className='bg-blue-50 w-full hover:scale-110 transition-transform duration-500' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500 mb-2'>
                                <p className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></p>
                                <p className='font-medium'>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-semibold mb-1'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-blue-600 text-white px-12 py-3 rounded-full mt-10 font-medium hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95'
            >
                View All Doctors
            </button>
        </div>
    )
}

export default TopDoctors