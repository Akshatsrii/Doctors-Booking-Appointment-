import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

// ---- Small hook: counts a number up from 0 to target once mounted ----
const useCountUp = (target, duration = 1500) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])

  return count
}

// ---- Small hook: typewriter effect cycling through a list of words ----
const useTypewriter = (words, typingSpeed = 90, pause = 1500) => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => prev + 1)
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
        )
      }, isDeleting ? typingSpeed / 2 : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, pause])

  return text
}

const Header = () => {
  const doctorsCount = useCountUp(500)
  const specialtiesCount = useCountUp(50)
  const typedWord = useTypewriter(['Trusted Doctors', 'Expert Specialists', 'Verified Professionals', 'Caring Physicians'])

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#5f6FFF] rounded-lg px-6 md:px-10 lg:px-20 relative overflow-hidden'>

      {/* Decorative Background Elements */}
      <div className='absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]'></div>
      <div className='absolute bottom-0 left-0 w-52 h-52 bg-white opacity-5 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite]'></div>
      <div className='absolute top-1/3 left-1/4 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl animate-[float_6s_ease-in-out_infinite]'></div>

      {/* Floating particles */}
      <div className='absolute top-10 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-[float_3s_ease-in-out_infinite]'></div>
      <div className='absolute bottom-16 right-1/4 w-2.5 h-2.5 bg-white/30 rounded-full animate-[float_4s_ease-in-out_infinite_0.6s]'></div>

      {/* ECG Heartbeat Line — hospital signature touch */}
      <svg className='absolute bottom-6 left-0 w-full h-10 opacity-20' viewBox='0 0 500 40' preserveAspectRatio='none'>
        <polyline
          points='0,20 60,20 80,5 100,35 120,20 180,20 200,8 215,32 230,20 500,20'
          fill='none'
          stroke='white'
          strokeWidth='2'
          className='animate-[dash_3s_linear_infinite]'
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        />
      </svg>

      {/* --------- Left Side --------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] relative z-10'>

        {/* Badge with heartbeat pulse icon */}
        <div className='flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full mb-2 animate-[fadeInUp_0.6s_ease-out] hover:bg-opacity-30 transition-all duration-300'>
          <svg className='w-4 h-4 text-green-300 animate-pulse' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12h4l2-6 4 12 2-6h6' />
          </svg>
          <p className='text-white text-xs font-medium'>Trusted by 10,000+ Patients</p>
        </div>

        {/* Headline with typewriter dynamic word */}
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight animate-[fadeInUp_0.6s_ease-out_0.15s_both] min-h-[3.5em] md:min-h-[2.6em]'>
          Book Appointment <br />
          With{' '}
          <span className='relative inline-block text-yellow-300'>
            {typedWord}
            <span className='inline-block w-[2px] h-[0.9em] bg-yellow-300 ml-1 align-middle animate-[blink_0.8s_step-end_infinite]'></span>
          </span>
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light animate-[fadeInUp_0.6s_ease-out_0.3s_both]'>
          <img className='w-28 hover:scale-110 transition-transform duration-300' src={assets.group_profiles} alt="Profiles" />
          <p className='leading-relaxed'>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* Stats Section with count-up animation */}
        <div className='flex gap-6 mt-4 mb-2 animate-[fadeInUp_0.6s_ease-out_0.45s_both]'>
          <div className='text-white hover:-translate-y-1 transition-transform duration-300'>
            <p className='text-2xl font-bold'>{doctorsCount}+</p>
            <p className='text-xs opacity-80'>Verified Doctors</p>
          </div>
          <div className='w-px bg-white opacity-30'></div>
          <div className='text-white hover:-translate-y-1 transition-transform duration-300'>
            <p className='text-2xl font-bold'>{specialtiesCount}+</p>
            <p className='text-xs opacity-80'>Specialties</p>
          </div>
          <div className='w-px bg-white opacity-30'></div>
          <div className='text-white hover:-translate-y-1 transition-transform duration-300'>
            <p className='text-2xl font-bold'>24/7</p>
            <p className='text-xs opacity-80'>Support</p>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto animate-[fadeInUp_0.6s_ease-out_0.6s_both]'>
          <a
            href="#speciality"
            className='relative overflow-hidden group flex items-center justify-center gap-2 bg-white px-8 py-3 rounded-full text-[#5f6FFF] text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300'
          >
            <span className='relative z-10'>Book appointment</span>
            <img className='relative z-10 w-3 transition-transform duration-300 group-hover:translate-x-1' src={assets.arrow_icon} alt="" />
            <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#5f6FFF]/10 to-transparent'></span>
          </a>

          <a
            href="#doctors"
            className='flex items-center justify-center gap-2 bg-transparent border-2 border-white px-8 py-3 rounded-full text-white text-sm font-medium hover:bg-white hover:text-[#5f6FFF] hover:scale-105 transition-all duration-300'
          >
            View Doctors
          </a>
        </div>

        {/* Features List */}
        <div className='flex flex-col gap-2 mt-4 text-white text-xs animate-[fadeInUp_0.6s_ease-out_0.75s_both]'>
          <div className='flex items-center gap-2 hover:translate-x-1 transition-transform duration-300'>
            <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            <span>Instant appointment confirmation</span>
          </div>
          <div className='flex items-center gap-2 hover:translate-x-1 transition-transform duration-300'>
            <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            <span>100% verified healthcare professionals</span>
          </div>
          <div className='flex items-center gap-2 hover:translate-x-1 transition-transform duration-300'>
            <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
            </svg>
            <span>Secure and private consultations</span>
          </div>
        </div>

      </div>

      {/* --------- Right Side (Enlarged image) --------- */}
      <div className='md:w-1/2 relative flex items-end justify-center'>

        {/* Glow ring behind the image for a premium hospital feel */}
        <div className='hidden md:block absolute bottom-0 right-0 w-[110%] h-[85%] bg-white/10 rounded-full blur-3xl'></div>

        <img
          className='w-full md:w-[115%] md:absolute bottom-0 right-0 h-auto rounded-lg animate-[float_4s_ease-in-out_infinite] hover:scale-[1.03] transition-transform duration-500 drop-shadow-2xl'
          src={assets.header_img}
          alt="Doctors"
        />

        {/* Floating Card */}
        <div className='hidden md:block absolute top-16 right-8 bg-white/95 backdrop-blur p-4 rounded-xl shadow-xl animate-[float_3.5s_ease-in-out_infinite] hover:shadow-2xl hover:scale-105 transition-all duration-300 z-10'>
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
        <div className='hidden md:block absolute bottom-28 left-2 bg-white/95 backdrop-blur p-3 rounded-xl shadow-xl animate-[float_4.5s_ease-in-out_infinite_0.5s] hover:shadow-2xl hover:scale-105 transition-all duration-300 z-10'>
          <div className='flex items-center gap-2'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <span key={i} className='animate-[twinkle_1.5s_ease-in-out_infinite]' style={{ animationDelay: `${i * 0.15}s` }}>★</span>
              ))}
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