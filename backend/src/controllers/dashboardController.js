const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");


//DASHBOARD STATS
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments({
            isBlocked: false,
            isDeleted: false
        });

        const totalProducts = await productModel.countDocuments();
        const totalOrders = await orderModel.countDocuments();
        const orders = await orderModel.find();
        const recentOrders = await orderModel
            .find({})
            .populate("user", "name")
            .sort({ createdAt: -1 })
            .limit(5);
        const lowStockProducts = await productModel
            .find({
                stock: { $lt: 10 }
            })
            .select("name stock image")
            .sort({ stock: 1 })
            .limit(5);

        const monthlySales = await orderModel.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    totalSales: {
                        $sum: "$totalPrice"
                    }
                }
            },
            {
                $sort: {
                    "_id.month": 1
                }
            }
        ]);
        const totalSales = orders.reduce(
            (acc, order) => acc + order.totalPrice,
            0
        );

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalSales,
            monthlySales,
            recentOrders,
            lowStockProducts,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    getDashboardStats,
};