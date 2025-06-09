CREATE TYPE "public"."step" AS ENUM('sent', 'delivered', 'read');--> statement-breakpoint

CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" varchar(500) NOT NULL,
	"id_sender" uuid,
	"id_receiver" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"step" "step" DEFAULT 'sent' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_sender_users_id_fk" FOREIGN KEY ("id_sender") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_receiver_users_id_fk" FOREIGN KEY ("id_receiver") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;