import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("autotix_user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("autotix_token") || null
  );

  const [loading, setLoading] = useState(true);

  // 🔥 Load auth state on startup
  useEffect(() => {
    setLoading(false);
  }, []);

  const isAuthenticated = !!token;

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);

      const token = response.data.access_token;
      const userData = response.data.user;

      localStorage.setItem("autotix_user", JSON.stringify(userData));
      localStorage.setItem("autotix_token", token);

      setUser(userData);
      setToken(token);

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("autotix_user");
    localStorage.removeItem("autotix_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,  // ✅ added
        loading           // ✅ added
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};