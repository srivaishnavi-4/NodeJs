const express=require("express");
const routes=require("./routes");
const app=express();

app.use(express.json());
app.use("/api",routes);

app.use((req,res)=>{
  res.status(404).json({success:false,message:`Route ${req.method} ${req.originalUrl} not found`});
});

app.use((error,req,res,next)=>{
  console.error("Application error:",error);
  res.status(500).json({
    success:false,
    message:process.env.NODE_ENV==="production"?"Internal server error":error.message
  });
});

module.exports=app;