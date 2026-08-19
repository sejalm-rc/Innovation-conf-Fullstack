import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authenticated | unauthenticated

  const refresh = useCallback(async () => {
    try {
      const res = await authService.getCurrentAdmin();
      setAdmin(res.data.admin);
      setStatus("authenticated");
    } catch {
      setAdmin(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    const res = await authService.login(email, password);
    setAdmin(res.data.admin);
    setStatus("authenticated");
    return res.data.admin;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setAdmin(null);
      setStatus("unauthenticated");
    }
  }, []);

  const value = useMemo(
    () => ({ admin, status, isAuthenticated: status === "authenticated", login, logout, refresh }),
    [admin, status, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
