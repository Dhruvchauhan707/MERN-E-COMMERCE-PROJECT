// src/hooks/auth/useRegister.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../Api/authApi';

export const useRegister = () => {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (name, email, password) => {
        try {
            setLoading(true);
            setError(null);

            await authApi.register({ name, email, password });

            alert("Registration Successful!");
            navigate('/login');

        } catch (err) {
            const errorMsg = err.response?.data?.message || "Registration failed";
            setError(errorMsg);
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};