import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState(() => {
    return localStorage.getItem("loggedInStatus") || "NOT_LOGGED_IN";
  });

  const [adminStatus, setAdminStatus] = useState(() => {
    return localStorage.getItem("adminStatus") || "NOT_ADMIN";
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  const [user_id, setUser_id] = useState(() => {
    return localStorage.getItem("user_id") || "";
  });

  const handleLogin = async (user) => {
    try {
      setLoggedInStatus("LOGGED_IN");
      setUsername(user.username);
      setUser_id(user.user_id);
      setAdminStatus(user.is_admin ? "ADMIN" : "NOT_ADMIN");

      localStorage.setItem("loggedInStatus", "LOGGED_IN");
      localStorage.setItem("username", user.username);
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem(
        "adminStatus",
        user.is_admin ? "ADMIN" : "NOT_ADMIN"
      );
    } catch (error) {
      console.error("Error during login update:", error);
    }
  };

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
    setUsername("");
    setUser_id("");
    setAdminStatus("NOT_ADMIN");

    localStorage.removeItem("loggedInStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("adminStatus");
  };

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("loggedInStatus");
    const storedUsername = localStorage.getItem("username");
    const storedUser_id = localStorage.getItem("user_id");
    const storedAdminStatus = localStorage.getItem("adminStatus");

    if (storedLoggedInStatus) setLoggedInStatus(storedLoggedInStatus);
    if (storedUsername) setUsername(storedUsername);
    if (storedUser_id) setUser_id(storedUser_id);
    if (storedAdminStatus) setAdminStatus(storedAdminStatus);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInStatus,
        adminStatus,
        username,
        user_id,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
