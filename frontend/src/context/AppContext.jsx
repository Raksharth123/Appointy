import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) setUserData(data.userData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    if (token) getUserData();
    else setUserData(null);
  }, [token]);

  const value = {
    backendUrl,
    token, setToken,
    userData, setUserData,
    doctors, getDoctors,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
