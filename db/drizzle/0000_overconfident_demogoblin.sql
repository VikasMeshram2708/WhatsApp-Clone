CREATE TYPE "public"."role" AS ENUM('ADMIN', 'BASIC');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_name" text NOT NULL,
	"user_email" text NOT NULL,
	"user_picture" text,
	"user_role" "role" DEFAULT 'BASIC',
	"user_last_login" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_user_email_unique" UNIQUE("user_email")
);
