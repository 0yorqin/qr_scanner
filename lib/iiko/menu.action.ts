import { getAccessToken } from "./client";
import { saveMenuToFile } from "./saveFile";

export async function loadMenu() {
  const token = await getAccessToken();

  const response = await fetch(
    "https://api-ru.iiko.services/api/2/menu/by_id",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalMenuId: "39540",
        organizationIds: ["acc7ca85-b8bf-4ab8-9b0e-c7e012fcb095"],
        priceCategoryId: "00000000-0000-0000-0000-000000000000",
      }),
    }
  );
  const text = await response.text();
  await saveMenuToFile(JSON.stringify(text), "menu.json");
  return JSON.parse(JSON.stringify(text));
}

export async function getCategoryItemsById(id: string) {
  const menu = await loadMenu();
  return menu.itemCategories.find((category) => category.id === id);
}
