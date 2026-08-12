const Redis = require('ioredis')
const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest : null 
})

redis.on("connect", () =>{
    console.log("Redis Connected Successfully!!")
} )

redis.on("error" , (err) =>{
    console.error("Redis Not Connected" , err);
    
})
module.exports = redis