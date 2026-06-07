import axios from "./axios";

export const addressApi = {
  // Get all addresses for the logged-in user 
  getAddresses: async () => {
    const { data } = await axios.get("/api/address");
    return data;
  },
  // Get a specific address by ID
  createAddress: async (addressData) => {
    const { data } = await axios.post(
      "/api/address",
      addressData
    );
    return data;
  },
  // Update an existing address by ID
  updateAddress: async (id, addressData) => {
    const { data } = await axios.put(
      `/api/address/${id}`,
      addressData
    );
    return data;
  },
  // Delete an address by ID
  deleteAddress: async (id) => {
    const { data } = await axios.delete(
      `/api/address/${id}`
    );
    return data;
  },
};