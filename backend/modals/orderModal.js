import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
    item:{
        name:{type:String,required:true},
        price:{type:Number,required:true,min:0},
        imageUrl:{type:String,required:true}
    },
    quantity:{type:Number,required:true,min:1}
},{_id:true})

const orderSchema = new mongoose.Schema({
    // user info
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    email:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true },
    phone:{type:String,required:true},

    address:{type:String,required:true},
    city:{type:String,required:true},
    zipCode:{type:String,required:true},

    // order items
    items:[orderItemSchema],

    // payment method
    paymentMethod:{
        type:String,
        required:true,
        enum:['cod','online','card','upi'],
        index:true
    },
    paymentIntendId:{type:String},
    sessionId:{type:String},
    transactionId:{type:String},
    paymentStatus:{
        type:String,
        enum:['pending','paid','failed'],
        default:'pending',
        index:true
    },

    // order calculation
    subtotal:{type:Number,required:true,min:0},
    tax:{type:Number,required:true,min:0},
    shipping:{type:Number,required:true,min:0},
    total:{type:Number,required:true,min:0},

    // order tracking 
    status:{
        type:String,
        enum:['processing','outForDelivery','delivered'],
        default : 'processing',
        index:true
    },
    expectedDelivery:Date,
    deliveredAt:Date,

    // TIMESTAMPTS
    createdAt:{type:Date,default:Date.now,index:true},
    updatedAt:{type:Date,default:Date.now}
})
orderSchema.index({user:1,createdAt:-1})
orderSchema.index({status:1,paymentStatus:-1})

orderSchema.pre('save',function(next){
    this.updatedAt = new Date()
    next()
})
const Order = mongoose.model('Order',orderSchema)
export default Order