import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleClose = () => {
    if (setShowLogin) {
      setShowLogin(false);
    } else {
      navigate("/");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    loading || setLoading(true);

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        );

        if (data.success) {
          toast.success("Account created successfully");
          setState("Login");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        );

        if (data.success) {
          toast.success("Login successful");
          setToken(data.token);
          handleClose();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // card के अंदर click करने पर modal close न हो
        className="w-full max-w-[420px] bg-white rounded-[28px] shadow-xl p-8 relative animate-[fadeIn_0.2s_ease-out]"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="#4B5563" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight pr-10">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-500 mt-2 mb-6">
          {state === "Sign Up"
            ? "Sign up to book your appointments with ease."
            : "Sign in to access your appointments."}
        </p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-base font-semibold mt-2 transition-all"
          >
            {loading
              ? "Please wait..."
              : state === "Sign Up"
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <hr className="border-gray-200 my-6" />

        {state === "Sign Up" ? (
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-600 text-sm">
            New here?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Create account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;