import axios from "axios";


// Create an Axios instance with default configuration
const instance = axios.create({
    baseURL: "http://localhost:3000",   
    timeout: 10000,                         
    withCredentials: true,                  
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;