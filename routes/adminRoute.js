import express from "express";
import {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  login,
  logout,
  register,
} from "../controllers/adminController.js";
import uploadImage from "../middleware/imagesUpload.js"
import { verifyUser, admin } from "../middleware/auth.js";
const router = express.Router();

// GET /admins
router.get("/", verifyUser, admin, getAllAdmins);

// GET /admins/:adminId
router.get("/:adminId", admin, getAdminById);

// PUT /admins/:adminId
router.put("/:adminId", admin, updateAdmin);

// DELETE /admins/:adminId
router.delete("/:adminId", admin, deleteAdmin);

// register a new admin account
router.post("/register", uploadImage("image"), register);

// login
router.post("/login", login);

// logout
router.post("/logout", admin, logout);

export default router;