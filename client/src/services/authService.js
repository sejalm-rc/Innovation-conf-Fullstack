import { apiRequest } from "./api";

export function login(email, password) {
  return apiRequest("/auth/login", { method: "POST", body: { email, password } });
}

export function getCurrentAdmin(signal) {
  return apiRequest("/auth/me", { signal });
}

export function logout() {
  return apiRequest("/auth/logout", { method: "POST" });
}
