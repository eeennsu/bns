-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"type" varchar(50) DEFAULT 'image/jpeg' NOT NULL,
	"size" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "image_references" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"ref_table" varchar(50) NOT NULL,
	"ref_id" integer NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bundle_sauces" (
	"id" serial PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"sauce_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_sauces_unique_pair_idx" UNIQUE("bundle_id","sauce_id")
);
--> statement-breakpoint
CREATE TABLE "breads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" integer NOT NULL,
	"mbti" varchar(4) NOT NULL,
	"is_signature" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(18) NOT NULL,
	"password" varchar(255) NOT NULL,
	"last_logged_at" timestamp with time zone,
	"role" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "bundles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" integer NOT NULL,
	"discounted_price" integer,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "bundle_breads" (
	"id" serial PRIMARY KEY NOT NULL,
	"bundle_id" integer NOT NULL,
	"bread_id" integer NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bundle_breads_unique_pair_idx" UNIQUE("bundle_id","bread_id")
);
--> statement-breakpoint
CREATE TABLE "sauces" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"image" varchar(2048) NOT NULL,
	"price" integer NOT NULL,
	"is_signature" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "bundle_sauces" ADD CONSTRAINT "bundle_sauces_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_sauces" ADD CONSTRAINT "bundle_sauces_sauce_id_sauces_id_fk" FOREIGN KEY ("sauce_id") REFERENCES "public"."sauces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_breads" ADD CONSTRAINT "bundle_breads_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_breads" ADD CONSTRAINT "bundle_breads_bread_id_breads_id_fk" FOREIGN KEY ("bread_id") REFERENCES "public"."breads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_ref_table_id_order" ON "image_references" USING btree ("ref_table" text_ops,"ref_id" int4_ops,"order" text_ops);--> statement-breakpoint
CREATE INDEX "bundle_sauces_bundle_id_idx" ON "bundle_sauces" USING btree ("bundle_id" int4_ops);--> statement-breakpoint
CREATE INDEX "bundle_sauces_sauce_id_idx" ON "bundle_sauces" USING btree ("sauce_id" int4_ops);--> statement-breakpoint
CREATE INDEX "breads_mbti_idx" ON "breads" USING btree ("mbti" text_ops);--> statement-breakpoint
CREATE INDEX "breads_name_idx" ON "breads" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "breads_price_idx" ON "breads" USING btree ("price" int4_ops);--> statement-breakpoint
CREATE INDEX "events_end_date_idx" ON "events" USING btree ("end_date" timestamp_ops);--> statement-breakpoint
CREATE INDEX "events_name_idx" ON "events" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "events_start_date_idx" ON "events" USING btree ("start_date" timestamp_ops);--> statement-breakpoint
CREATE INDEX "bundle_price_idx" ON "bundles" USING btree ("price" int4_ops);--> statement-breakpoint
CREATE INDEX "bundle_breads_bread_id_idx" ON "bundle_breads" USING btree ("bread_id" int4_ops);--> statement-breakpoint
CREATE INDEX "bundle_breads_bundle_id_idx" ON "bundle_breads" USING btree ("bundle_id" int4_ops);--> statement-breakpoint
CREATE INDEX "sauces_name_idx" ON "sauces" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "sauces_price_idx" ON "sauces" USING btree ("price" int4_ops);
