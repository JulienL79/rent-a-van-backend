ALTER TABLE "vehicles" RENAME COLUMN "id_owner" TO "id_user";--> statement-breakpoint
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_id_owner_users_id_fk";
--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "is_available" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;