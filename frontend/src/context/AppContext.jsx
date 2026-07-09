import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "₹";

  /* ================= STATES ================= */
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH DOCTORS (PUBLIC) ================= */
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/list`
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load doctors");
    }
  };

  /* ================= GET USER PROFILE ================= */
  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/get-profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setToken("");
    setUserData(null);
    localStorage.removeItem("token");
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      loadUserProfileData();
    }
  }, [token]);

  /* ================= CONTEXT VALUE ================= */
  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    loading,
    setLoading,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
