import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

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
          localStorage.setItem("token", data.token);

          // ✅ SIMPLE FIX — FORCE DASHBOARD LOAD
          window.location.replace("/");
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={submitHandler}
        className="w-[360px] border-2 border-blue-300 rounded-md p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-sm text-gray-500">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
        </p>

        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm font-medium mt-2"
        >
          {loading
            ? "Please wait..."
            : state === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-xs text-gray-500 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-500 text-center">
            Create a new account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
