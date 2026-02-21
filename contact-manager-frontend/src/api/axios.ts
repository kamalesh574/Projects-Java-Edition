import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

export const setAuth = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  api.defaults.headers.common["Authorization"] = `Basic ${token}`;
};

export const clearAuth = () => {
  delete api.defaults.headers.common["Authorization"];
};

export default api;