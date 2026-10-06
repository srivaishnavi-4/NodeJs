module.exports={
  apps:[{
    name:"food-delivery-api",
    script:"./src/server.js",
    instances:"max",
    exec_mode:"cluster",
    autorestart:true,
    watch:false,
    max_memory_restart:"300M",
    env:{NODE_ENV:"development",PORT:5000},
    env_production:{NODE_ENV:"production",PORT:5000},
    error_file:"./logs/error.log",
    out_file:"./logs/output.log",
    log_date_format:"YYYY-MM-DD HH:mm:ss"
  }]
};