require("dotenv").config();
const app=require("./app");
const {connectDatabase,disconnectDatabase}=require("./db");
const {connectRedis,disconnectRedis}=require("./redis");

const PORT=process.env.PORT||5000;

async function startServer(){
  try{
    await connectDatabase();
    await connectRedis();

    const server=app.listen(PORT,"0.0.0.0",()=>{
      console.log(`Food Delivery API running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Process ID: ${process.pid}`);
    });

    async function shutdown(signal){
      console.log(`${signal} received. Shutting down...`);
      server.close(async()=>{
        try{
          await disconnectRedis();
          await disconnectDatabase();
          console.log("Server shutdown completed");
          process.exit(0);
        }catch(error){
          console.error("Shutdown error:",error.message);
          process.exit(1);
        }
      });
    }

    process.on("SIGINT",()=>shutdown("SIGINT"));
    process.on("SIGTERM",()=>shutdown("SIGTERM"));
  }catch(error){
    console.error("Server startup failed:",error.message);
    process.exit(1);
  }
}
startServer();