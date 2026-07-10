import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

  const { docId } = useParams()
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    userData            // ✅ REQUIRED
  } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        let tempDate = new Date(year, month - 1, day, 10, 0, 0, 0)
        let slotDateKey = tempDate.toISOString().split('T')[0]

        let isBooked = false
        if (docInfo && docInfo.slots_booked && docInfo.slots_booked[slotDateKey]) {
          if (docInfo.slots_booked[slotDateKey].includes(formattedTime)) {
            isBooked = true;
          }
        }

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked: isBooked,
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  /* ================= BOOK APPOINTMENT ================= */
  const bookAppointment = async () => {
    if (!token) {
      toast.error("Please login to book appointment")
      return
    }

    if (!userData) {
      toast.error("User data not loaded")
      return
    }

    if (!slotTime) {
      toast.error("Please select a slot")
      return
    }

    try {
      setIsBooking(true)

      const slotDate =
        docSlots[slotIndex][0].datetime.toISOString().split('T')[0]

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          userId: userData._id,   // ✅ ONLY THIS IS NEEDED
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.response?.data || error)
      toast.error("Failed to book appointment")
    } finally {
      setIsBooking(false)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  /* ================= LOADING STATE ================= */
  /* Previously this returned nothing while docInfo was loading, causing a blank flash. */
  if (!docInfo) {
    return (
      <div className='flex flex-col items-center justify-center py-32 gap-4'>
        <div className='w-10 h-10 border-4 border-[#5f6FFF]/20 border-t-[#5f6FFF] rounded-full animate-spin'></div>
        <p className='text-sm text-gray-500'>Loading doctor details...</p>
      </div>
    )
  }

  return (
    <div>

      {/* Self-contained keyframes, guaranteed to work regardless of index.css */}
      <style>{`
        @keyframes apptFadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .appt-fade-in { animation: apptFadeInUp 0.5s ease-out both; }
      `}</style>

      {/* --------- Doctor Profile --------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='appt-fade-in'>
          <img
            className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className='appt-fade-in flex-1 border border-gray-200 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-sm hover:shadow-md transition-shadow duration-300' style={{ animationDelay: '100ms' }}>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="Verified" />
          </p>

          <div className='flex items-center flex-wrap gap-2 text-sm mt-2 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border border-gray-300 text-xs rounded-full bg-gray-50'>
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-4'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1 leading-relaxed'>
              {docInfo.about}
            </p>
          </div>

          <div className='flex items-center gap-2 mt-4 bg-[#5f6FFF]/5 border border-[#5f6FFF]/10 w-fit px-4 py-2 rounded-lg'>
            <svg className='w-4 h-4 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
            </svg>
            <p className='text-gray-700 font-medium text-sm'>
              Appointment fee: <span className='text-gray-900 font-semibold'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* --------- Booking Slots --------- */}
      <div className='appt-fade-in sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700' style={{ animationDelay: '200ms' }}>
        <p className='flex items-center gap-2'>
          <svg className='w-4 h-4 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          Booking slots
        </p>

        {/* Day selector */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 no-scrollbar'>
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index)
                  setSlotTime('')
                }}
                className={`text-center py-6 min-w-[64px] rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                  slotIndex === index
                    ? 'bg-[#5f6FFF] text-white shadow-md shadow-[#5f6FFF]/30'
                    : 'border border-gray-200 hover:border-[#5f6FFF]/40'
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time selector */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 no-scrollbar'>
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => !item.isBooked && setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                  item.isBooked
                    ? 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed line-through'
                    : item.time === slotTime
                    ? 'bg-[#5f6FFF] text-white shadow-md shadow-[#5f6FFF]/30 scale-105'
                    : 'text-gray-400 border border-gray-300 hover:border-[#5f6FFF]/40 hover:scale-105'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        {/* Selected slot summary */}
        {slotTime && (
          <div className='flex items-center gap-2 mt-4 text-sm text-green-600 bg-green-50 border border-green-200 w-fit px-4 py-2 rounded-lg appt-fade-in'>
            <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
            Selected: {daysOfWeek[docSlots[slotIndex][0].datetime.getDay()]}, {docSlots[slotIndex][0].datetime.getDate()} at {slotTime}
          </div>
        )}

        <button
          onClick={bookAppointment}
          disabled={isBooking}
          className='relative overflow-hidden group bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:bg-[#4b5aff] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100'
        >
          {isBooking ? (
            <span className='flex items-center gap-2'>
              <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
              Booking...
            </span>
          ) : (
            'Book an appointment'
          )}
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment