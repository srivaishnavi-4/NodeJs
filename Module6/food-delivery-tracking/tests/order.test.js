require("dotenv").config();

const test=require("node:test");
const assert=require("node:assert");
const request=require("supertest");
const mongoose=require("mongoose");
const app=require("../src/app");

const {connectDatabase,disconnectDatabase}=require("../src/db");
const {connectRedis,disconnectRedis}=require("../src/redis");
const {Order}=require("../src/models");

let orderId;

test.before(async()=>{
  await connectDatabase();
  await connectRedis();
  await Order.deleteMany({});
});

test.after(async()=>{
  await Order.deleteMany({});
  await disconnectRedis();
  await disconnectDatabase();
});

test("GET /api/health should return healthy response",async()=>{
  const response=await request(app).get("/api/health");
  assert.strictEqual(response.status,200);
  assert.strictEqual(response.body.success,true);
  assert.strictEqual(response.body.mongodb,"connected");
  assert.strictEqual(response.body.redis,"connected");
});

test("POST /api/orders should create an order",async()=>{
  const response=await request(app).post("/api/orders").send({
    customerName:"Vaishu",
    customerPhone:"9876543210",
    restaurantName:"Pizza House",
    items:[
      {name:"Chicken Pizza",quantity:2,price:350},
      {name:"Coke",quantity:2,price:60}
    ]
  });
  assert.strictEqual(response.status,201);
  assert.strictEqual(response.body.success,true);
  assert.strictEqual(response.body.order.totalAmount,820);
  assert.strictEqual(response.body.order.status,"PLACED");
  orderId=response.body.order._id;
});

test("GET /api/orders/:id should get order from MongoDB",async()=>{
  const response=await request(app).get(`/api/orders/${orderId}`);
  assert.strictEqual(response.status,200);
  assert.strictEqual(response.body.source,"mongodb");
  assert.strictEqual(response.body.order._id,orderId);
});

test("GET /api/orders/:id should return cached order from Redis",async()=>{
  const response=await request(app).get(`/api/orders/${orderId}`);
  assert.strictEqual(response.status,200);
  assert.strictEqual(response.body.source,"redis");
  assert.strictEqual(response.body.order._id,orderId);
});

test("PATCH /api/orders/:id/status should update order status",async()=>{
  const response=await request(app).patch(`/api/orders/${orderId}/status`).send({status:"PREPARING"});
  assert.strictEqual(response.status,200);
  assert.strictEqual(response.body.success,true);
  assert.strictEqual(response.body.order.status,"PREPARING");
});

test("Updated order should come from MongoDB after cache invalidation",async()=>{
  const response=await request(app).get(`/api/orders/${orderId}`);
  assert.strictEqual(response.status,200);
  assert.strictEqual(response.body.source,"mongodb");
  assert.strictEqual(response.body.order.status,"PREPARING");
});

test("Updated order should be cached again",async()=>{
  const response=await request(app).get(`/api/orders/${orderId}`);
  assert.strictEqual(response.status,200);
  assert.strictEqual(response.body.source,"redis");
  assert.strictEqual(response.body.order.status,"PREPARING");
});

test("Invalid order status should return 400",async()=>{
  const response=await request(app).patch(`/api/orders/${orderId}/status`).send({status:"COOKING"});
  assert.strictEqual(response.status,400);
  assert.strictEqual(response.body.success,false);
});

test("Unknown order should return 404",async()=>{
  const fakeId=new mongoose.Types.ObjectId();
  const response=await request(app).get(`/api/orders/${fakeId}`);
  assert.strictEqual(response.status,404);
});

test("Invalid request should return 400",async()=>{
  const response=await request(app).post("/api/orders").send({customerName:"Vaishu"});
  assert.strictEqual(response.status,400);
  assert.strictEqual(response.body.success,false);
});