CREATE TABLE "bundle_dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"dish_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_dishes_unique_pair_idx" UNIQUE("bundle_id","dish_id")
);
--> statement-breakpoint
ALTER TABLE "bundle_dishes" ADD CONSTRAINT "bundle_dishes_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_dishes" ADD CONSTRAINT "bundle_dishes_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bundle_dishes_bundle_id_idx" ON "bundle_dishes" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_dishes_dish_id_idx" ON "bundle_dishes" USING btree ("dish_id");