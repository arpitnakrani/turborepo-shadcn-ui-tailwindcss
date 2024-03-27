CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"password" varchar(256),
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
