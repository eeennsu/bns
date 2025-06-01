ALTER TABLE "image_references" DROP CONSTRAINT "image_references_image_id_unique";--> statement-breakpoint
ALTER TABLE "breads" ALTER COLUMN "is_active" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bundles" ALTER COLUMN "is_active" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "is_active" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "sauces" ALTER COLUMN "is_active" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "breads" DROP COLUMN "image";--> statement-breakpoint
ALTER TABLE "bundles" DROP COLUMN "image";