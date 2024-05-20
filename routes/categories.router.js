const express = require("express");
const router = express.Router();
const {
	getAllCategoriesHandler,
	getCategoryHandler,
	postCategoryHandler,
} = require("../controllers/categories.controller");

router
	.route("/")
	.get(getAllCategoriesHandler)
	.post(postCategoryHandler);

router.get("/:categoryId", getCategoryHandler);

module.exports = router;
