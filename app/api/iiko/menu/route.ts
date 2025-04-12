import { getAccessToken } from "@/lib/iiko/client";
import { NextResponse } from "next/server";

export async function POST() {
  const token = await getAccessToken();

  const response = await fetch("https://api-ru.iiko.services/api/2/menu", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const text = await response.text();

  try {
    const json = JSON.parse(text);
    return NextResponse.json(json);
  } catch (err) {
    console.error("Ответ не JSON:", text);
    return NextResponse.json(
      { raw: text, error: "Невалидный JSON от iiko" },
      { status: 500 }
    );
  }
}
