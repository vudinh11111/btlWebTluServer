const express = require("express");
const router = express.Router();
const {
	getAllProductsHandler,
	postProductHandler,
	getProductHandler,
} = require("../controllers/products.controller");

router.route("/").get(getAllProductsHandler).post(postProductHandler);

router.get("/:productId", getProductHandler);

module.exports = router;
