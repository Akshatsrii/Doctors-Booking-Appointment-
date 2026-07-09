import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext(null);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used inside AdminContextProvider");
  }
  return context;
};

const AdminContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [loading, setLoading] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null); // ✅ FIXED

  /* ================= ADMIN LOGIN ================= */
  const loginAdmin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/login`,
        { email, password }
      );

      if (data.success) {
        setAToken(data.token);
        localStorage.setItem("aToken", data.token);
        toast.success("Admin logged in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GET ALL DOCTORS ================= */
  const getAllDoctors = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/all-doctors`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error("Fetch doctors failed", error.message);
    }
  };

  /* ================= GET ALL APPOINTMENTS ================= */
  const getAllAppointments = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/appointments`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      toast.error("Failed to load appointments");
    }
  };

  /* ================= GET DASHBOARD DATA ================= */
  const getDashboardData = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    }
  };

  /* ================= CHANGE AVAILABILITY ================= */
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success("Availability updated");
        getAllDoctors();
      }
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  /* 🔁 AUTO LOAD AFTER LOGIN */
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getAllAppointments();
      getDashboardData(); // ✅ NOW WORKS
    }
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    loginAdmin,
    loading,

    doctors,
    getAllDoctors,
    changeAvailability,

    appointments,
    getAllAppointments,

    dashData,          // ✅ EXPOSE
    getDashboardData,  // ✅ EXPOSE
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
