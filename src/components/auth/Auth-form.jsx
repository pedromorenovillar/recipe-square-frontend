import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function AuthForm({ heading, onSubmit, serverError, formType }) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm();

  const isSignupPage = formType === "signup";
  const isLoginPage = formType === "login";
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError("root", {
        message: error.message || "An error occurred.",
      });
    }
  };

  return (
    <form
      className="login flex-wrapper"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2>{heading}</h2>

      <input
        {...register("username", {
          required: "A username is required.",
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username && (
        <div className="error-text">{errors.username.message}</div>
      )}

      <input
        {...register("email", {
          required: "An email is required.",
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <div className="error-text">{errors.email.message}</div>}

      <input
        {...register("password", {
          required: "A password is required (min. 7 characters).",
          minLength: {
            value: 7,
            message: "The password must be at least 7 characters long.",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <div className="error-text">{errors.password.message}</div>
      )}

      {serverError && <div className="error-text">{serverError}</div>}

      <div className="login-btns">
        <button className="submit-btn" disabled={isSubmitting} type="submit">
          {isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
        </button>
        {isLoginPage && (
          <button
            className="forgot-btn"
            type="button"
            onClick={() => navigate("/request-password-reset")}
          >
            Forgot password
          </button>
        )}
        {errors.root && <div className="error-text">{errors.root.message}</div>}
      </div>
      {isLoginPage && (
        <div className="formRedirectionText">
          Not a member yet? Sign up <Link to="/signup">here</Link>!
        </div>
      )}
      {isSignupPage && (
        <div className="formRedirectionText">
          Already a member? Then log in <Link to="/login">here</Link>!
        </div>
      )}
    </form>
  );
}
