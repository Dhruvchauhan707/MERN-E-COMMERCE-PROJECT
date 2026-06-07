// src/api/userApi.js

import axios from "./axios";

export const userApi = {

  // Get all users (Admin)
  getAllUsers: async () => {
    const { data } = await axios.get(
      "/api/users/",
      {
        withCredentials: true,
      }
    );

    return data;
  },

  // Change role
  updateUserRole: async (userId, role) => {
    const { data } = await axios.put(
      `/api/users/${userId}/role`,
      { role },
      {
        withCredentials: true,
      }
    );

    return data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const { data } = await axios.delete(
      `/api/users/${userId}`,
      {
        withCredentials: true,
      }
    );

    return data;
  },

  // Block user
  blockUser: async (userId) => {
    const { data } = await axios.put(
      `/api/users/${userId}/block`,
      {},
      {
        withCredentials: true,
      }
    );

    return data;
  },

  // Unblock user
  unblockUser: async (userId) => {
    const { data } = await axios.put(
      `/api/users/${userId}/unblock`,
      {},
      {
        withCredentials: true,
      }
    );

    return data;
  },

};