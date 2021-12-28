const redis = require("redis")


export default class RedisManager {
    client:any
    constructor() {
    this.client=redis.createClient({host:process.env.REDIS_HOST,port:process.env.REDIS_PORT})
    this.client.on('connect',function(){
        console.log(`Redis connection is successfull. Cache timeout is ${process.env.REDIS_CACHE_TIMEOUT} seconds`);
    })
    this.client.on('error',function(){
        console.log(`Redis connection is unsuccessfull`);
    })
  }
}