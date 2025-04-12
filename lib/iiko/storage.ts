import { eq } from "drizzle-orm";
import { db } from "../db";
import { menuCache } from "../schema";

export async function saveMenu(data: any) {
  const now = new Date();

  await db
    .insert(menuCache)
    .values({ id: "singleton", data, updatedAt: now })
    .onConflictDoUpdate({
      target: menuCache.id,
      set: { data, updatedAt: now },
    });
}

export async function getMenuFromDb() {
  const result = await db
    .select()
    .from(menuCache)
    .where(eq(menuCache.id, "singleton"));

  return result[0]?.data || null;
}
