import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useDoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useDoctorContext();

  if (!aToken && !dToken) return null;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 text-base font-medium transition-all duration-300 relative group rounded-xl mx-2
     ${
       isActive
         ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md scale-105"
         : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600 hover:scale-102"
     }`;

  return (
    <div className="min-h-screen w-80 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
      {/* HEADER */}
      <div className="p-8 border-b border-gray-200 bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <img
              src={assets.home_icon}
              className="w-7 h-7 invert"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">
              {aToken ? "Admin Panel" : "Doctor Panel"}
            </h2>
            <p className="text-indigo-100 text-sm">
              Healthcare System
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <ul className="pt-8 space-y-2 px-3 pb-6">

        {/* ================= ADMIN SIDEBAR ================= */}
        {aToken && (
          <>
            <li>
              <NavLink to="/admin-dashboard" className={linkClass}>
                <img src={assets.home_icon} className="w-5" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/all-appointments" className={linkClass}>
                <img src={assets.appointment_icon} className="w-5" />
                <span>Appointments</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/add-doctor" className={linkClass}>
                <img src={assets.add_icon} className="w-5" />
                <span>Add Doctor</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor-list" className={linkClass}>
                <img src={assets.people_icon} className="w-5" />
                <span>Doctors List</span>
              </NavLink>
            </li>
          </>
        )}

        {/* ================= DOCTOR SIDEBAR ================= */}
        {dToken && (
          <>
            <li>
              <NavLink to="/doctor-dashboard" className={linkClass}>
                <img src={assets.home_icon} className="w-5" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor-appointments" className={linkClass}>
                <img src={assets.appointment_icon} className="w-5" />
                <span>Appointments</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctor-profile" className={linkClass}>
                <img src={assets.people_icon} className="w-5" />
                <span>Profile</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
