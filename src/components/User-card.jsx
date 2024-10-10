import React from "react";
import { updateUserRole, deleteUser } from "../helpers/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ email, is_admin, username, _id, onDelete, onUpdate }) => {
  const role = is_admin ? "Admin" : "Not admin";

  const handleDelete = () => {
    deleteUser(_id)
      .then((response) => {
        if (onDelete) {
          onDelete(_id, username);
        }
      })
      .catch((error) => {
        console.error("Error deleting the user.", error);
      });
  };

  const handleRoleChange = () => {
    const updatedRole = !is_admin;

    updateUserRole(_id, updatedRole)
      .then((response) => {
        if (onUpdate) {
          onUpdate(_id, username, updatedRole);
        }
      })
      .catch((error) => {
        console.error("Error updating the user role.", error);
      });
  };

  return (
    <div className="card-wrapper">
      <div className="user-info">
        <div className="info-item">
          <b>Name</b>: {username}
        </div>
        <div className="info-item">
          <b>Email</b>: {email}
        </div>
        <div className="info-item">
          <b>Role</b>: {role}
        </div>
      </div>

      <div className="user-mngmt-btns">
        <button className="change-role-btn" onClick={handleRoleChange}>
          Change role
        </button>
        <button className="delete-user-btn" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
    </div>
  );
};
export default UserCard;
