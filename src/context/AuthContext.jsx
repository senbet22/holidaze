// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = sessionStorage.getItem("token");
      const userProfile = sessionStorage.getItem("DunestayProfile");

      if (token && userProfile) {
        setUser(JSON.parse(userProfile));
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (accessToken, userProfile) => {
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("DunestayProfile", JSON.stringify(userProfile));
    setUser(userProfile);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("DunestayProfile");
    setUser(null);
    navigate("/");
    toast.error("You are now logged out!", {
      autoClose: 2000,
    });
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Optional: Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated()) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated() ? children : null;
};
