ALTER TABLE "image_references" RENAME COLUMN "order" TO "sort_order";--> statement-breakpoint
DROP INDEX "bundle_sauces_bundle_id_idx";--> statement-breakpoint
DROP INDEX "bundle_sauces_sauce_id_idx";--> statement-breakpoint
DROP INDEX "breads_mbti_idx";--> statement-breakpoint
DROP INDEX "breads_name_idx";--> statement-breakpoint
DROP INDEX "breads_price_idx";--> statement-breakpoint
DROP INDEX "events_end_date_idx";--> statement-breakpoint
DROP INDEX "events_name_idx";--> statement-breakpoint
DROP INDEX "events_start_date_idx";--> statement-breakpoint
DROP INDEX "idx_ref_table_id_order";--> statement-breakpoint
DROP INDEX "bundle_price_idx";--> statement-breakpoint
DROP INDEX "bundle_breads_bread_id_idx";--> statement-breakpoint
DROP INDEX "bundle_breads_bundle_id_idx";--> statement-breakpoint
DROP INDEX "sauces_name_idx";--> statement-breakpoint
DROP INDEX "sauces_price_idx";--> statement-breakpoint
DROP INDEX "dish_name_idx";--> statement-breakpoint
ALTER TABLE "breads" ALTER COLUMN "deleted_at" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "deleted_at" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "bundles" ALTER COLUMN "deleted_at" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "sauces" ALTER COLUMN "deleted_at" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "ingredients" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "deleted_at" SET DEFAULT null;--> statement-breakpoint
CREATE INDEX "bundle_sauces_bundle_id_idx" ON "bundle_sauces" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_sauces_sauce_id_idx" ON "bundle_sauces" USING btree ("sauce_id");--> statement-breakpoint
CREATE INDEX "breads_mbti_idx" ON "breads" USING btree ("mbti");--> statement-breakpoint
CREATE INDEX "breads_name_idx" ON "breads" USING btree ("name");--> statement-breakpoint
CREATE INDEX "breads_price_idx" ON "breads" USING btree ("price");--> statement-breakpoint
CREATE INDEX "events_end_date_idx" ON "events" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX "events_name_idx" ON "events" USING btree ("name");--> statement-breakpoint
CREATE INDEX "events_start_date_idx" ON "events" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "idx_ref_table_id_order" ON "image_references" USING btree ("ref_table","ref_id","sort_order");--> statement-breakpoint
CREATE INDEX "bundle_price_idx" ON "bundles" USING btree ("price");--> statement-breakpoint
CREATE INDEX "bundle_breads_bread_id_idx" ON "bundle_breads" USING btree ("bread_id");--> statement-breakpoint
CREATE INDEX "bundle_breads_bundle_id_idx" ON "bundle_breads" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "sauces_name_idx" ON "sauces" USING btree ("name");--> statement-breakpoint
CREATE INDEX "sauces_price_idx" ON "sauces" USING btree ("price");--> statement-breakpoint
CREATE INDEX "dish_name_idx" ON "dishes" USING btree ("name");