import axios from "./axios";

export const productApi = {

  // Get all products
  getAllProducts: () => axios.get("/api/products/all"),

  // Get a product category by ID
  getProductsByCategory: (categoryId) =>
    axios.get(`/api/products/category/${categoryId}`),

  // Get a filtered products by category, search and price
  getFilteredProducts: async (category, search, price) => {
    const { data } = await axios.get(
      `/api/products/filter?category=${category}&search=${search}&price=${price}`
    );
    return data;
  },

  // Get latest products
  getLatestProducts: async () => {

    const { data } = await axios.get(
      "/api/products/latest"
    );
    return data;
  },

  //create a new product (Admin)
  createProduct: (productData) =>
    axios.post(
      "/api/products/add",
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }


    ),

  // Update an existing product by ID (Admin)  
  updateProduct: (id, productData) =>
    axios.put(
      `/api/products/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    ),

  // Delete a product by ID (Admin)  
  deleteProduct: (id) =>
    axios.delete(
      `/api/products/${id}`,
      {
        withCredentials: true,
      }
    ),
  //get product by id
  getProductById: async (id) => {
    const { data } =
      await axios.get(
        `/api/products/${id}`
      );

    return data;
  },
};