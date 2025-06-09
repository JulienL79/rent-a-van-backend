CREATE TABLE "password_reset_token" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id_users" uuid NOT NULL,
	"isUsed" boolean DEFAULT false NOT NULL,
	CONSTRAINT "password_reset_token_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_id_users_users_id_fk" FOREIGN KEY ("id_users") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;