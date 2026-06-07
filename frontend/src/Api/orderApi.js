import axios from "./axios";

export const orderApi = {

  // Create a new order
  createOrder: async (orderData) => {
    const { data } = await axios.post(
      "/api/orders",
      orderData
    );
    return data;
  },

  // Get orders for the logged-in user
  getMyOrders: async () => {
    const { data } = await axios.get("/api/orders/myorders");
    return data;
  },

  // Get all orders (Admin)
  getAllOrders: async () => {
    const { data } = await axios.get(
      "/api/orders/all",
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Update order status (Admin)
  updateOrderStatus: async (id, status) => {
    const { data } = await axios.put(
      `/api/orders/${id}/status`,
      { status },
      {
        withCredentials: true,
      }
    );
  
    return data;
  },

  // Delete an order (Admin)
  deleteOrder: async (id) => {
    const { data } = await axios.delete(
      `/api/orders/${id}`,
      {
        withCredentials: true,
      }
    );
    return data;
  },

};