import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { backendUrl, token, userData, setUserData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(null);

  /* ================= LOAD USER DATA ================= */
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        gender: userData.gender || "Not Selected",
        dob: userData.dob || "",
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
      });
    }
  }, [userData]);

  if (!formData) return null;

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
        return;
      }
      setImage(file);
    }
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("gender", formData.gender);
      data.append("dob", formData.dob);
      data.append("address", JSON.stringify(formData.address));

      if (image) data.append("image", image);

      const res = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully!");
        setUserData((prev) => ({
          ...prev,
          ...formData,
          image: image ? URL.createObjectURL(image) : prev.image,
        }));
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-sm">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-primary to-primary/80 h-32"></div>

        <div className="px-8 pb-8">
          {/* ================= PROFILE IMAGE SECTION ================= */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-gray-100">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData.image || "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isEdit && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-white text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-xs font-medium">Change Photo</span>
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              {isEdit ? (
                <input
                  className="text-2xl font-bold text-gray-800 border-b-2 border-primary px-3 py-2 focus:outline-none bg-transparent w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
              )}
              <p className="text-gray-500 mt-1">{userData.email}</p>
            </div>
          </div>

          {/* ================= CONTACT INFO ================= */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Information
            </h2>

            <div className="grid gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email Address
                </label>
                <p className="text-gray-800">{userData.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Phone Number
                </label>
                {isEdit ? (
                  <input
                    className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-primary focus:outline-none bg-white text-gray-800"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-800">{userData.phone || "Not provided"}</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Address
                </label>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-primary focus:outline-none bg-white text-gray-800"
                      placeholder="Address line 1"
                      value={formData.address.line1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            line1: e.target.value,
                          },
                        })
                      }
                    />
                    <input
                      className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-primary focus:outline-none bg-white text-gray-800"
                      placeholder="Address line 2"
                      value={formData.address.line2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            line2: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-800">
                    {userData.address?.line1 || "Not provided"}
                    {userData.address?.line2 && (
                      <>
                        <br />
                        {userData.address.line2}
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ================= BASIC INFO ================= */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Basic Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Gender
                </label>
                {isEdit ? (
                  <select
                    className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-primary focus:outline-none bg-white text-gray-800"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Not Selected</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{userData.gender}</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date of Birth
                </label>
                {isEdit ? (
                  <input
                    type="date"
                    className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-primary focus:outline-none bg-white text-gray-800"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-800">{userData.dob || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>

          {/* ================= EDIT/SAVE BUTTON ================= */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={isEdit ? handleSave : () => setIsEdit(true)}
              className={`px-10 py-3 rounded-full font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isEdit
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
              }`}
            >
              {isEdit ? "💾 Save Changes" : "✏️ Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;