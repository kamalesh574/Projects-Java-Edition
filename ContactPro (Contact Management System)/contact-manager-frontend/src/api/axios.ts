import axios from "axios";

const api = axios.create({
  const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});,
});

// ✅ Set Basic Auth header
export const setAuth = (
  username: string,
  passwordOrToken: string,
  isToken = false
) => {
  let encoded;

  if (isToken) {
    encoded = passwordOrToken;
  } else {
    encoded = btoa(`${username}:${passwordOrToken}`);
  }

  api.defaults.headers.common["Authorization"] = `Basic ${encoded}`;
};

// ✅ Clear auth header on logout
export const clearAuth = () => {
  delete api.defaults.headers.common["Authorization"];
};

export default api;
