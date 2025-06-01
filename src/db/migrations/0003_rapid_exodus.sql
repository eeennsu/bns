ALTER TABLE "breads" ADD COLUMN "image_id" integer;--> statement-breakpoint
ALTER TABLE "bundles" ADD COLUMN "image_id" integer;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "image_id" integer;--> statement-breakpoint
ALTER TABLE "sauces" ADD COLUMN "image_id" integer;--> statement-breakpoint
ALTER TABLE "breads" ADD CONSTRAINT "breads_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundles" ADD CONSTRAINT "bundles_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sauces" ADD CONSTRAINT "sauces_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;