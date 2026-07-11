import axios from "axios";

const api = axios.create({
  baseURL: "https://modern-store-1-nthj.onrender.com",
});

export default api;