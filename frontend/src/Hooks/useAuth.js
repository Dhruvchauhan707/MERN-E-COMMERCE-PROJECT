import { useState, useEffect } from "react";
import { authApi } from "../Api/authApi";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authApi.getProfile();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); // agar token use kar rahe ho
    setUser(null);
  };

 const requireLogin = (callback) => {
    if (!user) {
      toast.warning("Please login to add items to cart");   // ya info
      navigate("/login");
      return false;
    }
    callback();   // logged in hai to cart add karo
    return true;
  };

  return { user, loading, logout, requireLogin };
};

export default useAuth;