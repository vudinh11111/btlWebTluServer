const User = require("../models/user.model");

const getAllCartItemsHandler = async (req, res) => {
	let user = {};
	const userId = req.userId;

	try {
		user = await User.findById(userId);
		const { cart } = user;
		return res.status(200).json({ cart });
	} catch (error) {
		return res.status(500).json({
			message: "Could not retrieve cart items. Please try again later.",
		});
	}
};

const postItemToCartHandler = async (req, res) => {
	const { product } = req.body;
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		const updatedUserCart = [
			{
				...product,
				qty: 1,
			},
			...user.cart,
		];
		const updatedCartData = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					cart: updatedUserCart,
				},
			},
			{ new: true }
		);
		return res.status(200).json({ cart: updatedCartData.cart });
	} catch (error) {
		return res.status(500).json({
			message: "Could not post item to cart. Please try again later.",
		});
	}
};

const updateItemInCartHandler = async (req, res) => {
	const { action } = req.body;
	const { productId } = req.params;
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		let cart = user.cart;

		if (!cart.find((cartItem) => cartItem._id == productId)) {
			return res.status(400).json({
				message: "Invalid product Id. No such product in cart.",
			});
		}

		if (action.type === "increment") {
			cart.forEach((cartItem) => {
				if (cartItem._id == productId) {
					cartItem.qty += 1;
				}
			});
		} else if (action.type === "decrement") {
			cart.forEach((cartItem) => {
				if (cartItem._id == productId) {
					cartItem.qty -= 1;
				}
			});
		} else {
			return res.status(400).json({ message: "Invalid action type." });
		}

		const updateCartData = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					cart,
				},
			},
			{
				new: true,
			}
		);

		return res.status(200).json({ cart: updateCartData.cart });
	} catch (error) {
		return res.status(500).json({
			message: "Could not update item in cart. Please try again later.",
		});
	}
};

const deleteItemInCartHandler = async (req, res) => {
	const { productId } = req.params;
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		let cart = user.cart;

		if (!cart.find((cartItem) => cartItem._id == productId)) {
			return res.status(400).json({
				message: "Invalid product Id. No such product in cart.",
			});
		}

		cart = cart.filter((cartItem) => cartItem._id != productId);
		const updateCartData = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					cart,
				},
			},
			{ new: true }
		);

		return res.status(200).json({ cart: updateCartData.cart });
	} catch (error) {
		return res.status(500).json({
			message: "Could not delete item in cart. Please try again later.",
		});
	}
};

const clearCartItemsHandler = async (req, res) => {
	const userId = req.userId;

	try {
		const updateCartData = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					cart: [],
				},
			},
			{ new: true }
		);

		return res.status(200).json({ cart: updateCartData.cart });
	} catch (error) {
		return res.status(500).json({
			message: "Could not clear items in cart. Please try again later.",
		});
	}
};

module.exports = {
	getAllCartItemsHandler,
	postItemToCartHandler,
	updateItemInCartHandler,
	deleteItemInCartHandler,
	clearCartItemsHandler,
};
