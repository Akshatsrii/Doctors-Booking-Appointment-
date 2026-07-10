import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'

// ---- Counts a number up from 0 to target once the element scrolls into view ----
const useCountUp = (target, shouldStart, duration = 1500) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, shouldStart])

  return count
}

const About = () => {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const patients = useCountUp(25000, statsVisible)
  const doctorsCount = useCountUp(500, statsVisible)
  const years = useCountUp(12, statsVisible)
  const satisfaction = useCountUp(98, statsVisible)

  const whyChooseUs = [
    {
      title: 'Efficiency',
      desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
      icon: (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.8' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
      ),
    },
    {
      title: 'Convenience',
      desc: 'Access to a network of trusted healthcare professionals in your area.',
      icon: (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.8' d='M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
      ),
    },
    {
      title: 'Personalization',
      desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
      icon: (
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.8' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
      ),
    },
  ]

  return (
    <div>

      {/* Self-contained keyframes so this section never depends on external CSS being added correctly */}
      <style>{`
        @keyframes aboutFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-fade-in { animation: aboutFadeInUp 0.6s ease-out both; }
      `}</style>

      {/* --------- Page Heading --------- */}
      <div className='text-center text-2xl pt-10 text-gray-500 about-fade-in'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        <div className='w-14 h-1 bg-[#5f6FFF] mx-auto rounded-full mt-3'></div>
      </div>

      {/* --------- Intro + Image --------- */}
      <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>

        {/* Image with floating stat badge */}
        <div className='relative w-full md:max-w-[360px] about-fade-in'>
          <img className='w-full rounded-xl shadow-lg' src={assets.about_image} alt="About Prescripto" />

          {/* Floating badge */}
          <div className='hidden sm:flex absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 items-center gap-3 border border-gray-100'>
            <div className='w-11 h-11 rounded-full bg-[#5f6FFF]/10 flex items-center justify-center'>
              <svg className='w-6 h-6 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>12+ Years</p>
              <p className='text-xs text-gray-500'>Of trusted care</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 about-fade-in' style={{ animationDelay: '150ms' }}>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to deliver a seamless user experience and superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>

          {/* Mission & Vision cards */}
          <div className='grid sm:grid-cols-2 gap-4 mt-2'>
            <div className='p-5 rounded-xl border border-gray-200 hover:border-[#5f6FFF]/40 hover:shadow-md transition-all duration-300'>
              <div className='w-9 h-9 rounded-lg bg-[#5f6FFF]/10 flex items-center justify-center mb-3'>
                <svg className='w-5 h-5 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <b className='text-gray-800 block mb-1'>Our Mission</b>
              <p className='text-xs leading-relaxed'>To make quality healthcare accessible and hassle-free for every patient, everywhere.</p>
            </div>
            <div className='p-5 rounded-xl border border-gray-200 hover:border-[#5f6FFF]/40 hover:shadow-md transition-all duration-300'>
              <div className='w-9 h-9 rounded-lg bg-[#5f6FFF]/10 flex items-center justify-center mb-3'>
                <svg className='w-5 h-5 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                </svg>
              </div>
              <b className='text-gray-800 block mb-1'>Our Vision</b>
              <p className='text-xs leading-relaxed'>To bridge the gap between patients and providers, making care easier to access, when it's needed most.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --------- Animated Stats Strip --------- */}
      <div ref={statsRef} className='bg-[#5f6FFF] rounded-xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white my-16'>
        <div>
          <p className='text-2xl md:text-3xl font-bold'>{patients.toLocaleString()}+</p>
          <p className='text-xs md:text-sm opacity-80 mt-1'>Patients Served</p>
        </div>
        <div>
          <p className='text-2xl md:text-3xl font-bold'>{doctorsCount}+</p>
          <p className='text-xs md:text-sm opacity-80 mt-1'>Verified Doctors</p>
        </div>
        <div>
          <p className='text-2xl md:text-3xl font-bold'>{years}+</p>
          <p className='text-xs md:text-sm opacity-80 mt-1'>Years of Service</p>
        </div>
        <div>
          <p className='text-2xl md:text-3xl font-bold'>{satisfaction}%</p>
          <p className='text-xs md:text-sm opacity-80 mt-1'>Patient Satisfaction</p>
        </div>
      </div>

      {/* --------- Why Choose Us --------- */}
      <div className='text-xl my-4 about-fade-in'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4 md:gap-0'>
        {whyChooseUs.map((item, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 120}ms` }}
            className='about-fade-in group flex-1 border border-gray-200 rounded-xl md:rounded-none px-8 md:px-12 py-10 sm:py-16 flex flex-col gap-4 text-[15px] hover:bg-[#5f6FFF] hover:text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-gray-600 cursor-pointer'
          >
            <div className='w-12 h-12 rounded-full bg-[#5f6FFF]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300'>
              <svg className='w-6 h-6 text-[#5f6FFF] group-hover:text-white transition-colors duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {item.icon}
              </svg>
            </div>
            <b>{item.title}</b>
            <p className='opacity-90'>{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default About