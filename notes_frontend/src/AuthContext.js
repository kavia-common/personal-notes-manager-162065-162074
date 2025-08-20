import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken, setToken, clearToken, authLoginAndStoreToken } from "./api";

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth context. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state and helpers. */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setInitializing(false);
      return;
    }

    api.me()
      .then((u) => setUser(u))
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    authLoginAndStoreToken(data);
    const u = await api.me();
    setUser(u);
    return u;
  };

  const register = async (email, password) => {
    const data = await api.register({ email, password });
    authLoginAndStoreToken(data);
    const u = await api.me();
    setUser(u);
    return u;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, initializing, login, register, logout }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
