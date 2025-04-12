import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const menuCache = pgTable("menu-cache", {
  id: text("id").primaryKey().default("singleton"),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
