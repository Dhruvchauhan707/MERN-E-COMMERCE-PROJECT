const ProductModel = require("../models/productModel");
const CategoryModel = require("../models/categoryModel");
const genAI = require("../config/gemini");

// Retry function
const generateKeywords = async (model, imagePart) => {

    for (let i = 0; i < 3; i++) {

        try {

            const result = await model.generateContent([
                "Give 5 keywords describing this product. Return only comma separated keywords.",
                imagePart,
            ]);

            return result.response.text();

        } catch (error) {

            if (error.status !== 503) {
                throw error;
            }

            console.log(`Retry ${i + 1}/3`);

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );

        }

    }

    throw new Error(
        "Gemini service unavailable. Please try again later."
    );

};

const imageSearch = async (req, res) => {

    const USE_GEMINI = false;

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload an image",
            });

        }

        const model =
            genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
            });

        const imagePart = {
            inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: req.file.mimetype,
            },
        };

        // AI Keywords
        let keywords = [];

        if (USE_GEMINI) {

            const keywordText =
                await generateKeywords(
                    model,
                    imagePart
                );

            keywords =
                keywordText
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean);

        } else {

            // Testing keywords
            keywords = [
                "smartwatch",
                "wearable",
                "digital",
                "electronic",
                "gadget",
            ];

        }

        // Products Fetch
        const products =
            await ProductModel.find()
                .populate("category");

        // Match Logic
        const matchedProducts =
            products.filter((product) => {

                const name =
                    product.name?.toLowerCase() || "";

                const description =
                    product.description?.toLowerCase() || "";

                const category =
                    product.category?.name?.toLowerCase() || "";

                return keywords.some((keyword) => {

                    const k =
                        keyword.toLowerCase();

                    return (
                        name.includes(k) ||
                        description.includes(k) ||
                        category.includes(k)
                    );

                });

            });

        console.log(
            "Matched Products:",
            matchedProducts.length
        );

        res.json({

            keywords,

            totalFound:
                matchedProducts.length,

            products:
                matchedProducts,

        });

    } catch (error) {

        console.log(error);

        if (error.status === 429) {

            return res.status(429).json({
                message:
                    "AI quota exceeded. Try again tomorrow.",
            });
        }
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    imageSearch,
};