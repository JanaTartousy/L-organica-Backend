import express from "express";
import {
  getAllProduct,
  addProduct,
  getProductById,
  updateProductById,
  deleteProduct,
} from "../controllers/productController.js";
import { admin } from "../middleware/auth.js";

const router = express.Router();
// get product
router.get("/", getAllProduct);

// add product
router.post("/", admin, addProduct);

// get product by id
router.get("/:productId", getProductById);

// update product by id
router.put("/:productId", admin, updateProductById);

//delete product
router.delete("/:productId", admin, deleteProduct);

export default router;
