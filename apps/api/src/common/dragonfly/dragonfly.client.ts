import { Logger } from 'nestjs-pino';
import { createClient, RedisClientType } from 'redis';
const REDIS_CONFIG = {
    HOST: '127.0.0.1', //127.0.0.1
    PORT: 6379,
}
 
export let dragonFlyClient: RedisClientType | null = null;
 
 
 
 async function redisFunc() {
    try{
        if(! dragonFlyClient) {
            dragonFlyClient = createClient({
                // url: `http://localhost:6379`
                socket : {
                    host : REDIS_CONFIG.HOST,
                    port : REDIS_CONFIG.PORT
                }
            })
        }
        await dragonFlyClient.connect();
        console.log("dragonFly connected successfully!")
    }catch(err)
    {
            console.log(err , "connection to dragonFly failed!");
    }   
   
}
 
 
redisFunc();
 
 
export default dragonFlyClient;