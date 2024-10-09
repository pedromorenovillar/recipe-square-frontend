import React, { useState } from "react";
import Navbar from "../Navbar";
import AuthForm from "../auth/Auth-form";
import { registerUser } from "../../helpers/API";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleSignupSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
      is_admin: false,
    };
    try {
      const response = await registerUser(userData);

      setServerError("");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("An unexpected error occurred");
      }
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <AuthForm
        heading="Fill in this form to join Recipe Square."
        onSubmit={handleSignupSubmit}
        serverError={serverError}
        formType={"signup"}
      />
    </div>
  );
}
