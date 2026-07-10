import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }
    setIsSending(true)
    // Hook this up to your backend/email service when ready
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.")
      setFormData({ name: '', email: '', message: '' })
      setIsSending(false)
    }, 1000)
  }

  return (
    <div>

      {/* Self-contained keyframes */}
      <style>{`
        @keyframes contactFadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-fade-in { animation: contactFadeInUp 0.55s ease-out both; }
      `}</style>

      <div className='text-center text-2xl pt-10 text-gray-500 contact-fade-in'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
        <div className='w-14 h-1 bg-[#5f6FFF] mx-auto rounded-full mt-3'></div>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 text-sm'>

        {/* Image with floating badge */}
        <div className='relative w-full md:max-w-[360px] contact-fade-in'>
          <img className='w-full rounded-xl shadow-lg' src={assets.contact_image} alt="Contact Prescripto" />
          <div className='hidden sm:flex absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-3 items-center gap-2 border border-gray-100'>
            <span className='w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse'></span>
            <p className='text-xs font-medium text-gray-700'>We usually reply within 24h</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-start gap-6 contact-fade-in' style={{ animationDelay: '120ms' }}>

          <p className='font-semibold text-lg text-gray-700'>Our OFFICE</p>

          <div className='flex items-start gap-3'>
            <div className='w-9 h-9 rounded-lg bg-[#5f6FFF]/10 flex items-center justify-center flex-shrink-0'>
              <svg className='w-5 h-5 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </div>
            <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          </div>

          <div className='flex items-start gap-3'>
            <div className='w-9 h-9 rounded-lg bg-[#5f6FFF]/10 flex items-center justify-center flex-shrink-0'>
              <svg className='w-5 h-5 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
              </svg>
            </div>
            <p className='text-gray-500'>
              Tel: <a href="tel:+14155550132" className='hover:text-[#5f6FFF] transition-colors'>(415) 555-0132</a><br />
              Email: <a href="mailto:greatstackdev@gmail.com" className='hover:text-[#5f6FFF] transition-colors'>greatstackdev@gmail.com</a>
            </p>
          </div>

          <hr className='w-full border-gray-200' />

          <p className='font-semibold text-lg text-gray-700'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500 -mt-3'>Learn more about our teams and job openings.</p>
          <button className='group flex items-center gap-2 border border-gray-800 px-8 py-3.5 text-sm hover:bg-[#5f6FFF] hover:border-[#5f6FFF] hover:text-white transition-all duration-300 hover:scale-105'>
            Explore Jobs
            <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
          </button>
        </div>

      </div>

      {/* --------- Contact Form --------- */}
      <div className='max-w-2xl mx-auto mb-24 px-4 contact-fade-in' style={{ animationDelay: '240ms' }}>
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8'>
          <p className='font-semibold text-lg text-gray-700 mb-1'>Send us a message</p>
          <p className='text-sm text-gray-500 mb-6'>Have a question? Fill out the form and our team will get back to you.</p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='grid sm:grid-cols-2 gap-4'>
              <input
                type='text'
                name='name'
                placeholder='Your name'
                value={formData.name}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5f6FFF]/40 focus:border-[#5f6FFF] transition-all duration-300'
              />
              <input
                type='email'
                name='email'
                placeholder='Your email'
                value={formData.email}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5f6FFF]/40 focus:border-[#5f6FFF] transition-all duration-300'
              />
            </div>
            <textarea
              name='message'
              placeholder='Your message'
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className='border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5f6FFF]/40 focus:border-[#5f6FFF] transition-all duration-300 resize-none'
            />
            <button
              type='submit'
              disabled={isSending}
              className='self-start flex items-center gap-2 bg-[#5f6FFF] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#4b5aff] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              {isSending ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Contact