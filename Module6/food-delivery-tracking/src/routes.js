const express=require("express");
const mongoose=require("mongoose");
const {Order}=require("./models");
const {redisClient}=require("./redis");

const router=express.Router();
const CACHE_TTL=Number(process.env.CACHE_TTL)||60;

router.post("/orders",async(req,res,next)=>{
  try{
    const {customerName,customerPhone,restaurantName,items}=req.body;
    if(!customerName||!customerPhone||!restaurantName||!Array.isArray(items)||items.length===0){
      return res.status(400).json({success:false,message:"customerName, customerPhone, restaurantName and items are required"});
    }
    const invalidItem=items.some(item=>
      !item.name ||
      Number(item.quantity)<1 ||
      Number(item.price)<0 ||
      !Number.isFinite(Number(item.quantity)) ||
      !Number.isFinite(Number(item.price))
    );
    if(invalidItem){
      return res.status(400).json({success:false,message:"Each item requires a valid name, quantity and price"});
    }
    const totalAmount=items.reduce((total,item)=>total+Number(item.price)*Number(item.quantity),0);
    const order=await Order.create({customerName,customerPhone,restaurantName,items,totalAmount,status:"PLACED"});
    res.status(201).json({success:true,message:"Order placed successfully",order});
  }catch(error){next(error);}
});

router.get("/orders/:id",async(req,res,next)=>{
  try{
    const orderId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(orderId)){
      return res.status(400).json({success:false,message:"Invalid order ID"});
    }
    const cacheKey=`order:${orderId}`;
    const cachedOrder=await redisClient.get(cacheKey);
    if(cachedOrder){
      console.log(`CACHE HIT -> ${cacheKey}`);
      return res.status(200).json({success:true,source:"redis",order:JSON.parse(cachedOrder)});
    }
    console.log(`CACHE MISS -> ${cacheKey}`);
    const order=await Order.findById(orderId).lean();
    if(!order) return res.status(404).json({success:false,message:"Order not found"});
    await redisClient.setEx(cacheKey,CACHE_TTL,JSON.stringify(order));
    res.status(200).json({success:true,source:"mongodb",order});
  }catch(error){next(error);}
});

router.patch("/orders/:id/status",async(req,res,next)=>{
  try{
    const orderId=req.params.id;
    const {status}=req.body;
    if(!mongoose.Types.ObjectId.isValid(orderId)){
      return res.status(400).json({success:false,message:"Invalid order ID"});
    }
    const allowedStatuses=["PLACED","CONFIRMED","PREPARING","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"];
    if(!allowedStatuses.includes(status)){
      return res.status(400).json({success:false,message:"Invalid order status",allowedStatuses});
    }
    const order=await Order.findByIdAndUpdate(orderId,{status},{new:true,runValidators:true});
    if(!order) return res.status(404).json({success:false,message:"Order not found"});
    const cacheKey=`order:${orderId}`;
    await redisClient.del(cacheKey);
    console.log(`CACHE INVALIDATED -> ${cacheKey}`);
    res.status(200).json({success:true,message:"Order status updated",order});
  }catch(error){next(error);}
});

router.get("/health",async(req,res)=>{
  res.status(200).json({
    success:true,
    environment:process.env.NODE_ENV,
    processId:process.pid,
    mongodb:mongoose.connection.readyState===1?"connected":"disconnected",
    redis:redisClient.isReady?"connected":"disconnected"
  });
});

module.exports=router;