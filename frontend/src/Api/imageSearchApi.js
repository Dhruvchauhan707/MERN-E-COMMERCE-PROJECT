import axios from "./axios";

export const imageSearchApi = {

  searchByImage: async (formData) => {

    const { data } = await axios.post(
      "/api/image-search",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("image search api:",data)
    return data;
  },

};