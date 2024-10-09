import React, { useState, useContext, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { addRecipe, updateRecipe, getRecipeById } from "../../helpers/API";
import { AuthContext } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export default function RecipeForm() {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [serverError, setServerError] = useState("");
  const { user_id } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      instructions: EditorState.createEmpty(),
      ingredients: [{ ingredient: "" }],
      image: "",
    },
  });

  const { register, formState, handleSubmit, control, setValue } = form;
  const { errors, isSubmitting } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((response) => {
          setRecipe(response.data);

          const { title, instructions, ingredients, image } = response.data;
          setValue("title", title);
          setValue(
            "instructions",
            EditorState.createWithContent(convertFromRaw(instructions))
          );
          setValue("image", image);

          fields.forEach(() => remove(0));

          ingredients.forEach((ingredient) =>
            append({ ingredient: ingredient.ingredient })
          );
          setImagePreview(image);
          setEditing(true);
        })
        .catch((error) => {
          console.error("Error fetching the recipe data:", error);
        });
    }
  }, [id, append, remove, setValue]);

  const handleFormSubmit = async (data) => {
    const contentState = data.instructions.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const created_at = new Date();
    const recipeData = {
      ...data,
      instructions: rawContent,
      user_id,
      created_at,
    };

    try {
      if (editing) {
        await updateRecipe(id, recipeData);
        navigate({
          pathname: "/recipe-manager",
          state: { editMessage: "Recipe updated successfully." },
        });
      } else {
        await addRecipe(recipeData);
        navigate({
          pathname: "/recipe-manager",
          state: { editMessage: "Recipe added successfully!" },
        });
      }
      setServerError("");
    } catch (error) {
      setServerError(
        error.response && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred"
      );
      console.error("There was an error saving the recipe!", error);
    }
  };

  return (
    <div className="recipe-form-wrapper">
      <Navbar />
      <form
        className="login flex-wrapper"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="recipe-title form-control">
          <input
            {...register("title", { required: "A title is required." })}
            type="text"
            placeholder="Recipe title"
          />
          {errors.title && (
            <div className="error-text">{errors.title.message}</div>
          )}
        </div>

        <div className="recipe-contents">
          <div className="left-side">
            <div className="instructions form-control">
              <Controller
                name="instructions"
                control={control}
                defaultValue={EditorState.createEmpty()}
                rules={{
                  validate: (value) => {
                    const contentState = value.getCurrentContent();
                    const isEmpty = !contentState.hasText();
                    return isEmpty ? "Instructions cannot be empty." : true;
                  },
                }}
                render={({ field }) => (
                  <div className="editor-wrapper">
                    <Editor
                      placeholder="Instructions go here..."
                      editorState={field.value}
                      onEditorStateChange={field.onChange}
                      wrapperClassName="editor-wrapper"
                      editorClassName="editor-content"
                      toolbarClassName="editor-toolbar"
                      toolbar={{
                        options: [
                          "inline",
                          "blockType",
                          "fontSize",
                          "fontFamily",
                          "list",
                          "emoji",
                          "history",
                        ],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                      }}
                    />
                    {errors.instructions && (
                      <div className="error-text">
                        {errors.instructions.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="right-side">
            <div className="save-recipe-btn">
              <button
                className="submit-btn"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : editing ? (
                  "Save changes"
                ) : (
                  "Save recipe"
                )}
              </button>
            </div>
            <div className="ingredients">
              <div>
                {fields.map((field, index) => (
                  <div className="form-control" key={field.id}>
                    <input
                      placeholder="Ingredient"
                      type="text"
                      {...register(`ingredients.${index}.ingredient`, {
                        required: "Ingredients cannot be empty.",
                      })}
                    />
                    {errors.ingredients &&
                      errors.ingredients[index] &&
                      errors.ingredients[index].ingredient && (
                        <div className="error-text">
                          {errors.ingredients[index].ingredient.message}
                        </div>
                      )}
                  </div>
                ))}
                <div className="plus-minus-btns">
                  <button
                    className="ingredient-plus"
                    type="button"
                    onClick={() => append({ ingredient: "" })}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  {fields.length > 1 && (
                    <button
                      className="ingredient-minus"
                      type="button"
                      onClick={() => remove(fields.length - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="image-upload">
              <label className="image-label">Image (2MB max)</label>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const maxSize = 2 * 1024 * 1024;
                      if (file) {
                        if (file.size > maxSize) {
                          alert(
                            "File size exceeds 2MB. Please upload a smaller image."
                          );
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64String = reader.result
                            .replace("data:", "")
                            .replace(/^.+,/, "");
                          setImagePreview(URL.createObjectURL(file));
                          field.onChange(base64String);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                )}
              />

              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setValue("image", "");
                      setImageFile("");
                    }}
                    className="delete-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {serverError && <div className="error-text">{serverError}</div>}
      </form>
    </div>
  );
}
