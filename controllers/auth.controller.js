const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const signupHandler = async (req, res) => {
	const { data } = req.body;

	let existingUser;

	try {
		existingUser = await User.findOne({ email: data.email });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Signup failed. Please try again later." });
	}

	if (existingUser) {
		return res.status(409).json({
			message: "User already exists with the same email address.",
		});
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(data.password, 12);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Signup failed. Please try again later." });
	}

	const createdUser = new User({
		...data,
		password: hashedPassword,
		cart: [],
		orders: [],
		address: [],
		wishlist: [],
	});

	try {
		await createdUser.save();
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Signup failed. Please try again later." });
	}

	const token = jwt.sign(
		{
			userId: createdUser._id,
			email: createdUser.email,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "24h" }
	);

	res.status(201).json({
		message: "Signup successful",
		user: {
			token,
			_id: createdUser._id,
			firstName: createdUser.firstName,
			lastName: createdUser.lastName,
			email: createdUser.email,
			cart: createdUser.cart,
			orders: createdUser.orders,
			address: createdUser.address,
			wishlist: createdUser.wishlist,
		},
	});
};

const loginHandler = async (req, res) => {
	const { data } = req.body;

	let existingUser;

	try {
		existingUser = await User.findOne({ email: data.email });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Login failed. Please try again later." });
	}

	if (!existingUser) {
		return res.status(401).json({
			message: "Invalid credentials. Check your username and password.",
		});
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(
			data.password,
			existingUser.password
		);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Login failed. Please try again later." });
	}

	if (!isValidPassword) {
		return res.status(401).json({
			message: "Invalid credentials. Check your username and password.",
		});
	}

	const token = jwt.sign(
		{
			userId: existingUser._id,
			email: existingUser.email,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "24h" }
	);

	res.status(200).json({
		message: "Login successful.",
		user: {
			token,
			_id: existingUser._id,
			firstName: existingUser.firstName,
			lastName: existingUser.lastName,
			email: existingUser.email,
			cart: existingUser.cart,
			orders: existingUser.orders,
			address: existingUser.address,
			wishlist: existingUser.wishlist,
		},
	});
};

module.exports = { signupHandler, loginHandler };
