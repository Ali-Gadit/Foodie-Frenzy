import asyncHandler from "express-async-handler";
import {CartItem} from '../modals/cartModal.js'

// get cart
export const getCart = asyncHandler(async (req, res) => {
    const items = await CartItem.find({ user: req.user._id }).populate('item');
    const host = `${req.protocol}://${req.get("host")}`;
    const formatted = items.map((ci)=>{
        const itemObj = ci.item ? ci.item.toObject() : null;
        if(itemObj && itemObj.imageUrl && !itemObj.imageUrl.startsWith('http')) {
            itemObj.imageUrl = host + itemObj.imageUrl;
        }
        return {
            _id:ci._id.toString(),
            item:itemObj,
            quantity:ci.quantity
        }
    })
    res.json(formatted);
});

// add cart function to add items to cart

export const addToCart = asyncHandler(async (req, res) => {
    const {itemId,quantity} = req.body;
    if (!itemId || typeof quantity !== 'number'){
        res.status(400);
        throw new Error('Item id and quantity are required');
    }
    let cartItem = await CartItem.findOne({user:req.user._id,item:itemId})

    if (cartItem){
        cartItem.quantity = Math.max(1,cartItem.quantity + quantity);

        if (cartItem.quantity<1){
            await CartItem.deleteOne({_id: cartItem._id});
            return res.json({_id:cartItem._id.toString(),item:cartItem.item,quantity:0})
        }
        await cartItem.save();
        await cartItem.populate('item');
        const host = `${req.protocol}://${req.get("host")}`;
        const itemObj = cartItem.item.toObject();
        if(itemObj.imageUrl && !itemObj.imageUrl.startsWith('http')) {
            itemObj.imageUrl = host + itemObj.imageUrl;
        }
        return res.status(200).json({
            _id: cartItem.id, // Use virtual getter for string ID
            item: itemObj,
            quantity: cartItem.quantity,
        })
    }
    cartItem = await CartItem.create({
        user:req.user._id,
        item:itemId,
        quantity,
    })
    await cartItem.populate('item');
    const host = `${req.protocol}://${req.get("host")}`;
    const itemObj = cartItem.item.toObject();
    if(itemObj.imageUrl && !itemObj.imageUrl.startsWith('http')) {
        itemObj.imageUrl = host + itemObj.imageUrl;
    }
    res.status(201).json({
            _id: cartItem.id, // Use virtual getter for string ID
            item: itemObj,
            quantity: cartItem.quantity,
    })
});

// lets create a method to update cart and items quantity

export const updateCartItem = asyncHandler(async(req,res) =>{
    const {quantity} = req.body;

    const cartItem = await CartItem.findOne({_id:req.params.id,user:req.user._id})
    if (!cartItem){
        res.status(404);
        throw new Error('Cart item not found')
    }
    cartItem.quantity = Math.max(1,quantity)
    await cartItem.save();
    await cartItem.populate('item');
    const host = `${req.protocol}://${req.get("host")}`;
    const itemObj = cartItem.item.toObject();
    if(itemObj.imageUrl && !itemObj.imageUrl.startsWith('http')) {
        itemObj.imageUrl = host + itemObj.imageUrl;
    }
    res.json({
        _id:cartItem._id.toString(),
        item:itemObj,
        quantity:cartItem.quantity,
    })

})

// Delete function
export const deleteCartItem = asyncHandler(async (req, res) => {
    const cartItem = await CartItem.findOne({
        _id: req.params.id,
        user: req.user._id,        
    })
    if (!cartItem){
        res.status(404);
        throw new Error('Cart item not found')
    }
    await cartItem.deleteOne();
    res.json({_id:req.params.id})
})

// clear cart function to empty cart
export const clearCart = asyncHandler(async (req, res) => {
    await CartItem.deleteMany({user:req.user._id});
    res.json({message:"Cart cleared"})
})