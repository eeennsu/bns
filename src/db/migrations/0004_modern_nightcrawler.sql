ALTER TABLE "breads" DROP CONSTRAINT "breads_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "bundles" DROP CONSTRAINT "bundles_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "events_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "sauces" DROP CONSTRAINT "sauces_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "breads" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "bundles" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "image_id";--> statement-breakpoint
ALTER TABLE "sauces" DROP COLUMN "image_id";