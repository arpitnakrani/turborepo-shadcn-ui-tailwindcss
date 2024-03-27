import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email : text('email').unique(),
    name: text('name'),
    password: varchar('password', { length: 256 }),
  });