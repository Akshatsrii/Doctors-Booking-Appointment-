import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showRxModal, setShowRxModal] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);

  const selectPaymentMethod = async (appointmentId, method) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/select-payment-method`,
        { appointmentId, method },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getMyAppointments();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to update payment method");
    }
  };

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
        setAppointments(data.appointments);
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

            {item.isCancelled && (
              <span className="sm:min-w-48 py-2 border border-red-500 rounded text-sm text-red-500 text-center font-medium bg-red-50">
                Appointment Cancelled
              </span>
            )}

            {item.isCompleted && (
              <div className="flex flex-col gap-2">
                <span className="sm:min-w-48 py-2 border border-green-500 rounded text-sm text-green-500 text-center font-medium bg-green-50">
                  Completed
                </span>
                {item.prescription && (
                  <button
                    onClick={() => { setSelectedRx(item); setShowRxModal(true); }}
                    className="sm:min-w-48 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded text-sm font-semibold transition cursor-pointer shadow-sm hover:shadow"
                  >
                    View Prescription
                  </button>
                )}
              </div>
            )}

            {!item.isCancelled && !item.isCompleted && (
              <>
                {!item.isPaid && (
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {item.paymentMethod === "cash" ? (
                      <>
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-250 text-center font-semibold">
                          Clinic Payment (Pending)
                        </span>
                        <button
                          onClick={() => selectPaymentMethod(item._id, "online")}
                          className="sm:min-w-48 py-2 border border-indigo-200 rounded text-sm text-indigo-650 hover:bg-indigo-50 transition cursor-pointer font-semibold"
                        >
                          Switch to Online Payment
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 text-center font-semibold">
                          Online Payment Pending
                        </span>
                        <button
                          onClick={async () => {
                            try {
                              const { data } = await axios.post(
                                `${backendUrl}/api/user/pay-appointment`,
                                { appointmentId: item._id },
                                { headers: { Authorization: `Bearer ${token}` } }
                              );

                              if (data.success && data.sessionUrl) {
                                window.location.href = data.sessionUrl;
                              }
                            } catch {
                              toast.error("Payment initiation failed");
                            }
                          }}
                          className="sm:min-w-48 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded text-sm font-bold shadow-sm hover:shadow transition cursor-pointer text-center"
                        >
                          Pay Online (Card / UPI)
                        </button>
                        <button
                          onClick={() => selectPaymentMethod(item._id, "cash")}
                          className="sm:min-w-48 py-2 border border-stone-300 rounded text-sm text-stone-650 hover:bg-stone-50 transition cursor-pointer font-semibold"
                        >
                          Pay at Clinic (Cash)
                        </button>
                      </>
                    )}
                  </div>
                )}

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
                        getMyAppointments();
                      }
                    } catch {
                      toast.error("Cancel failed");
                    }
                  }}
                  className="sm:min-w-48 py-2 border rounded text-sm text-stone-500 hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  Cancel appointment
                </button>
              </>
            )}

            {item.isPaid && !item.isCancelled && (
              <span className="sm:min-w-48 py-2 border border-green-500 rounded text-sm text-green-500 text-center font-medium bg-green-50">
                Paid ({item.paymentMethod === "online" ? "Stripe Online" : "Clinic Cash"})
              </span>
            )}

          </div>
        </div>
      ))}

      {/* 🧾 PATIENT VIEW PRESCRIPTION MODAL */}
      {showRxModal && selectedRx && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col">
            
            {/* Header / Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center text-white no-print">
              <span className="font-bold text-lg">Medical Prescription Slip</span>
              <button 
                onClick={() => { setShowRxModal(false); setSelectedRx(null); }}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Print Slip Area */}
            <div id="prescription-print-area" className="p-8 space-y-6 bg-white text-gray-800">
              {/* Slip Header */}
              <div className="flex justify-between items-start border-b-2 border-blue-600 pb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">PRESCRIPTO CLINICS</h1>
                  <p className="text-xs text-gray-500">24/7 Premium Healthcare & Digital Consultations</p>
                  <p className="text-xs text-gray-500">Email: support@prescripto.com | Tel: +91 98765 43210</p>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold text-gray-700">Rx Prescription</h2>
                  <p className="text-xs text-gray-500">Date: {new Date(selectedRx.prescription?.prescribedAt || selectedRx.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Appt ID: #{selectedRx._id?.substring(18).toUpperCase()}</p>
                </div>
              </div>

              {/* Doctor & Patient Metadata */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Consultant Doctor</p>
                  <p className="font-bold text-gray-800">Dr. {selectedRx.docData?.name}</p>
                  <p className="text-xs text-gray-600">{selectedRx.docData?.degree} - {selectedRx.docData?.speciality}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient Details</p>
                  <p className="font-bold text-gray-800">{selectedRx.userData?.name}</p>
                  <p className="text-xs text-gray-600">Gender: {selectedRx.userData?.gender} | DOB: {selectedRx.userData?.dob || "N/A"}</p>
                </div>
              </div>

              {/* Medicines Table */}
              <div className="space-y-2">
                <p className="text-lg font-bold text-blue-600 flex items-center gap-1 border-b pb-1">
                  <span>💊</span> Prescribed Medicines
                </p>
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="py-2 px-1 w-12">#</th>
                      <th className="py-2 px-1">Medicine Name</th>
                      <th className="py-2 px-1">Dosage Schedule</th>
                      <th className="py-2 px-1">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRx.prescription?.medicines?.map((med, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50/50">
                        <td className="py-3 px-1 font-semibold text-gray-500">{idx + 1}</td>
                        <td className="py-3 px-1 font-bold text-gray-800">{med.name}</td>
                        <td className="py-3 px-1 text-gray-600">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium border border-blue-100">
                            {med.dosage}
                          </span>
                        </td>
                        <td className="py-3 px-1 text-gray-600">{med.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Special Instructions */}
              {selectedRx.prescription?.instructions && (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-700">📝 Special Instructions:</p>
                  <p className="text-sm text-gray-600 leading-relaxed bg-yellow-50/50 border border-yellow-100 p-3 rounded-xl">
                    {selectedRx.prescription.instructions}
                  </p>
                </div>
              )}

              {/* Stamp & Footer */}
              <div className="pt-8 flex justify-between items-end border-t border-dashed mt-8">
                <div className="text-xs text-gray-400">
                  <p>Disclaimer: This is a digitally generated medical prescription.</p>
                  <p>Prescripto Digital Healthcare Network.</p>
                </div>
                <div className="text-center w-48 border-t border-gray-300 pt-1">
                  <div className="h-10 text-indigo-400 font-serif italic text-sm">Dr. {selectedRx.docData?.name?.split(" ").pop()}</div>
                  <p className="text-xs font-bold text-gray-700">Authorized Signature</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100 no-print">
              <button 
                onClick={() => { setShowRxModal(false); setSelectedRx(null); }}
                className="px-5 py-2 text-sm border rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => window.print()}
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md cursor-pointer"
              >
                Print Prescription
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🖨 PRINT STYLES */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #prescription-print-area, #prescription-print-area * {
            visibility: visible;
          }
          #prescription-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            padding: 0;
            margin: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MyAppointments;
