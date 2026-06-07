import axios from "./axios";

export const cartApi = {

  addToCart: async (productId) => {
    const { data } = await axios.post(
      "/api/cart/",
      {
        productId,
      }
    );
    return data;
  },

  // Get all cart items for the logged-in user
  getCartItems: async () => {
    const { data } = await axios.get("/api/cart");
    return data;
  },

  // update cart quantity
  updateQuantity: async (cartItemId, quantity) => {
    const { data } = await axios.put(
      `/api/cart/update/${cartItemId}`,
      { quantity }
    );
    return data;
  },

  // Remove an item from the cart
  removeItem: async (itemId) => {
     await axios.delete(
      `/api/cart/remove/${itemId}`
    );
  },
};