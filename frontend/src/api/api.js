import axios from "axios";

//  base API URL

const API = axios.create({
  baseURL: "https://email-sequence-app.onrender.com/api",
});

// Automatically attach JWT token to each request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Email Sequence  API calls
export const saveSequence = (data) => API.post("/sequences", data);
export const createLead = (data) => API.post("/leads", data);
export const executeSequence = (data) => API.post("/sequences/execute", data);

// User authentication API calls
export const signup = (data) => API.post("/users/register", data);
export const login = (data) => API.post("/users/login", data);
export const logout = () => API.post("/users/logout");
