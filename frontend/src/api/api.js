import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4500/api",
});

export const saveSequence = (data) => API.post("/sequences", data);
export const createLead = (data) => API.post("/leads", data);
export const executeSequence = (data) => API.post("/sequences/execute", data);
