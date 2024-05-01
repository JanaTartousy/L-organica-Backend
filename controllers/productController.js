import ProductModel from "../models/productModel.js";

class product_controllers {
	// add product
	async addProduct(req, res) {
		try {
			let doc = new ProductModel(req.body);
			if (req.file) {
				doc.image = req.file.path;
			}
			let product = await ProductModel.create(doc);
			res.status(200).json({
				message: "Product added successfully",
				product,
			});
		} catch (error) {
			console.log(error.message);
			res.status(500).json({
				message: error.message,
			});
		}
	}
	// edit product
	editProduct(req, res) {
		try {
			const product = req.params.id;
			const payload = req.body;
			ProductModel.findByIdAndUpdate(product, payload).then((product) => {
				console.log(product);
				if (product) {
					res.status(200).json({
						message: "Product updated successfully",
						product,
					});
				} else {
					res.status(404).json({
						message: "Product not found",
					});
				}
			});
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	}
	// get all products
	async getAllProducts(req, res) {
		try {
			const { page, limit } = req.query;
			const options = {
				page: parseInt(page, 10) || 1,
				limit: parseInt(limit, 10) || 10,
			};
			const products = await ProductModel.paginate({}, options);
			res.status(200).json(products);
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
	// get all products
	async getProductByCategory(req, res) {
		try {
			const { page, limit } = req.query;
			const { categoryId } = req.params;
			const options = {
				page: parseInt(page, 10) || 1,
				limit: parseInt(limit, 10) || 10,
			};
			const products = await ProductModel.paginate(
				{ category_id: categoryId },
				options
			);
			res.status(200).json(products);
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
	// get user products
	async getUserProducts(req, res) {
		try {
			let user_id = req.body.user_id;
			const { page, limit } = req.query;
			const options = {
				page: parseInt(page, 10) || 1,
				limit: parseInt(limit, 3) || 3,
			};
			const products = await ProductModel.paginate({ user_id }, options);
			res.status(200).json(products);
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
	// get single product
	getSingleProduct(req, res) {
		try {
			const product = req.params.id;
			ProductModel.findById(product).then((product) => {
				console.log(product);
				if (product) {
					res.status(200).json({
						message: "Product fetched successfully",
						product,
					});
				} else {
					res.status(404).json({
						message: "Product not found",
					});
				}
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
	// delete product
	deleteProduct(req, res) {
		try {
			const product = req.params.id;
			ProductModel.findByIdAndDelete(product).then((product) => {
				console.log(product);
				if (product) {
					res.status(200).json({
						message: "Product deleted successfully",
						product,
					});
				} else {
					res.status(404).json({
						message: "Product not found",
					});
				}
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
}

export default new product_controllers();
