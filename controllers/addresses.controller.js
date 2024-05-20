const User = require("../models/user.model");

const getAllAddressesHandler = async (req, res) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		return res.status(200).json({ address: user.address });
	} catch (error) {
		return res.status(500).json({
			message: "Could not fetch user address. Please try again later.",
		});
	}
};

const postItemToAddressHandler = async (req, res) => {
	const userId = req.userId;
	const { address } = req.body;

	try {
		const user = await User.findById(userId);
		const userAddress = [
			{
				...address,
			},
			...user.address,
		];

		const updatedUserAddress = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					address: userAddress,
				},
			},
			{ new: true }
		);
		return res.status(201).json({ address: updatedUserAddress.address });
	} catch (error) {
		return res.status(500).catch({
			message: "Could not post item to address. Please try again later.",
		});
	}
};

const deleteItemInAddressHandler = async (req, res) => {
	const userId = req.userId;
	const { addressId } = req.params;
	try {
		const user = await User.findById(userId);
		const userAddress = user.address.filter(
			(item) => item._id != addressId
		);
		const updatedUserAddress = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					address: userAddress,
				},
			},
			{ new: true }
		);
		return res.status(200).json({ address: updatedUserAddress.address });
	} catch (error) {
		return res.status(500).catch({
			message:
				"Could not delete item from address. Please try again later.",
		});
	}
};

const updateItemInAddressHandler = async (req, res) => {
	const userId = req.userId;
	const { addressId } = req.params;
	const { address } = req.body;
	try {
		const user = await User.findById(userId);
		const userAddress = user.address.map((item) =>
			item._id == addressId ? address : item
		);
		const updatedUserAddress = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					address: userAddress,
				},
			},
			{ new: true }
		);
		return res.status(200).json({ address: updatedUserAddress.address });
	} catch (error) {
		return res.status(500).catch({
			message: "Could not update given address. Please try again later.",
		});
	}
};

module.exports = {
	getAllAddressesHandler,
	postItemToAddressHandler,
	deleteItemInAddressHandler,
	updateItemInAddressHandler,
};
