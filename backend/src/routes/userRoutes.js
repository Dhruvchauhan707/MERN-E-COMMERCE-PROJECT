const express = require("express");
const userRouter = express.Router();

const {getAllUsers,getUserById,changeUserRole,blockUser,unblockUser,deleteUser,getBlockedUsers,getDeletedUsers} = require("../controllers/userController");

// GET ALL USERS
userRouter.get("/", getAllUsers);
// GET BLOCKED USERS
userRouter.get("/blocked", getBlockedUsers);
// GET DELETED USERS
userRouter.get("/deleted", getDeletedUsers);
// GET USER BY ID
userRouter.get("/:id", getUserById);
// BLOCK USER
userRouter.put("/:id/block", blockUser);
// UNBLOCK USER
userRouter.put("/:id/unblock", unblockUser);
// CHANGE USER ROLE
userRouter.put("/:id/role", changeUserRole);
// DELETE USER
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;