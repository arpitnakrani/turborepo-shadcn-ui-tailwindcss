ALTER TABLE "tasks" DROP CONSTRAINT "tasks_task_unique";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "role";