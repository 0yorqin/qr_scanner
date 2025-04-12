import fs from "fs/promises";
import path from "path";

export async function saveMenuToFile(data: any, filename = "menu.json") {
  const filePath = path.join(process.cwd(), filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log("✅ Меню сохранено в", filePath);
}
