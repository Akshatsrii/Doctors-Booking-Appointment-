import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='relative flex overflow-hidden bg-[#5f6FFF] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

            {/* ------- Animated Decorative Blobs ------- */}
            <div className='absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse'></div>
            <div className='absolute -bottom-16 right-1/3 w-52 h-52 bg-white/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]'></div>
            <div className='absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-[float_5s_ease-in-out_infinite]'></div>

            {/* ------- Floating dots for extra motion ------- */}
            <div className='absolute top-8 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-[float_3s_ease-in-out_infinite]'></div>
            <div className='absolute bottom-10 left-1/3 w-3 h-3 bg-white/30 rounded-full animate-[float_4s_ease-in-out_infinite_0.5s]'></div>
            <div className='absolute top-1/3 right-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-[float_3.5s_ease-in-out_infinite_1s]'></div>

            {/* ------- Left Side ------- */}
            <div className='relative z-10 flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>

                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p className='animate-[fadeInUp_0.6s_ease-out]'>Book Appointment</p>
                    <p className='mt-4 animate-[fadeInUp_0.6s_ease-out_0.2s_both]'>With 100+ Trusted Doctors</p>
                </div>

                {/* ------- Social Proof: Avatar Stack + Rating ------- */}
                <div className='flex items-center gap-3 mt-5 animate-[fadeInUp_0.6s_ease-out_0.4s_both]'>
                    <div className='flex -space-x-3'>
                        {[1, 2, 3, 4].map((_, i) => (
                            <img
                                key={i}
                                className='w-8 h-8 rounded-full border-2 border-white object-cover hover:scale-110 hover:z-10 transition-transform duration-300'
                                src={assets.group_profiles || assets.appointment_img}
                                alt=""
                            />
                        ))}
                    </div>
                    <div className='text-white text-xs sm:text-sm'>
                        <div className='flex items-center gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className='text-yellow-300 text-sm animate-[twinkle_1.5s_ease-in-out_infinite]'
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                >★</span>
                            ))}
                        </div>
                        <p className='text-white/80'>Trusted by 1000+ patients</p>
                    </div>
                </div>

                <button
                    onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                    className='relative overflow-hidden group flex items-center gap-2 bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.6s_both]'
                >
                    <span className='relative z-10'>Create account</span>
                    <span className='relative z-10 transition-transform duration-300 group-hover:translate-x-1'>→</span>
                    {/* shimmer sweep on hover */}
                    <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#5f6FFF]/10 to-transparent'></span>
                </button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img
                    className='w-full absolute bottom-0 right-0 max-w-md animate-[float_3s_ease-in-out_infinite] hover:scale-105 transition-transform duration-500'
                    src={assets.appointment_img}
                    alt="Appointment"
                />
            </div>

        </div>
    )
}

export default Banner