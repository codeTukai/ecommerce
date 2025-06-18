import mongoose from "mongoose";

const orderSchema =  mongoose.Schema({

    userId :{
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },
    orderId  :{
        type: String,
        required : [true, "Provide orderId"],
        unique: true
    },
    productId :{
        type: mongoose.Schema.ObjectId,
        ref : "product"
    },
    product_details :{
        name : String,
        Image : Array,
    },
    productId :{
        type: mongoose.Schema.ObjectId,
        ref : "product"
    },
    payment_status :{
        type: String,
        default : ""
    },
    delivery_address :{
        type: mongoose.Schema.ObjectId,
        default : 'address'
    },
    subTotalAnt :{
        type: Number,
        default : 0
    },
    totalAmt :{
        type: String,
        default : 0
    }
  
},

{
    timestamps : true
}

)

const orderModel = mongoose.model("order", orderSchema);

export default orderModel
