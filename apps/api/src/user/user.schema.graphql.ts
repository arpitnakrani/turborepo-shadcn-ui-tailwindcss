import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {

     @Field(()=> Int  )
     id : string 

     @Field({nullable : true})
     name: string;

     @Field({nullable : true})
     email: string;
 
     @Field({nullable : true})
     password: string;

}