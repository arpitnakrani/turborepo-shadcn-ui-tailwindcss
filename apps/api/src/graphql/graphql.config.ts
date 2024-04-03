import { MercuriusDriver } from "@nestjs/mercurius";
import { join } from "path";


export  const graphqlConfig = {
    driver: MercuriusDriver,
    autoSchemaFile : join(process.cwd() , "src/graphql/schema.graphql"), //make types auto with decorators (codeFirstApproach)
    definitions :  {
      path : join(process.cwd() , "src/graphql/graphql.ts")
    },
    graphiql: true,
    // typePaths : ["./**/*.graphql"] //check all files in currentFolder with .graphql (SchemaFirst approach)
  }