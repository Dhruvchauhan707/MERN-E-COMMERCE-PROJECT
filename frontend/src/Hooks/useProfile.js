import { useEffect, useState } from "react";
import { authApi } from "../Api/authApi";

export const useProfile = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {

    try {
      const data = await authApi.getProfile();
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    user,
    loading,
    fetchProfile,
  };
};