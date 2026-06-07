import axios from './axios';

export const authApi = {

    // Register a new user
    register: (userData) =>
        axios.post('/api/auth/register', userData),

   // Login an existing user
    login: (userData) =>
        axios.post('/api/auth/login', userData),

    //get user profile
    getProfile: async () => {
        const { data } = await axios.get(
            "/api/auth/profile"
        );
        return data;
    },
     
};