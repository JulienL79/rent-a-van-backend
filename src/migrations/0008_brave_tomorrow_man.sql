ALTER TABLE "password_reset_token" DROP CONSTRAINT "password_reset_token_id_users_users_id_fk";
--> statement-breakpoint
ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_id_users_users_id_fk" FOREIGN KEY ("id_users") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;