const router = require("express").Router();
const busRoutes = require("./bus");
const appRoutes = require("./app");
const authRoutes = require('./auth');

// Bus routes
router.use("/bus", busRoutes);
router.use("/app", appRoutes);
router.use("/auth", authRoutes);

module.exports = router;