const User = require("../models/user.model");

const getAllWishlistItemsHandler = async (req, res) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		const { wishlist } = user;
		return res.status(200).json({ wishlist });
	} catch (error) {
		return res.status(500).json({
			message:
				"Could not retrieve wishlist items. Please try again later.",
		});
	}
};

const postItemToWishlistHandler = async (req, res) => {
	const userId = req.userId;
	const { product } = req.body;

	try {
		const user = await User.findById(userId);
		let { wishlist } = user;
		if (wishlist.find((item) => item._id == product._id)) {
			return res
				.status(400)
				.json({ message: "Item already exists in wishlist." });
		}
		wishlist = [{ ...product }, ...wishlist];

		const updatedWishlist = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					wishlist,
				},
			},
			{
				new: true,
			}
		);

		return res.status(201).json({ wishlist: updatedWishlist.wishlist });
	} catch (error) {
		return res.status(500).json({
			message: "Could not post item to wishlist. Please try again later.",
		});
	}
};

const deleteItemInWishlistHandler = async (req, res) => {
	const userId = req.userId;
	const { productId } = req.params;

	try {
		const user = await User.findById(userId);
		let { wishlist } = user;

		if (!wishlist.find((item) => item._id == productId)) {
			return res.status(400).json({
				message:
					"Product ID not found. No such item exists in wishlist.",
			});
		}

		wishlist = wishlist.filter((item) => item._id != productId);

		const updatedWishlist = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					wishlist,
				},
			},
			{
				new: true,
			}
		);

		return res.status(201).json({ wishlist: updatedWishlist.wishlist });
	} catch (error) {
		return res.status(500).json({
			message:
				"Could not delete item from wishlist. Please try again later.",
		});
	}
};

module.exports = {
	getAllWishlistItemsHandler,
	postItemToWishlistHandler,
	deleteItemInWishlistHandler,
};
