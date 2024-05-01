import express from "express";
import {
  getAllCategory,
  addCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategory,
} from "../controllers/categoryController.js";
import { admin } from "../middleware/auth.js";

const router = express.Router();
// get category
router.get("/", getAllCategory);

// add category
router.post("/", admin, addCategory);

// get category by id
router.get("/:categoryId", getCategoryById);

// update category by id
router.put("/:categoryId", admin, updateCategoryById);

//delete category
router.delete("/:categoryId", admin, deleteCategory);

export default router;
