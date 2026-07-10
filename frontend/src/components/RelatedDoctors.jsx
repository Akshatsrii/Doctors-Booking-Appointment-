import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>

            <p className='text-xs font-medium text-[#5f6FFF] tracking-widest uppercase animate-[fadeInUp_0.5s_ease-out]'>
                You might also consider
            </p>
            <h1 className='text-3xl font-medium animate-[fadeInUp_0.5s_ease-out_0.1s_both]'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500 animate-[fadeInUp_0.5s_ease-out_0.2s_both]'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Yahan 'grid-cols-auto' ki jagah standard responsive classes use ki hain */}
            <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        key={item._id || index}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className='group relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-[#5f6FFF]/40 transition-all duration-500 opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]'
                    >
                        {/* Image with zoom-on-hover */}
                        <div className='relative overflow-hidden bg-blue-50'>
                            <img
                                className='w-full transition-transform duration-500 group-hover:scale-110'
                                src={item.image}
                                alt={item.name}
                            />
                            {/* Rating badge */}
                            <div className='absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-700 flex items-center gap-1 shadow-sm'>
                                <span className='text-yellow-400'>★</span> 4.8
                            </div>
                        </div>

                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></p>
                                <p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium group-hover:text-[#5f6FFF] transition-colors duration-300'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>

                        {/* Bottom accent line on hover */}
                        <div className='absolute bottom-0 left-0 h-[3px] w-0 bg-[#5f6FFF] group-hover:w-full transition-all duration-500'></div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className='group flex items-center gap-2 bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-[#5f6FFF] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300'
            >
                more
                <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
            </button>
        </div>
    )
}

export default RelatedDoctors