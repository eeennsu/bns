CREATE TABLE "bundle_relations" (
	"id" integer PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"bread_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bundles" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"image" varchar(256),
	"price" integer NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bread" RENAME TO "breads";--> statement-breakpoint
ALTER TABLE "bundle_relations" ADD CONSTRAINT "bundle_relations_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_relations" ADD CONSTRAINT "bundle_relations_bread_id_breads_id_fk" FOREIGN KEY ("bread_id") REFERENCES "public"."breads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "breads" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "breads" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "breads" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "breads" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "deleted_at";