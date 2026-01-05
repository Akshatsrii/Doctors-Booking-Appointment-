import React, { useEffect } from "react";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
  const { appointments, getAllAppointments } = useAdminContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const aToken = localStorage.getItem("aToken");

  useEffect(() => {
    getAllAppointments();
  }, []);

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        alert(data.message);
        getAllAppointments(); // 🔁 refresh list
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">All Appointments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-600 text-sm">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Patient</th>
              <th className="py-3 px-2">Age</th>
              <th className="py-3 px-2">Date & Time</th>
              <th className="py-3 px-2">Doctor</th>
              <th className="py-3 px-2">Fees</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 && (
              <tr>
                <td colSpan="8" className="py-6 text-center text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}

            {appointments.map((item, index) => (
              <tr
                key={item._id}
                className="border-b text-sm hover:bg-gray-50"
              >
                <td className="py-3 px-2">{index + 1}</td>

                {/* PATIENT */}
                <td className="py-3 px-2 flex items-center gap-2">
                  <img
                    src={item.userData?.image || "/avatar.png"}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{item.userData?.name}</span>
                </td>

                {/* AGE */}
                <td className="py-3 px-2">
                  {item.userData?.dob
                    ? new Date().getFullYear() -
                      new Date(item.userData.dob).getFullYear()
                    : "--"}
                </td>

                {/* DATE & TIME */}
                <td className="py-3 px-2">
                  {item.slotDate} | {item.slotTime}
                </td>

                {/* DOCTOR */}
                <td className="py-3 px-2">
                  {item.docData?.name}
                </td>

                {/* FEES */}
                <td className="py-3 px-2">₹{item.amount}</td>

                {/* STATUS */}
                <td className="py-3 px-2">
                  {item.isCancelled ? (
                    <span className="text-red-500 font-medium">
                      Cancelled
                    </span>
                  ) : item.isPaid ? (
                    <span className="text-green-600 font-medium">
                      Paid
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-medium">
                      Pending
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="py-3 px-2">
                  {!item.isCancelled && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
