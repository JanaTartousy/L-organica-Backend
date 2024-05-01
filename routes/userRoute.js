import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  logout,
  register
} from "../controllers/userController.js";
// import { admin, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.put("/:userId", updateUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

// register a new user account
router.post("/register",  register);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

export default router;