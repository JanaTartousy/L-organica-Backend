import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
	// user_id: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "User",
	// 	required: true,
	// },
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
	},
	// state: {
	// 	type: String,
	// 	enum: ["pending", "accepted", "rejected"],
	// 	default: "pending",
	// },
	// is_available: {
	// 	type: Boolean,
	// 	default: true,
	// },
	// review: {
	// 	type: String,
	// 	default: "",
	// },
	// sub_category_id: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "SubCategory",
	// },
	// onPage: {
	// 	type: Boolean,
	// 	default: true,
	// },
	category_id: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		virtual: true,
		get: function () {
			return this.category_id;
		},
	},
});
ProductSchema.plugin(mongoosePaginate);

ProductSchema.pre(["find", "findOne", "create", "save"], function () {
	this.populate([ "category_id", "user_id"]);
});
const productModel = model("Product", ProductSchema);
productModel.paginate().then({});
export default model("Product", ProductSchema);
