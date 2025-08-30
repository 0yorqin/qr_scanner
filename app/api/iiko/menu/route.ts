import { getAccessToken } from "@/lib/iiko/client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const token = await getAccessToken();

    const body: Record<string, any> = {
      organizationId: process.env.IIKO_ORG_ID,
      startRevision: 0,
    };

    const res = await fetch("https://api-ru.iiko.services/api/1/nomenclature", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const txt = await res.text();
    if (!res.ok) {
      return NextResponse.json({ status: res.status, error: txt || "iiko error" }, { status: 500 });
    }
    try {
      const json = JSON.parse(txt);
      return NextResponse.json(json);
    } catch {
      return NextResponse.json({ error: "Invalid JSON from iiko", raw: txt }, { status: 500 });
    }
  } catch (err: any) {
    const msg = err?.message || "Failed to load menu";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
