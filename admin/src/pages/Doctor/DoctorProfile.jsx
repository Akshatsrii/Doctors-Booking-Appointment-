import { useEffect, useState } from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken } = useDoctorContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/doctor/profile`,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        setDoctor(data.doctor);
        setFormData({
          about: data.doctor.about,
          fees: data.doctor.fees,
          experience: data.doctor.experience,
          available: data.doctor.available,
        });
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dToken) fetchProfile();
  }, [dToken]);

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success("Profile updated");
        setDoctor((prev) => ({ ...prev, ...formData }));
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading || !doctor) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32" />

        <div className="px-8 pb-8">
          {/* TOP */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
            <div className="w-32 h-32 rounded-full ring-4 ring-white overflow-hidden">
              <img
                src={doctor.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                Dr. {doctor.name}
              </h1>
              <p className="text-gray-500">{doctor.speciality}</p>

              {isEdit ? (
                <select
                  className="mt-2 border rounded px-3 py-1"
                  value={formData.available}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      available: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              ) : (
                <span
                  className={`inline-block mt-2 px-4 py-1 text-sm rounded-full ${
                    doctor.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </span>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            {/* Experience */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 mb-1">Experience</p>
              {isEdit ? (
                <input
                  className="border w-full px-3 py-2 rounded"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experience: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="font-medium">{doctor.experience}</p>
              )}
            </div>

            {/* Fees */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 mb-1">Consultation Fees</p>
              {isEdit ? (
                <input
                  type="number"
                  className="border w-full px-3 py-2 rounded"
                  value={formData.fees}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fees: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="font-medium">₹{doctor.fees}</p>
              )}
            </div>
          </div>

          {/* ABOUT */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">About</h3>
            {isEdit ? (
              <textarea
                rows="4"
                className="w-full border rounded px-3 py-2"
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-600">{doctor.about}</p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4 justify-center">
            {isEdit ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-8 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-8 py-2 rounded-full border"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-8 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
