ALTER TABLE "messages" RENAME COLUMN "step" TO "status";--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "is_edited" boolean DEFAULT false NOT NULL;