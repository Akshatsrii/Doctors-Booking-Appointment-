import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getMyAppointments = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/my-appointments`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        const activeAppointments = data.appointments.filter(
          (item) => item.isCancelled !== true
        );
        setAppointments(activeAppointments);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to load appointments");
    }
  };

  useEffect(() => {
    getMyAppointments();
  }, [token]);

  return (
    <div className="px-6 md:px-20 my-12">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      {appointments.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">
          No appointments booked yet
        </p>
      )}

      {appointments.map((item) => (
        <div key={item._id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
          
          <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />

          <div className="flex-1 text-sm text-zinc-600">
            <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
            <p>{item.docData.speciality}</p>

            <p className="text-xs mt-1">
              <span className="font-medium">Date & Time:</span>{" "}
              {item.slotDate} | {item.slotTime}
            </p>

            <p className="text-xs mt-1">
              <span className="font-medium">Fees:</span> ₹{item.amount}
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-end">

            {!item.isPaid && (
              <button
                onClick={async () => {
                  try {
                    const { data } = await axios.post(
                      `${backendUrl}/api/user/pay-appointment`,
                      { appointmentId: item._id },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );

                    if (data.success && data.sessionUrl) {
                      window.location.href = data.sessionUrl; // 🔥 STRIPE
                    }
                  } catch {
                    toast.error("Payment initiation failed");
                  }
                }}
                className="sm:min-w-48 py-2 border rounded text-sm text-stone-500 hover:bg-primary hover:text-white transition"
              >
                Pay Online
              </button>
            )}

            {!item.isCancelled && (
              <button
                onClick={async () => {
                  try {
                    const { data } = await axios.post(
                      `${backendUrl}/api/user/cancel-appointment`,
                      { appointmentId: item._id },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );

                    if (data.success) {
                      toast.success(data.message);
                      setAppointments((prev) =>
                        prev.filter((appt) => appt._id !== item._id)
                      );
                    }
                  } catch {
                    toast.error("Cancel failed");
                  }
                }}
                className="sm:min-w-48 py-2 border rounded text-sm text-stone-500 hover:bg-red-500 hover:text-white transition"
              >
                Cancel appointment
              </button>
            )}

            {item.isPaid && (
              <span className="text-green-600 font-medium text-sm">
                Payment Completed
              </span>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
