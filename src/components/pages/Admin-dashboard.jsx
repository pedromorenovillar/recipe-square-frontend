import React, { Component } from "react";
import Navbar from "../Navbar";
import UserCard from "../User-card";
import RecipeItem from "../recipe/Recipe-item";
import { getAllUsers, getAllRecipes } from "../../helpers/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      loadingRecipes: true,
      loadingUsers: true,
      recipeDeleteMessage: "",
      userDeleteMessage: "",
      userUpdateMessage: "",
      username: "",
      users: [],
      recipes: [],
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  toggleVisibility(section) {
    this.setState((prevState) => ({
      activeSection: prevState.activeSection === section ? null : section,
    }));
  }

  componentDidMount() {
    getAllRecipes()
      .then((response) => {
        this.setState({
          recipes: response.data.recipes,
          loadingRecipes: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        this.setState({ loadingRecipes: false });
      });

    getAllUsers()
      .then((response) => {
        this.setState({ users: response.data.users, loadingUsers: false });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState({ loadingUsers: false });
      });
  }

  handleRecipeDelete(id, title) {
    this.setState((prevState) => ({
      recipes: prevState.recipes.filter((recipe) => recipe._id !== id),
      recipeDeleteMessage: `The recipe ${title} has been deleted!`,
    }));
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.setState({ recipeDeleteMessage: "" });
    }, 3000);
  }

  handleUserDelete(id, username) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user._id !== id),
      userDeleteMessage: `The user ${username} has been deleted!`,
    }));
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.setState({ userDeleteMessage: "" });
    }, 3000);
  }

  handleUserUpdate(id, updatedRole, username) {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user._id === id ? { ...user, is_admin: updatedRole } : user
      ),
      userUpdateMessage: `${username}'s role has been changed to ${
        updatedRole ? "admin" : "not admin"
      }.`,
    }));
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.setState({ userUpdateMessage: "" });
    }, 3000);
  }

  render() {
    const { activeSection, loadingRecipes, loadingUsers, users, recipes } =
      this.state;

    return (
      <div className="page-wrapper">
        <div className="dashboard-title-wrapper">
          <Navbar />
          <div className="management-header">
            <h2>Select a category to manage</h2>
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="management-btns">
            <button
              className="recipe-mngmt-btn"
              onClick={() => this.toggleVisibility("recipe")}
            >
              Recipes
            </button>
            <button
              className="user-mngmt-btn"
              onClick={() => this.toggleVisibility("user")}
            >
              Users
            </button>
          </div>

          {activeSection === "recipe" && (
            <div className="recipe-management">
              <h2>Recipe Management</h2>
              <div>{this.state.recipeDeleteMessage}</div>
              {loadingRecipes ? (
                <div className="spinner-wrapper">
                  <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
              ) : recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeItem
                    key={recipe._id}
                    title={recipe.title}
                    image={recipe.image}
                    _id={recipe._id}
                    onDelete={() =>
                      this.handleRecipeDelete(recipe._id, recipe.title)
                    }
                  />
                ))
              ) : (
                <h1>No recipes found.</h1>
              )}
            </div>
          )}

          {activeSection === "user" && (
            <div className="user-management">
              <h2>User Management</h2>
              <div>{this.state.userDeleteMessage}</div>
              <div>{this.state.userUpdateMessage}</div>
              {loadingUsers ? (
                <div className="spinner-wrapper">
                  <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <UserCard
                    key={user._id}
                    email={user.email}
                    is_admin={user.is_admin}
                    _id={user._id}
                    username={user.username}
                    onDelete={() =>
                      this.handleUserDelete(user._id, user.username)
                    }
                    onUpdate={(_id, username, updatedRole) =>
                      this.handleUserUpdate(_id, updatedRole, username)
                    }
                  />
                ))
              ) : (
                <h1>No users found.</h1>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
