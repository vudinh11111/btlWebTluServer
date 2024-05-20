const Category = require("../models/category.model");

const getAllCategoriesHandler = async (req, res) => {
	let categories = [];
	try {
		categories = await Category.find({});
		return res.status(200).json({ categories });
	} catch (error) {
		return res.status(500).json({
			message: "Could not retrieve categories. Please try again later.",
		});
	}
};

const getCategoryHandler = async (req, res) => {
	const { categoryId } = req.params;
	try {
		const category = await Category.findById(categoryId);
		return res.status(200).json({ category });
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Could not find category with the specified id" });
	}
};

const postCategoryHandler = async (req, res) => {
	const { data } = req.body;
	try {
		await Category.insertMany(data);
		const categories = await Category.find({});
		res.status(201).json({
			message: "categoris added successfully.",
			categories,
		});
	} catch (error) {
		res.status(500).json({
			message:
				"Could not post data to categories. Please try again later.",
		});
	}
};

module.exports = {
	getAllCategoriesHandler,
	getCategoryHandler,
	postCategoryHandler,
};
