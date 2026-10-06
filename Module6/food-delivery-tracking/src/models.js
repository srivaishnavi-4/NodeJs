const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
  customerName:{type:String,required:true,trim:true},
  customerPhone:{type:String,required:true,trim:true},
  restaurantName:{type:String,required:true,trim:true},
  items:[{
    name:{type:String,required:true},
    quantity:{type:Number,required:true,min:1},
    price:{type:Number,required:true,min:0}
  }],
  totalAmount:{type:Number,required:true,min:0},
  status:{
    type:String,
    enum:["PLACED","CONFIRMED","PREPARING","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"],
    default:"PLACED"
  }
},{timestamps:true});

const Order=mongoose.model("Order",orderSchema);
module.exports={Order};