const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({
			message: "Authorization error. Invalid token.",
		});
		return;
	}

	try {
		const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
		if (verifiedUser) {
			req.userId = verifiedUser.userId;
			next();
			return;
		}
	} catch (error) {
		return res.status(401).json({
			message: "Authorization error. User not found.",
		});
	}
};

module.exports = verifyAuth;
