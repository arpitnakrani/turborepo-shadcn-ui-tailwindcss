
import { NestMiddleware } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import getDragonFlyClient from "./dragonfly/dragonfly.client";

 
export interface RateLimiterRule {
    endpoint: string,
    rate_limit: {
        time: number, //In Seconds
        limit: number
    }
}

let RateLimiter : RateLimiterRule = { endpoint : "*" ,rate_limit :  {time : 60 , limit : 100}}
 
export class RateLimiterMiddleware implements NestMiddleware {
    async use(req: FastifyRequest, res: FastifyReply['raw'], next: () => void) {
        let dragonFlyClient = await getDragonFlyClient()
        // console.log(dragonFlyClient , "dragonFlyClientdragonFlyClientdragonFlyClientdragonFlyClientdragonFlyClientdragonFlyClientdragonFlyClient")
        if(!dragonFlyClient) return next(); //if dragonfly/redis is not installed on machine we are not restricting for strict restriction on production comment this line!
        const { endpoint, rate_limit } = RateLimiter;


        const ipAddress = req.ip || req.headers['x-forwarded-for'] ;
        const keyId = `${endpoint}/${ipAddress}`;

        //incr the req count
        const requests = await dragonFlyClient?.incr(keyId) ?? 0;

        if(requests === 1) {
            await dragonFlyClient?.expire(keyId, rate_limit.time);
        }
        if(requests > rate_limit.limit) {
            console.log("Too Many Request")
             return  new Error("Too Many Request");
            // res.status(429).send({
            //     message: 'Too Much Request',
            // });
        }
        next();
      }
}

