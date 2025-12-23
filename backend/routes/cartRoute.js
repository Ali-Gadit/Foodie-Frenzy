import express from "express";
import { addToCart, clearCart,deleteCartItem,getCart,updateCartItem } from "../controllers/cartController.js";
import  authMiddleware  from "../middleware/auth.js";

const cartRouter= express.Router();

cartRouter.route('/')
    .get(authMiddleware,getCart)
    .post(authMiddleware,addToCart)
cartRouter.post('/clear',authMiddleware,clearCart)

cartRouter.route('/:id')
    .put(authMiddleware,updateCartItem)
    .delete(authMiddleware,deleteCartItem)

export default cartRouter