CREATE TABLE "price_periods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"coefficient" numeric(6, 4) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"id_vehicles" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "price_periods" ADD CONSTRAINT "price_periods_id_vehicles_vehicles_id_fk" FOREIGN KEY ("id_vehicles") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;