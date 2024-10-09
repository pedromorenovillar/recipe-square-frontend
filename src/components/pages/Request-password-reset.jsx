import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { requestPasswordReset } from "../../helpers/API";

export default function RequestPasswordReset({ serverError }) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    watch,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const email = watch("email");

  const handleFormSubmit = async (data) => {
    try {
      const result = await requestPasswordReset(data.email);

      setSuccessMessage("A message has been sent to your email account.");
      setError("root", { message: "" });
    } catch (error) {
      console.error("Error caught during submission:", error);
      setError("root", {
        message: error.response.data.error || "An error occurred",
      });
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <form
        className="login flex-wrapper"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h2>Reset Password</h2>

        <input
          {...register("email", {
            required: "An email is required.",
          })}
          type="email"
          placeholder="Type in your email"
        />
        {errors.email && (
          <div className="error-text">{errors.email.message}</div>
        )}

        <input
          {...register("emailConfirmation", {
            required: "You need to confirm your email.",
            validate: (value) => value === email || "Emails must match.",
          })}
          type="email"
          placeholder="Confirm your email"
        />
        {errors.emailConfirmation && (
          <div className="error-text">{errors.emailConfirmation.message}</div>
        )}

        {serverError && <div className="error-text">{serverError}</div>}
        {successMessage && <div className="success-text">{successMessage}</div>}

        <div className="login-btns">
          <button className="submit-btn" disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Submit"
            )}
          </button>

          {errors.root && (
            <div className="error-text">{errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
