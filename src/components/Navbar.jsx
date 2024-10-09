import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./auth/AuthContext";
import { logout } from "../helpers/API";

export default function Navbar() {
  const { loggedInStatus, adminStatus, handleLogout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRecipeManagerPage = location.pathname === "/recipe-manager";
  const isAdminDashboard = location.pathname === "/admin-dashboard";
  const isAddRecipePage = location.pathname === "/add-recipe";
  const isSignupPage = location.pathname === "/signup";
  const isLoggedIn = loggedInStatus === "LOGGED_IN";

  const handleLogoutClick = async () => {
    try {
      const response = await logout();
      handleLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="dropdown-container">
        <div className="dropdown-icon-container">
          <FontAwesomeIcon icon={faBars} className="dropicon" />
        </div>
        <div className="dropdown-links">
          {!isHomePage && (
            <Link to="/">
              Home
            </Link>
          )}
          {!isLoginPage && !isLoggedIn && (
            <Link to="/login">
              Login/Sign up
            </Link>
          )}
          {!isAddRecipePage && isLoggedIn && (
            <Link to="/add-recipe">
              Add Recipe
            </Link>
          )}
          {!isRecipeManagerPage && isLoggedIn && (
            <Link to="/recipe-manager">
              Recipe Manager
            </Link>
          )}
          {isLoggedIn && adminStatus === "ADMIN" && !isAdminDashboard && (
            <Link to="/admin-dashboard">
              Admin Dashboard
            </Link>
          )}
          {isLoggedIn && !isLoginPage && (
            <div className="logout" onClick={handleLogoutClick}>
              Logout
            </div>
          )}
        </div>
      </div>
      {!isLoggedIn &&
        !isLoginPage &&
        !isSignupPage &&
        !isRecipeManagerPage &&
        !isAdminDashboard &&
        !isAddRecipePage && (
          <Link to="/login">
            <button className="login-btn">Login/Sign up</button>
          </Link>
        )}
      {isLoggedIn &&
        !isLoginPage &&
        !isSignupPage &&
        !isRecipeManagerPage &&
        !isAdminDashboard &&
        !isAddRecipePage && (
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        )}
    </div>
  );
}
