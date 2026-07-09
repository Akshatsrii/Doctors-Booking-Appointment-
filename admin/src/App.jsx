import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

// Common Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./pages/Login";

// ================= ADMIN PAGES =================
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

// ================= DOCTOR PAGES (FIXED) =================
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // 🔐 Not logged in
  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD] min-h-screen flex flex-col">
      <ToastContainer />

      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-4">
          <Routes>
            {/* ================= ADMIN ROUTES ================= */}
            {aToken && (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
              </>
            )}

            {/* ================= DOCTOR ROUTES ================= */}
            {dToken && (
              <>
                <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                <Route
                  path="/doctor-dashboard"
                  element={<DoctorDashboard />}
                />
                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointments />}
                />
                <Route
                  path="/doctor-profile"
                  element={<DoctorProfile />}
                />
              </>
            )}

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
