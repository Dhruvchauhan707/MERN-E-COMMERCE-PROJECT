import { useState } from "react";
import { imageSearchApi } from "../Api/imageSearchApi";

export const useImageSearch = () => {

    const [products, setProducts] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchImage = async (image) => {

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("image", image);

            const data =
                await imageSearchApi.searchByImage(formData);

            console.log("FULL DATA:", data);
            console.log("PRODUCTS:", data.products);

            setProducts(data.products || []);
            setKeywords(data.keywords || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        products,
        keywords,
        loading,
        searchImage,
    };
};