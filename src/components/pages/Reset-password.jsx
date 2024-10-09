import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "../../helpers/API";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (data) => {
    try {
      const result = await resetPassword(token, data.password);

      setSuccessMessage(
        "Your password has been updated. Redirecting to the login page..."
      );
    } catch (error) {
      console.error("Failed to reset password", error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <div className="page-wrapper">
      <form
        onSubmit={handleSubmit(handlePasswordReset)}
        className="login flex-wrapper"
      >
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Enter new password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        {successMessage && (
          <div
            className="success-text"
            dangerouslySetInnerHTML={{ __html: successMessage }}
          />
        )}
        <button className="submit-btn" disabled={isSubmitting} type="submit">
          {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
