import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
  const { aToken, getAllDoctors } = useAdminContext(); // ✅ UPDATED

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    speciality: "General physician",
    degree: "",
    experience: "1 Year",
    gender: "Male",
    fees: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    about: "",
  });

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!aToken) {
      toast.error("Please login as admin first");
    }
  }, [aToken]);

  // IMAGE UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aToken) {
      toast.error("Admin not authenticated. Please login again.");
      return;
    }

    if (!image) {
      toast.error("Please upload doctor photo");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("speciality", data.speciality);
      formData.append("degree", data.degree);
      formData.append("experience", data.experience);
      formData.append("about", data.about);
      formData.append("fees", data.fees);

      formData.append(
        "address",
        JSON.stringify({
          street: `${data.address1}${data.address2 ? ", " + data.address2 : ""}`,
          city: data.city,
          state: data.state,
          pincode: Number(data.pincode),
        })
      );

      formData.append("image", image);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Doctor added successfully");

        // 🔥 THIS IS THE KEY LINE
        getAllDoctors();

        // OPTIONAL: clear form
        setData({
          name: "",
          email: "",
          password: "",
          phone: "",
          speciality: "General physician",
          degree: "",
          experience: "1 Year",
          gender: "Male",
          fees: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
          about: "",
        });
        setImage(null);
        setPreview(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-6">
      <div className="w-full max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl border border-indigo-100 p-6 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full -ml-24 -mb-24 opacity-50 blur-3xl"></div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add New Doctor
            </h1>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mb-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center gap-6">
              <label
                htmlFor="doc-img"
                className="group relative w-28 h-28 border-2 border-dashed border-indigo-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all duration-300 bg-white overflow-hidden"
              >
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <img src={assets.upload_area} className="w-10 opacity-60" />
                )}
              </label>

              <input
                type="file"
                hidden
                id="doc-img"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImage}
              />

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Doctor Profile Picture
                </p>
                <p className="text-xs text-gray-500">JPG, PNG • Max 5MB</p>
              </div>
            </div>
          </div>

            {/* FORM SECTIONS */}
            
            {/* Personal Information */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="input-wrapper">
                  <label className="input-label">Full Name *</label>
                  <input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Dr. John Doe"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">Email Address *</label>
                  <input
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="doctor@hospital.com"
                    type="email"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">Password *</label>
                  <input
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    type="password"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">Phone Number</label>
                  <input
                    name="phone"
                    value={data.phone || ""}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    type="tel"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
                Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="input-wrapper">
                  <label className="input-label">Specialization *</label>
                  <select
                    name="speciality"
                    value={data.speciality}
                    onChange={handleChange}
                    className="input"
                  >
                    <option>General physician</option>
                    <option>Gynecologist</option>
                    <option>Dermatologist</option>
                    <option>Pediatrician</option>
                    <option>Neurologist</option>
                    <option>Gastroenterologist</option>
                  </select>
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Education *</label>
                  <input
                    name="degree"
                    value={data.degree}
                    onChange={handleChange}
                    placeholder="MBBS, MD"
                    className="input"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Experience *</label>
                  <select
                    name="experience"
                    value={data.experience}
                    onChange={handleChange}
                    className="input"
                  >
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>3 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Gender</label>
                  <select
                    name="gender"
                    value={data.gender || "Male"}
                    onChange={handleChange}
                    className="input"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="input-wrapper md:col-span-4">
                  <label className="input-label">Consultation Fees *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      name="fees"
                      value={data.fees}
                      onChange={handleChange}
                      placeholder="500"
                      type="number"
                      className="input pl-8"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="input-wrapper md:col-span-2">
                  <label className="input-label">Address Line 1 *</label>
                  <input
                    name="address1"
                    value={data.address1}
                    onChange={handleChange}
                    placeholder="Street, Building name"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper md:col-span-2">
                  <label className="input-label">Address Line 2</label>
                  <input
                    name="address2"
                    value={data.address2}
                    onChange={handleChange}
                    placeholder="Landmark, Area"
                    className="input"
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">City *</label>
                  <input
                    name="city"
                    value={data.city || ""}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">State *</label>
                  <input
                    name="state"
                    value={data.state || ""}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">PIN Code *</label>
                  <input
                    name="pincode"
                    value={data.pincode || ""}
                    onChange={handleChange}
                    placeholder="400001"
                    type="text"
                    maxLength="6"
                    className="input"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label className="input-label">Country</label>
                  <input
                    name="country"
                    value={data.country || "India"}
                    onChange={handleChange}
                    placeholder="India"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-600 rounded-full"></span>
                About Doctor
              </h3>
              <div className="input-wrapper">
                <label className="input-label">Brief Description</label>
                <textarea
                  name="about"
                  value={data.about}
                  onChange={handleChange}
                  placeholder="Write a brief description about the doctor's expertise, achievements, and approach to patient care..."
                  className="input h-24 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding Doctor...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Doctor
                </span>
              )}
                     </button>
         
        </form>
      </div>

      {/* ENHANCED STYLES */}
      <style>
        {`
          .input-wrapper {
            position: relative;
          }

          .input-label {
            display: block;
            font-size: 0.75rem;
            font-weight: 600;
            color: #4b5563;
            margin-bottom: 0.375rem;
            text-transform: uppercase;
            letter-spacing: 0.025em;
          }

          .input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1.5px solid #e5e7eb;
            background: #ffffff;
            outline: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            color: #1f2937;
          }

          .input:focus {
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            transform: translateY(-1px);
          }

          .input::placeholder {
            color: #9ca3af;
          }

          .input:hover {
            border-color: #c7d2fe;
          }

          select.input {
            cursor: pointer;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 20px;
            padding-right: 40px;
            appearance: none;
          }

          textarea.input {
            font-family: inherit;
          }
        `}
      </style>
    </div>
  );
};

export default AddDoctor;
