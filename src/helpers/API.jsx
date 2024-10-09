import axios from "axios";

const baseURL = "https://recipe-square-backend-f76d80c4c9fc.herokuapp.com/api";

const api = axios.create({ baseURL });

// API endpoint 1: registering a user in the DB
export const registerUser = (userData) => {
  return api.post(`/register_user`, userData);
};

// API endpoint 2: logging in a user in the DB
export const loginUser = (userData) => {
  return api.post(`/login_user`, userData, { withCredentials: true });
};

// API endpoint 3: logging a user out
export const logout = () => {
  return api.post(`/logout`, {}, { withCredentials: true });
};

// API endpoint 4: getting all users from the DB
export const getAllUsers = () => {
  return api.get(`/get_all_users`);
};

// API endpoint 5: updating user admin role in the DB
export const updateUserRole = (_id, is_admin) => {
  return api.put(`/update_user_role/${_id}`, { is_admin });
};

// API endpoint 6: deleting a user in the DB
export const deleteUser = (_id) => {
  return api.delete(`/delete_user`, { data: { _id } });
};

// API endpoint 7: adding a recipe in the DB
export const addRecipe = (recipeData) => {
  return api.post(`/add_recipe`, recipeData);
};

// API endpoint 8: getting all recipes from the DB
export const getAllRecipes = () => {
  return api.get(`/get_all_recipes`);
};

// API endpoint 9: getting all recipes from a user from the DB
export const getAllRecipesFromUser = (user_id) => {
  return api.get(`/get_all_recipes_from_user`, { params: { user_id } });
};

// API endpoint 10: deleting a recipe from the DB
export const deleteRecipe = (_id) => {
  return api.delete(`/delete_recipe`, { data: { _id } });
};

// API endpoint 11: getting one recipe from the DB by its ID
export const getRecipeById = (id) => {
  return api.get(`/recipe/${id}`);
};

// API endpoint 12: updating a recipe
export const updateRecipe = (id, recipeData) => {
  return api.put(`/update_recipe/${id}`, recipeData);
};

// API endpoint 13: searching a recipe in the DB
export const searchRecipes = (searchKey) => {
  return api.get(`/search_recipes/${searchKey}`);
};

// API endpoint 14: searching 3 recipes with images in the DB
export const getThreeRandomRecipes = () => {
  return api.get(`/get_three_random_recipes`);
};

// API endpoint 15: requesting password reset
export const requestPasswordReset = (email) => {
  return api.post(`/request_password_reset`, { email });
};

// API endpoint 16: resetting the password
export const resetPassword = (token, password) => {
  return api.post(`/reset_password/${token}`, { password });
};

export default api;
