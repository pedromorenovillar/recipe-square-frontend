import React, { useContext } from "react";
import Navbar from "../Navbar";
import Searchbar from "../search/Searchbar";
import RecipeContainer from "../recipe/Recipe-container";
import { AuthContext } from "../auth/AuthContext";
import logo from "/logo-transparent.png";

export default function Home() {
  const { loggedInStatus, adminStatus, username, user_id } =
    useContext(AuthContext);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="flex-wrapper">
        <div className="home-wrapper">
          <div className="logo-wrapper">
            <img src={logo} alt="recipe square logo"></img>
          </div>
          {/* {loggedInStatus === "LOGGED_IN" ? (
            <div>
              Welcome back, {username}! You are logged in with ID: {user_id}.
            </div>
          ) : (
            <div>You are NOT logged in.</div>
          )} */}

          {/* {adminStatus === "ADMIN" && (
            <div>Admin Access: You have administrative privileges.</div>
          )} */}
          <div className="searchbar-wrapper">
            <Searchbar />
          </div>
          <div className="home-recipes-wrapper">
            <RecipeContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
