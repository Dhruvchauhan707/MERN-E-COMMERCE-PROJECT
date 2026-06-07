// src/hooks/auth/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../Api/authApi';

const useLogin = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {

            setLoading(true);
            setError(null);

            const response = await authApi.login(
                {
                    email,
                    password,
                }
            );

            const user = response.data
       
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            if (user.role === "admin") {
                navigate("/admin/home");
            } else {
                navigate("/");
            }
            alert("Login Successful!");

        } catch (err) {

            console.log("LOGIN ERROR:", err);

            const errorMsg =
                err.response?.data?.message ||
                err.message ||
                "Invalid Credentials";

            setError(errorMsg);

            alert(errorMsg);

        } finally {

            setLoading(false);

        }
    };

    return { login, loading, error };
};

export { useLogin };