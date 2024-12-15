import { API_URL } from "@/lib/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor for handling the response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle the response error
    const errorMessage = error.response?.data?.message || "Error fetching data";
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
