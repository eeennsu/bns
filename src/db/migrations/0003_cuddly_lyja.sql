CREATE TABLE "bundle_drinks" (
	"id" serial PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"drink_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_drinks_unique_pair_idx" UNIQUE("bundle_id","drink_id")
);
--> statement-breakpoint
CREATE TABLE "drinks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" integer NOT NULL,
	"is_signature" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
ALTER TABLE "bundle_drinks" ADD CONSTRAINT "bundle_drinks_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_drinks" ADD CONSTRAINT "bundle_drinks_drink_id_drinks_id_fk" FOREIGN KEY ("drink_id") REFERENCES "public"."drinks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bundle_drinks_bundle_id_idx" ON "bundle_drinks" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_drinks_drink_id_idx" ON "bundle_drinks" USING btree ("drink_id");--> statement-breakpoint
CREATE INDEX "drinks_name_idx" ON "drinks" USING btree ("name");--> statement-breakpoint
CREATE INDEX "drinks_price_idx" ON "drinks" USING btree ("price");