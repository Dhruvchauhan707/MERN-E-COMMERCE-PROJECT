const express = require("express");
const {getDashboardStats,} = require("../controllers/dashboardController");


const dashboardRouter = express.Router();
// GET DASHBOARD STATS
dashboardRouter.get("/stats", getDashboardStats);

module.exports = dashboardRouter;