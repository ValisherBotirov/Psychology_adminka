import axios from "axios";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

$axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    // if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $axios;
