CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar(255) NOT NULL,
	"last_logged_at" timestamp with time zone,
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "breads" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256) NOT NULL,
	"image" varchar(256) NOT NULL,
	"price" integer NOT NULL,
	"mbti" varchar(4) NOT NULL,
	"is_signature" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "bundle_breads" (
	"id" integer PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"bread_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_breads_unique_pair_idx" UNIQUE("bundle_id","bread_id")
);
--> statement-breakpoint
CREATE TABLE "bundle_sauces" (
	"id" integer PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"sauce_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_sauces_unique_pair_idx" UNIQUE("bundle_id","sauce_id")
);
--> statement-breakpoint
CREATE TABLE "bundles" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256) NOT NULL,
	"image" varchar(256),
	"price" integer NOT NULL,
	"discounted_price" integer,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256) NOT NULL,
	"image" varchar(256),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE "sauces" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256) NOT NULL,
	"image" varchar(256) NOT NULL,
	"price" integer NOT NULL,
	"is_signature" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null,
	CONSTRAINT "sauces_name_idx" UNIQUE("name"),
	CONSTRAINT "sauces_price_idx" UNIQUE("price")
);
--> statement-breakpoint
ALTER TABLE "bundle_breads" ADD CONSTRAINT "bundle_breads_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_breads" ADD CONSTRAINT "bundle_breads_bread_id_breads_id_fk" FOREIGN KEY ("bread_id") REFERENCES "public"."breads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_sauces" ADD CONSTRAINT "bundle_sauces_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_sauces" ADD CONSTRAINT "bundle_sauces_sauce_id_sauces_id_fk" FOREIGN KEY ("sauce_id") REFERENCES "public"."sauces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "breads_name_idx" ON "breads" USING btree ("name");--> statement-breakpoint
CREATE INDEX "breads_mbti_idx" ON "breads" USING btree ("mbti");--> statement-breakpoint
CREATE INDEX "breads_price_idx" ON "breads" USING btree ("price");--> statement-breakpoint
CREATE INDEX "bundle_breads_bundle_id_idx" ON "bundle_breads" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_breads_bread_id_idx" ON "bundle_breads" USING btree ("bread_id");--> statement-breakpoint
CREATE INDEX "bundle_sauces_bundle_id_idx" ON "bundle_sauces" USING btree ("bundle_id");--> statement-breakpoint
CREATE INDEX "bundle_sauces_sauce_id_idx" ON "bundle_sauces" USING btree ("sauce_id");--> statement-breakpoint
CREATE INDEX "bundle_price_idx" ON "bundles" USING btree ("price");--> statement-breakpoint
CREATE INDEX "events_start_date_idx" ON "events" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "events_end_date_idx" ON "events" USING btree ("end_date");