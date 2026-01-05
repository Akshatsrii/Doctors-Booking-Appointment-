import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // attach token automatically
  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const login = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  const value = {
    token,
    user,
    setUser,
    login,
    logout,
    api,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

// custom hook (best practice)
export const useAppContext = () => useContext(AppContext);
