import React, { useState, useContext } from "react";
import Navbar from "../Navbar";
import CommonAuthForm from "../auth/Auth-form";
import { loginUser } from "../../helpers/API";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleLoginSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await loginUser(userData);
      if (response.data.message === "Login successful") {
        setServerError("");
        handleLogin({
          username: data.username,
          is_admin: response.data.is_admin,
          user_id: response.data.user_id,
        });
        navigate("/recipe-manager");
      } else {
        setServerError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("An unexpected error occurred");
      }
      console.error("There was an error logging in the user...", error);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <CommonAuthForm
        heading="Please enter your user information to log in."
        onSubmit={handleLoginSubmit}
        serverError={serverError}
        formType={"login"}
      />
    </div>
  );
}
