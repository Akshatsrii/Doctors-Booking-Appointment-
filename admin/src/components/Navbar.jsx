import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useDoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useDoctorContext();
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }

    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-3">
        {/* SAME LOGO FOR BOTH */}
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Prescripto Logo"
        />

        {/* ROLE BADGE */}
        <span className="border px-3 py-1 rounded-full text-xs font-medium text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* ===== RIGHT ===== */}
      <button
        onClick={logout}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-8 py-2 rounded-full transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
