import express from "express";
import {confirmPayment, createOrder, getAllOrders, getOrderById, getOrders,updateAnyOrder,updateOrder} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.get('/getall',getAllOrders)
orderRouter.put('/getall/:id',updateAnyOrder)

// project rest of routes using middleware
orderRouter.use(authMiddleware)

orderRouter.post('/',createOrder);
orderRouter.get('/',getOrders);
orderRouter.get('/',confirmPayment);
orderRouter.get('/',getOrderById);

export default orderRouter