import axios from "axios";
import React from "react";
import { useContext } from "react";
import { BASE_URL_CONTACT, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { FaRegTrashAlt } from "react-icons/fa";

function DeleteItem({ id, refreshContacts, url }) {
  const [auth, setAuth] = useContext(AuthContext);

  const BaseUrl = url + "/" + id;
  const token = auth.jwt;
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this?")) {
      return;
    }

    try {
      const response = await axios.delete(BaseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
    refreshContacts();
  }

  return (
    <button type="button" onClick={handleDelete} className="delete-button">
      <FaRegTrashAlt />
    </button>
  );
}

export default DeleteItem;
