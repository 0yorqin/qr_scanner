"use client";

export async function getLocalMenu() {
  const res = await fetch("/api/iiko/menu", { method: "POST" });
  const data = await res.json();
  return data;
}
