import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const categoryAvailability = pgTable("category_availability", {
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  branchId: uuid("branch_id")
    .notNull()
    .references(() => branches.id),
});

export const items = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price"),
  iamgeUrl: text("image_url"),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
});
