CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"task" text,
	"author" integer,
	"role" text,
	CONSTRAINT "tasks_task_unique" UNIQUE("task")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"password" varchar(256),
	"role" text,
	"user_id" uuid,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
