import express from 'express';
import {
	getAllOrders,
	createOrder,
	getOrderById,
	updateOrder,
	deleteOrder,
} from '../controllers/orderController.js';
import { admin } from '../middleware/auth.js';

const router = express.Router();

// GET /orders
router.get('/', admin, getAllOrders);

// POST /orders
router.post('/', createOrder);

// GET /orders/:orderId
router.get('/:orderId', getOrderById);

// PUT /orders/:orderId
router.put('/:orderId', updateOrder);

// DELETE /orders/:orderId
router.delete('/:orderId', deleteOrder);

export default router;
