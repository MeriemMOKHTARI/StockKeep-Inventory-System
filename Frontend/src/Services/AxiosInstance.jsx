import axios from "axios";
import { cookies } from "../authentification/Login";
//import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Set a base URL for all requests
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("accessToken");
    //const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      /* config.headers.AccessControlAllowOrigin = "*"; */
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 403) {
      originalRequest._retry = true;
      try {
        const refreshToken = cookies.get("refreshToken");
        const response = await axios.post(
          "http://127.0.0.1:8000/user/jwt/refresh/",
          {
            refresh: refreshToken,
          }
        );
        console.log(response.data.access);
        const token = response.data.access;

        cookies.set("accessToken", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
