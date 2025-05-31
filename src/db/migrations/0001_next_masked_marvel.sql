CREATE TABLE "image_references" (
	"id" integer PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"ref_table" varchar(50) NOT NULL,
	"ref_id" integer NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT "image_references_image_id_unique" UNIQUE("image_id")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" integer PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
