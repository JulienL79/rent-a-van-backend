CREATE TYPE "public"."fuel_type" AS ENUM('diesel', 'petrol', 'electric', 'hybrid', 'other');--> statement-breakpoint
CREATE TYPE "public"."gear_type" AS ENUM('manual', 'automatic');--> statement-breakpoint
CREATE TYPE "public"."name" AS ENUM('admin', 'user');--> statement-breakpoint

CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_owner" uuid NOT NULL,
	"id_category" uuid NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"mileage" integer NOT NULL,
	"registration_date" timestamp NOT NULL,
	"registration_plate" varchar(7) NOT NULL,
	"description" varchar(500) NOT NULL,
	"number_of_seat" smallint NOT NULL,
	"number_of_sleeping_place" smallint NOT NULL,
	"length" numeric(4, 2) NOT NULL,
	"height" numeric(4, 2) NOT NULL,
	"weight" numeric(10, 2) NOT NULL,
	"fuelType" "fuel_type" NOT NULL,
	"gearType" "gear_type" NOT NULL,
	"consumption" numeric(5, 2) NOT NULL,
	"city_name" varchar(100) NOT NULL,
	"city_coordinates" varchar(100) NOT NULL,
	"insurance_number" varchar(100) NOT NULL,
	"insurance_expiration_date" timestamp NOT NULL,
	"base_price" numeric(10, 2) NOT NULL,
	"is_available" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_role" uuid NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"birthdate" timestamp NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"driving_license" varchar(255),
	"address_number" smallint,
	"address_street" varchar(255) NOT NULL,
	"address_city" varchar(255) NOT NULL,
	"address_zip" varchar(5) NOT NULL,
	"address_country" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_password_unique" UNIQUE("password")
);
--> statement-breakpoint
CREATE TABLE "pictures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"src" varchar(255) NOT NULL,
	"alt" varchar(255) NOT NULL,
	"id_users" uuid NOT NULL,
	"id_vehicles" uuid
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "name" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "name" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_owner_users_id_fk" FOREIGN KEY ("id_owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_category_categories_id_fk" FOREIGN KEY ("id_category") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_roles_id_fk" FOREIGN KEY ("id_role") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_id_users_users_id_fk" FOREIGN KEY ("id_users") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_id_vehicles_vehicles_id_fk" FOREIGN KEY ("id_vehicles") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;