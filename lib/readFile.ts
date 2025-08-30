"use client";

type NomenclatureProduct = {
  id: string;
  name: string;
  groupId?: string | null;
  sizePrices?: { price: number }[];
  buttonImageUrl?: string | null;
  itemSizes?: { buttonImageUrl?: string; prices: { price: number }[] }[];
};

type NomenclatureGroup = {
  id: string;
  name: string;
  isDeleted?: boolean;
};

function adaptNomenclatureToCategories(payload: any) {
  const groups: NomenclatureGroup[] =
    payload?.groups || payload?.productCategories || [];
  const products: any[] = payload?.products || payload?.items || [];

  const itemsByGroup: Record<string, any[]> = {};
  for (const p of products) {
    const gid = p.groupId || p.parentGroup || "uncategorized";
    if (!itemsByGroup[gid]) itemsByGroup[gid] = [];

    const priceFromSizePrices =
      Array.isArray(p.sizePrices) && p.sizePrices.length > 0
        ? p.sizePrices[0]?.price?.currentPrice ?? 0
        : 0;

    const price = typeof p.price === "number" ? p.price : priceFromSizePrices;

    const buttonImageUrl =
      p.buttonImageUrl ||
      p.imageUrl ||
      (Array.isArray(p.imageLinks) ? p.imageLinks[0] : null) ||
      (Array.isArray(p.images) ? p.images[0] : null) ||
      null;

    const itemSizes =
      Array.isArray(p.itemSizes) && p.itemSizes.length
        ? p.itemSizes
        : [{ buttonImageUrl, prices: [{ price }] }];

    itemsByGroup[gid].push({
      itemId: p.id,
      name: p.name,
      itemSizes,
    });
  }

  const categories = groups
    .filter((g) => !g.isDeleted)
    .map((g) => ({
      id: g.id,
      name: g.name,
      items: itemsByGroup[g.id] || [],
    }))
    .filter((c) => c.items.length > 0);

  return { itemCategories: categories };
}

export async function getLocalMenu() {
  const res = await fetch("/api/iiko/menu", { method: "POST" });
  const data = await res.json().catch(() => ({}));
  if (!data) return { itemCategories: [] };
  if (Array.isArray((data as any)?.itemCategories)) return data;
  return adaptNomenclatureToCategories(data);
}
