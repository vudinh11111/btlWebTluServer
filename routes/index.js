const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.router");
const categoriesRoutes = require("./categories.router");
const productsRoutes = require("./products.router");
const usersRoutes = require("./users.router");
const verifyAuth = require("../middlewares/verifyAuth");

router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/users", verifyAuth, usersRoutes);

module.exports = router;
