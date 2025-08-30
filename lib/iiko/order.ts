import { getAccessToken } from "./client";

type OrderItem = {
  id: string;
  qty: number;
  price?: number;
  name?: string;
};

export async function submitIikoOrder(payload: {
  organizationId: string;
  terminalGroupId?: string;
  tableId?: string | null;
  items: OrderItem[];
}) {
  const token = await getAccessToken();

  const body: any = {
    organizationId: payload.organizationId,
    terminalGroupId: payload.terminalGroupId,
    order: {
      items: payload.items.map((i) => ({
        productId: i.id,
        amount: i.qty,
      })),
      comment: payload.tableId ? `tableId=${payload.tableId}` : undefined,
    },
  };

  const res = await fetch("https://api-ru.iiko.services/api/1/deliveries/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) {
      throw new Error(json?.message || "iiko error");
    }
    return json;
  } catch {
    throw new Error(text);
  }
}
