CREATE TABLE "bots" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
