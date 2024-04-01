import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.schema.graphql";
import * as schema from "../drizzle/schema"
import { eq } from 'drizzle-orm';
import { DrizzleService } from "src/drizzle/drizzle.service";

@Resolver()
export class UserResolver {
    constructor(private readonly drizzleService : DrizzleService){}
    private db  = this.drizzleService.db

    @Query((returns)=> [User])
    async getAllUsers(){
        let users = await this.db.query.users.findMany({ })  ;
        console.log(users , users)
        return users
    }
}