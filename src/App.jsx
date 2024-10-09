import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./components/auth/AuthContext";

import AdminDashboard from "./components/pages/Admin-dashboard";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NoPage from "./components/pages/No-page";
import RecipeManager from "./components/pages/Recipe-manager";
import Icons from "./helpers/Icons";
import Recipe from "./components/pages/Recipe";
import Signup from "./components/pages/Signup";
import RecipeForm from "./components/pages/Recipe-form";
import Results from "./components/pages/Results";
import RequestPasswordReset from "./components/pages/Request-password-reset";
import ResetPassword from "./components/pages/Reset-password";

function App() {
  const { loggedInStatus, adminStatus } = useContext(AuthContext);

  Icons();

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/results/:searchKey" element={<Results />} />

        <Route
          path="/recipe-manager"
          element={
            loggedInStatus === "LOGGED_IN" ? (
              <RecipeManager />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/add-recipe"
          element={
            loggedInStatus === "LOGGED_IN" ? (
              <RecipeForm />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/edit-recipe/:id"
          element={
            loggedInStatus === "LOGGED_IN" ? (
              <RecipeForm />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            loggedInStatus === "LOGGED_IN" && adminStatus === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
  );
}

export default App;
