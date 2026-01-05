import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get profile image from context or use default
  const profileImage = userData?.image || assets.profile_pic;

  // Handle scroll effect with smooth transitions
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMenu]);

  const handleLogout = () => {
    setToken(false);
    setShowDropdown(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { path: "/doctors", label: "All Doctors", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { path: "/about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { path: "/contact", label: "Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  return (
    <>
      {/* Enhanced Backdrop for mobile menu */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 z-40 md:hidden backdrop-blur-md animate-fadeIn"
          onClick={() => setShowMenu(false)}
        />
      )}

      <nav
        className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md transition-all duration-500 ${
          scrolled 
            ? "shadow-lg shadow-blue-100/50 py-2.5" 
            : "py-4 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO with enhanced animation */}
            <div className="flex-shrink-0 transform transition-transform hover:scale-105 duration-300">
              <img
                className="w-40 sm:w-44 cursor-pointer drop-shadow-sm"
                src={assets.logo}
                alt="Logo"
                onClick={() => navigate("/")}
              />
            </div>

            {/* DESKTOP NAVIGATION with enhanced effects */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2 font-medium">
              {navLinks.map(({ path, label }) => (
                <NavLink key={path} to={path}>
                  {({ isActive }) => (
                    <li className="relative group px-4 py-2">
                      <span
                        className={`uppercase text-sm tracking-wider transition-all duration-300 ${
                          isActive
                            ? "text-blue-600 font-bold"
                            : "text-gray-700 hover:text-blue-600 group-hover:font-semibold"
                        }`}
                      >
                        {label}
                      </span>
                      {/* Animated underline */}
                      <span
                        className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                      {/* Hover glow effect */}
                      <span
                        className={`absolute inset-0 rounded-lg bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                          isActive ? "opacity-100" : ""
                        }`}
                      />
                    </li>
                  )}
                </NavLink>
              ))}
            </ul>

            {/* RIGHT SIDE ACTIONS with enhanced styling */}
            <div className="flex items-center gap-3 sm:gap-4">
              {token ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
                    aria-label="User menu"
                    aria-expanded={showDropdown}
                  >
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-all duration-300 shadow-md group-hover:shadow-lg"
                        src={profileImage}
                        alt="Profile"
                        onError={(e) => {
                          e.target.src = assets.profile_pic;
                        }}
                      />
                      {/* Online status indicator */}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    <img
                      className={`w-2.5 transition-all duration-300 hidden sm:inline ${
                        showDropdown ? "rotate-180 opacity-70" : "opacity-50 group-hover:opacity-100"
                      }`}
                      src={assets.dropdown_icon}
                      alt=""
                    />
                  </button>

                  {/* ENHANCED DROPDOWN MENU */}
                  <div
                    className={`absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-right ${
                      showDropdown
                        ? "opacity-100 scale-100 visible translate-y-0"
                        : "opacity-0 scale-95 invisible -translate-y-2"
                    }`}
                  >
                    {/* Dropdown Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-blue-200">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          src={profileImage}
                          alt="Profile"
                          onError={(e) => {
                            e.target.src = assets.profile_pic;
                          }}
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">My Account</p>
                          <p className="text-xs text-gray-600">Manage your profile</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate("/my-profile");
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate("/my-appointments");
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
                          <svg
                            className="w-4 h-4 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">My Appointments</span>
                      </button>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-200 text-sm sm:text-base overflow-hidden group"
                >
                  <span className="relative z-10">Create account</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              )}

              {/* MOBILE MENU ICON with animation */}
              <button
                onClick={() => setShowMenu(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Open menu"
              >
                <img src={assets.menu_icon} className="w-6" alt="" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ENHANCED MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-br from-white to-gray-50 z-50 shadow-2xl transform transition-all duration-500 ease-out ${
          showMenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Mobile Menu Header with gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-10" />
          <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <img
              src={assets.logo}
              className="w-36 cursor-pointer transform hover:scale-105 transition-transform duration-300"
              alt="Logo"
              onClick={() => {
                setShowMenu(false);
                navigate("/");
              }}
            />
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:rotate-90 active:scale-95"
              aria-label="Close menu"
            >
              <img src={assets.cross_icon} className="w-6" alt="" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links with icons and animations */}
        <div className="overflow-y-auto h-[calc(100%-80px)] px-4">
          <ul className="flex flex-col gap-2 mt-6 text-base font-medium">
            {navLinks.map(({ path, label, icon }, index) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setShowMenu(false)}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slideInRight"
              >
                {({ isActive }) => (
                  <li
                    className={`px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200 scale-105"
                        : "text-gray-700 hover:bg-white hover:shadow-md active:scale-95"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-blue-600 group-hover:scale-110"
                        } transition-transform duration-300`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={icon}
                        />
                      </svg>
                      <span className="uppercase tracking-wide font-semibold">{label}</span>
                    </div>
                    {isActive && (
                      <svg
                        className="w-5 h-5 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>

          {/* Enhanced Mobile User Section */}
          {token && (
            <div className="mt-8 pb-8 animate-fadeIn">
              <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-5 shadow-lg border border-blue-100 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative space-y-3">
                  <div className="flex items-center gap-4 pb-4 border-b border-blue-200">
                    <div className="relative">
                      <img
                        className="w-14 h-14 rounded-2xl object-cover border-3 border-white shadow-lg"
                        src={profileImage}
                        alt="Profile"
                        onError={(e) => {
                          e.target.src = assets.profile_pic;
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">Welcome back!</p>
                      <p className="text-sm text-gray-600">Manage your account</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3.5 text-sm text-gray-700 hover:bg-white rounded-xl transition-all duration-300 flex items-center gap-3 group hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 flex items-center justify-center transition-all duration-300 shadow-sm">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3.5 text-sm text-gray-700 hover:bg-white rounded-xl transition-all duration-300 flex items-center gap-3 group hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300 flex items-center justify-center transition-all duration-300 shadow-sm">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">My Appointments</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold group hover:shadow-md border border-transparent hover:border-red-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300 flex items-center justify-center transition-all duration-300 shadow-sm">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;