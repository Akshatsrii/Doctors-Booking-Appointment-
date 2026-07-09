import { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { useDoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginAdmin, loading: adminLoading } = useAdminContext();
  const { loginDoctor, loading: doctorLoading } = useDoctorContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (state === "Admin") {
        const res = await loginAdmin({ email, password });

        // ✅ REDIRECT ADMIN
        navigate("/admin-dashboard");
      } else {
        const res = await loginDoctor({ email, password });

        // ✅ REDIRECT DOCTOR
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const isLoading = adminLoading || doctorLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[360px] p-6 rounded-xl shadow-md border"
      >
        <h2 className="text-center text-2xl font-semibold text-indigo-500 mb-5">
          {state} Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md text-white font-medium transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm mt-4 text-gray-600">
          {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            onClick={() =>
              setState(state === "Admin" ? "Doctor" : "Admin")
            }
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
