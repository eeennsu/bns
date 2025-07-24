CREATE TABLE "bundle_desserts" (
	"id" serial PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"dessert_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_desserts_unique_pair_idx" UNIQUE("bundle_id","dessert_id")
);
--> statement-breakpoint
CREATE TABLE "desserts" (
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
ALTER TABLE "bundle_desserts" ADD CONSTRAINT "bundle_desserts_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_desserts" ADD CONSTRAINT "bundle_desserts_dessert_id_desserts_id_fk" FOREIGN KEY ("dessert_id") REFERENCES "public"."desserts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bundle_desserts_bundle_id_idx" ON "bundle_desserts" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_desserts_dessert_id_idx" ON "bundle_desserts" USING btree ("dessert_id");--> statement-breakpoint
CREATE INDEX "desserts_name_idx" ON "desserts" USING btree ("name");--> statement-breakpoint
CREATE INDEX "desserts_price_idx" ON "desserts" USING btree ("price");