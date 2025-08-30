"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useTableStore } from "@/store/table";

export default function CartBar() {
  const { totalQty, subtotal, asArray, clear } = useCartStore();
  const tableId = useTableStore((s) => s.tableId);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (totalQty === 0) return null;

  const placeOrder = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/iiko/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableId,
          items: asArray().map((i) => ({
            id: i.id,
            qty: i.qty,
            price: i.price,
            name: i.name,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || "Failed to place order");
      } else {
        setMessage("Order placed");
        clear();
      }
    } catch (e) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black text-white rounded-full px-5 py-3 flex items-center gap-3 shadow-xl">
        <span>{totalQty} items</span>
        <span className="opacity-70">•</span>
        <span>{(subtotal / 100).toFixed(2)}</span>
        <button
          onClick={placeOrder}
          disabled={loading || !tableId}
          className="bg-white text-black rounded-full px-4 py-2 font-semibold disabled:opacity-50"
        >
          {loading ? "Placing..." : tableId ? "Place order" : "Scan table QR"}
        </button>
      </div>
      {message ? (
        <div className="mt-2 text-center text-sm">{message}</div>
      ) : null}
    </div>
  );
}
