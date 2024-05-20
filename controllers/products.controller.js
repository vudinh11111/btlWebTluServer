const { Product } = require("../models/product.model");

const getAllProductsHandler = async (req, res) => {
	let products = [];
	try {
		products = await Product.find({});
		return res.status(200).json({ products });
	} catch (error) {
		return res.status(500).json({
			message: "Could not retrieve products. Please try again later.",
		});
	}
};

const getProductHandler = async (req, res) => {
	const { productId } = req.params;
	try {
		const product = await Product.findById(productId);
		return res.status(200).json({ product });
	} catch (error) {
		return res
			.status(404)
			.json({ message: "Could not find product with the specified id" });
	}
};

const postProductHandler = async (req, res) => {
	const { data } = req.body;
	try {
		await Product.insertMany(data);
		const products = await Product.find({});
		res.status(201).json({
			message: "Products added successfully.",
			products,
		});
	} catch (error) {
		res.status(500).json({
			message: "Could not post data to products. Please try again later.",
		});
	}
};

module.exports = {
	getAllProductsHandler,
	getProductHandler,
	postProductHandler,
};
