CREATE TYPE "public"."role" AS ENUM('ADMIN', 'BASIC');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"picture" text,
	"last_login" timestamp,
	"role" "role" DEFAULT 'BASIC',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
