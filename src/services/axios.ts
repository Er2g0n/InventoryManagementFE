import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:64489/api/", 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add interceptors here if needed (e.g., auth, logging)

export default axiosInstance;
