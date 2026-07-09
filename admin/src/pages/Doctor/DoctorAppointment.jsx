import { useEffect, useState } from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { X, Check } from "lucide-react";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const { getDoctorAppointments, appointments, loading, cancelAppointmentDoctor, completeAppointmentDoctor, addPrescriptionDoctor } =
    useDoctorContext();

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
  const [instructions, setInstructions] = useState("");

  const openPrescriptionModal = (appt) => {
    setSelectedAppt(appt);
    if (appt.prescription) {
      setMedicines(appt.prescription.medicines || [{ name: "", dosage: "", duration: "" }]);
      setInstructions(appt.prescription.instructions || "");
    } else {
      setMedicines([{ name: "", dosage: "", duration: "" }]);
      setInstructions("");
    }
    setShowPrescriptionModal(true);
  };

  const handleAddMedicine = () => {
    setMedicines(prev => [...prev, { name: "", dosage: "", duration: "" }]);
  };

  const handleRemoveMedicine = (idx) => {
    if (medicines.length === 1) return;
    setMedicines(prev => prev.filter((_, i) => i !== idx));
  };

  const handleMedicineChange = (idx, field, val) => {
    const updated = [...medicines];
    updated[idx][field] = val;
    setMedicines(updated);
  };

  const savePrescription = async (e) => {
    e.preventDefault();
    if (!selectedAppt) return;
    
    const validMedicines = medicines.filter(m => m.name.trim() !== "");
    const success = await addPrescriptionDoctor(selectedAppt._id, validMedicines, instructions);
    if (success) {
      setShowPrescriptionModal(false);
      setSelectedAppt(null);
    }
  };

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
                      ) : item.isCompleted ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-green-500 font-semibold text-xs px-2.5 py-1 bg-green-50 rounded-full border border-green-200">
                            Completed
                          </span>
                          <button
                            onClick={() => openPrescriptionModal(item)}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline cursor-pointer"
                          >
                            {item.prescription && item.prescription.medicines?.length > 0 ? "View/Edit Rx" : "Add Rx"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => cancelAppointmentDoctor(item._id)}
                            className="w-8 h-8 rounded-full border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center cursor-pointer transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                          <button
                            onClick={() => openPrescriptionModal(item)}
                            className="w-8 h-8 rounded-full border border-green-200 text-green-600 hover:bg-green-50 flex items-center justify-center cursor-pointer transition-colors"
                            title="Complete / Prescribe"
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

      {/* 📝 PRESCRIPTION MODAL */}
      {showPrescriptionModal && selectedAppt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-indigo-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold text-lg">Write Medical Prescription</h3>
                <p className="text-xs text-indigo-100">Patient: {selectedAppt.userData?.name} ({selectedAppt.userData?.gender})</p>
              </div>
              <button 
                onClick={() => { setShowPrescriptionModal(false); setSelectedAppt(null); }}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={savePrescription} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Medicines</label>
                
                <div className="space-y-3">
                  {medicines.map((med, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        placeholder="Medicine Name (e.g. Paracetamol)" 
                        value={med.name} 
                        onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Dosage (e.g. 1-0-1)" 
                        value={med.dosage} 
                        onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
                        className="w-32 px-3 py-2 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Duration (e.g. 5 days)" 
                        value={med.duration} 
                        onChange={(e) => handleMedicineChange(idx, "duration", e.target.value)}
                        className="w-32 px-3 py-2 border rounded-xl text-sm focus:border-indigo-500 outline-none"
                        required
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveMedicine(idx)}
                        disabled={medicines.length === 1}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-30 cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={handleAddMedicine}
                  className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  ➕ Add another medicine
                </button>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1 tracking-wider">Special Instructions</label>
                <textarea 
                  placeholder="Take after meals, avoid cold water..." 
                  value={instructions} 
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:border-indigo-500 outline-none h-24 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => { setShowPrescriptionModal(false); setSelectedAppt(null); }}
                  className="px-5 py-2 text-sm border rounded-xl hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-md transition cursor-pointer"
                >
                  Save & Complete
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
