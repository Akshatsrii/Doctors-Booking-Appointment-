import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext(null);

export const useDoctorContext = () => {
  return useContext(DoctorContext);
};

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  });
  const [loading, setLoading] = useState(false);

  /* ================= DOCTOR APPOINTMENTS ================= */
  const getDoctorAppointments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("dToken");
      if (!token) return;

      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: { dtoken: token },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DOCTOR DASHBOARD ================= */
  const getDoctorDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("dToken");
      if (!token) return;

      const { data } = await axios.get(
        `${backendUrl}/api/doctor/dashboard`,
        {
          headers: { dtoken: token },
        }
      );

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const logoutDoctor = () => {
    setDToken("");
    localStorage.removeItem("dToken");
  };

  const value = {
    dToken,
    setDToken,
    appointments,
    dashboardData,
    loading,
    getDoctorAppointments,
    getDoctorDashboard, // 🔥 THIS WAS MISSING
    logoutDoctor,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
