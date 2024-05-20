const express = require("express");
const router = express.Router();

const {
	getAllCartItemsHandler,
	postItemToCartHandler,
	updateItemInCartHandler,
	deleteItemInCartHandler,
	clearCartItemsHandler,
} = require("../controllers/cart.controller");
const {
	getAllWishlistItemsHandler,
	postItemToWishlistHandler,
	deleteItemInWishlistHandler,
} = require("../controllers/wishlist.controller");

const {
	getAllAddressesHandler,
	postItemToAddressHandler,
	deleteItemInAddressHandler,
	updateItemInAddressHandler,
} = require("../controllers/addresses.controller");

const {
	getAllOrdersHandler,
	postItemToOrdersHandler,
} = require("../controllers/orders.controller");

router.route("/cart").get(getAllCartItemsHandler).post(postItemToCartHandler);
router
	.route("/cart/:productId")
	.post(updateItemInCartHandler)
	.delete(deleteItemInCartHandler);
router.route("/cart/clear").get(clearCartItemsHandler);

router
	.route("/wishlist")
	.get(getAllWishlistItemsHandler)
	.post(postItemToWishlistHandler);
router.delete("/wishlist/:productId", deleteItemInWishlistHandler);

router
	.route("/addresses")
	.get(getAllAddressesHandler)
	.post(postItemToAddressHandler);
router
	.route("/addresses/:addressId")
	.post(updateItemInAddressHandler)
	.delete(deleteItemInAddressHandler);

router.route("/orders").get(getAllOrdersHandler).post(postItemToOrdersHandler);

module.exports = router;
