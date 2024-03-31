import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email : text('email').unique(),
    name: text('name'),
    password: varchar('password', { length: 256 }),
    role: text('role'),
    user_id : uuid('user_id')
  });

  export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    task : text('task'),
    author: integer('author').notNull().references(()=>users.id),
  });

  export const userRelations = relations(users , ({one , many})=>
  ({
      tasks : many(tasks),
  }))
  
  export const taskRelations = relations(tasks , ({one , many})=>
  ({
      user : one(users , {
        fields : [tasks.author],
        references :[users.id]
      })
  }) 
)
  