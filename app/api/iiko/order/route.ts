import { NextRequest, NextResponse } from "next/server";
import { submitIikoOrder } from "../../../../lib/iiko/order";

export async function POST(req: NextRequest) {
  try {
    const { items, tableId } = await req.json();

    const organizationId = process.env.IIKO_ORG_ID;
    const terminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID || undefined;

    if (!process.env.IIKO_API_KEY) {
      return NextResponse.json({ error: "Missing IIKO_API_KEY" }, { status: 500 });
    }
    if (!organizationId) {
      return NextResponse.json({ error: "Missing IIKO_ORG_ID" }, { status: 500 });
    }

    const result = await submitIikoOrder({
      organizationId,
      terminalGroupId,
      tableId: tableId ?? null,
      items: Array.isArray(items) ? items : [],
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Order failed" }, { status: 500 });
  }
}
