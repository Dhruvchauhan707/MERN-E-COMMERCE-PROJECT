// src/Hooks/useUsers.js

import { useState, useEffect } from "react";
import { userApi } from "../api/userApi";

export const useUsers = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {

      const data =
        await userApi.getAllUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }
  };

  const changeRole = async (userId,role) => {
    try {
      await userApi.updateUserRole(
        userId,
        role
      );
      await fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await userApi.deleteUser(
        userId
      );

      await fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  const toggleBlock = async (userId,isBlocked) => {
    try {

      if (isBlocked) {

        await userApi.unblockUser(
          userId
        );

      } else {

        await userApi.blockUser(
          userId
        );

      }

      await fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetchUsers,
    changeRole,
    deleteUser,
    toggleBlock,
  };
};