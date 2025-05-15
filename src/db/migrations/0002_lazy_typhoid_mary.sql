DROP TABLE "sauce_bread_recommendations" CASCADE;--> statement-breakpoint
ALTER TABLE "breads" ADD COLUMN "is_signature" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "breads" ADD COLUMN "is_new" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "sauces" ADD COLUMN "is_signature" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "sauces" ADD COLUMN "is_new" boolean DEFAULT false NOT NULL;