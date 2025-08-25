import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userProfile = sessionStorage.getItem("DunestayProfile");
    if (token && userProfile) setUser(JSON.parse(userProfile));
    setIsLoading(false);
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
    toast.error("You are now logged out!", { autoClose: 2000 });
  };

  const isAuthenticated = () => !!user;
  const getToken = () => sessionStorage.getItem("token");

  const value = { user, isLoading, login, logout, isAuthenticated, getToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
