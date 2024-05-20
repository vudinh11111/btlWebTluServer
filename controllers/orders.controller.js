const User = require("../models/user.model");

const getAllOrdersHandler = async (req, res) => {
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ orders: user.orders });
	} catch (error) {
		return res.status(500).json({
			message: "Could not fetch user orders. Please try again later.",
			error: error.message,
		});
	}
};

const postItemToOrdersHandler = async (req, res) => {
	const userId = req.userId;
	const { order } = req.body;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.orders.unshift(order); // Push new order to the front of the array

		await user.save();
		return res.status(201).json({ orders: user.orders });
	} catch (error) {
		return res.status(500).json({
			message: "Could not post item to orders. Please try again later.",
			error: error.message,
		});
	}
};

module.exports = {
	getAllOrdersHandler,
	postItemToOrdersHandler,
};
