"use server";

import fs from "fs/promises";
import path from "path";

export async function getLocalMenu() {
  const filePath = path.join(process.cwd(), "response.json"); // путь к файлу
  const content = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(content);

  return data;
}
