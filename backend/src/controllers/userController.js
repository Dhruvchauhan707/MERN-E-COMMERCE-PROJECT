const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
    try {

        const users = await userModel.find({})
            .select("-password");

        return res.status(200).json(users);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message,
        });

    }
};

const getUserById = async (req, res) => {
    try {

        const user = await userModel.findById(
            req.params.id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const changeUserRole = async (req, res) => {
    try {

         console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
        const user = await userModel.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.role = req.body.role;

        await user.save();

        res.status(200).json({
            message: "Role updated",
            user,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const blockUser = async (req, res) => {
    try {

        const user = await userModel.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.isBlocked = true;

        await user.save();

        res.status(200).json({
            message: "User blocked",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const unblockUser = async (req, res) => {
    try {

        const user = await userModel.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.isBlocked = false;

        await user.save();

        res.status(200).json({
            message: "User unblocked",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await userModel.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.isDeleted = true;

        await user.save();

        res.status(200).json({
            message: "User moved to deleted users",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getDeletedUsers = async (req, res) => {
    try {

        const users = await userModel
            .find({ isDeleted: true })
            .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getBlockedUsers = async (req, res) => {
    try {

        const users = await userModel
            .find({
                isBlocked: true,
                isDeleted: false,
            })
            .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    getAllUsers,
    getUserById,
    changeUserRole,
    blockUser,
    unblockUser,
    deleteUser,
    getDeletedUsers,
    getBlockedUsers
};