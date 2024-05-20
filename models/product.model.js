const mongoose = require("mongoose");
const { type } = require("os");

// Định nghĩa OfferSchema
const OfferSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	offer: {
		type: String,
		required: true,
	},
	offerText: {
		type: String,
		required: true,
	},
	isOffer: {
		type: Boolean,
		required: true,
	},
});

// Định nghĩa SpecificationAttributeSchema
const SpecificationAttributeSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
});

// Định nghĩa SpecificationSchema
const SpecificationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	attributes: {
		type: [SpecificationAttributeSchema],
		required: true,
	},
});

// Định nghĩa QuantitySoldSchema
const QuantitySoldSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
});

// Định nghĩa ProductSchema
const ProductSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		bookType: {
			type: String,
			required: true,
		},
		inStock: {
			type: Boolean,
			required: true,
		},
		genres: {
			type: [String],
			required: true,
		},
		coverImg: {
			type: [String],
			required: true,
		},
		offers: {
			type: [OfferSchema],
			required: true,
		},
		originalPrice: {
			type: Number,
			required: true,
		},
		discountPercent: {
			type: Number,
			required: true,
		},
		discountPrice: {
			type: Number,
			required: true,
		},
		totalRatings: {
			type: Number,
			required: true,
		},
		totalStars: {
			type: Number,
			required: true,
		},
		specifications: {
			type: [SpecificationSchema],
			required: true,
		},
		quantity_sold: {
			type: QuantitySoldSchema,
			required: true,
		},
		short_description: {
			type: String,
			require: true
		}
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product, ProductSchema, OfferSchema, SpecificationSchema, SpecificationAttributeSchema, QuantitySoldSchema };
