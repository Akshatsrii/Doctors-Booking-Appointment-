import { useEffect } from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { X, Check } from "lucide-react";

const DoctorAppointment = () => {
  const { getDoctorAppointments, appointments, loading } =
    useDoctorContext();

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "--";
    const birthYear = new Date(dob).getFullYear();
    if (isNaN(birthYear)) return "--";
    return new Date().getFullYear() - birthYear;
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-5">
        All Appointments
      </h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600">
              <th className="px-5 py-4 text-left">#</th>
              <th className="px-5 py-4 text-left">Patient</th>
              <th className="px-5 py-4 text-left">Payment</th>
              <th className="px-5 py-4 text-left">Age</th>
              <th className="px-5 py-4 text-left">Date & Time</th>
              <th className="px-5 py-4 text-left">Fees</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500"
                >
                  Loading appointments...
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-gray-500"
                >
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((item, index) => {
                const patient = item.userData || {};
                const isCancelled =
                  item.isCancelled || item.status === "cancelled";

                return (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    {/* # */}
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    {/* Patient */}
                    <td className="px-5 py-4 flex items-center gap-3">
                      <img
                        src={
                          patient.image ||
                          `https://ui-avatars.com/api/?name=${patient.name || "Patient"}&background=6366f1&color=fff`
                        }
                        alt="patient"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">
                        {patient.name || "N/A"}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 text-gray-700">
                        {item.isPaid ? "ONLINE" : "CASH"}
                      </span>
                    </td>

                    {/* Age */}
                    <td className="px-5 py-4">
                      {calculateAge(patient.dob)}
                    </td>

                    {/* Date & Time */}
                    <td className="px-5 py-4">
                      <span className="text-indigo-600 font-medium">
                        {item.slotDate}
                      </span>
                      <div className="text-xs text-gray-500">
                        {item.slotTime}
                      </div>
                    </td>

                    {/* Fees */}
                    <td className="px-5 py-4 font-semibold">
                      ₹{item.amount}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      {isCancelled ? (
                        <span className="text-red-500 font-medium">
                          Cancelled
                        </span>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="w-8 h-8 rounded-full border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                          <button
                            className="w-8 h-8 rounded-full border border-green-200 text-green-600 hover:bg-green-50 flex items-center justify-center"
                            title="Confirm"
                          >
                            <Check size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
