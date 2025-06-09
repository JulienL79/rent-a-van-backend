ALTER TABLE "password_reset_token" DROP CONSTRAINT "password_reset_token_id_unique";--> statement-breakpoint
ALTER TABLE "password_reset_token" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "password_reset_token" ADD COLUMN "token" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_token_unique" UNIQUE("token");