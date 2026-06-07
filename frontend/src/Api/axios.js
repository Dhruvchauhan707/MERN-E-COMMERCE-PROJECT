import axios from "axios";


// Create an Axios instance with default configuration
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,   
    timeout: 10000,                         
    withCredentials: true,                  
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;