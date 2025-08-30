"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCartStore } from "@/store/cart";

interface ItemSize {
  buttonImageUrl?: string;
  prices: { price: number }[];
}

interface Item {
  itemId: string;
  name: string;
  itemSizes: ItemSize[];
}

const ItemCard = ({ item }: { item: Item }) => {
  const { name, itemSizes } = item;
  const size = itemSizes[0];

  const add = useCartStore((s) => s.add);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const items = useCartStore((s) => s.items);
  const inCart = items[item.itemId];

  const priceCents = Number(size?.prices?.[0]?.price ?? 0) * 100;

  return (
    <div className="md:w-[286px] h-[310px] max-sm:w-[48%] bg-white rounded-xl hover:shadow-lg transition mb-4 flex flex-col gap-4 p-0">
      <Link href={`/product/${item.itemId}`}>
        <div className="rounded-t-xl h-[200px] overflow-hidden">
          <Image
            src={
              size?.buttonImageUrl ||
              "https://www.servli.com/cdn/shop/t/262/assets/fsr-placeholder.png?v=45093109498714503231652397781"
            }
            alt={name}
            width={286}
            height={150}
            className="rounded-t-xl object-contain"
          />
        </div>
        <h2 className="text-xl font-bold ml-2 line-clamp-1">{name}</h2>
      </Link>
      <div className="px-2 pb-2 flex items-center justify-between">
        <p className="text-2xl font-proxima-bold text-primary">
          {size?.prices?.[0]?.price?.toLocaleString?.() ?? "—"} UZS
        </p>
        {!inCart ? (
          <button
            onClick={() =>
              add(
                {
                  id: item.itemId,
                  name: item.name,
                  price: priceCents,
                  imageUrl: size?.buttonImageUrl ?? null,
                },
                1
              )
            }
            className="text-white bg-black rounded-full px-3 py-1 text-sm"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(item.itemId)}
              className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"
            >
              -
            </button>
            <span className="min-w-6 text-center">{inCart.qty}</span>
            <button
              onClick={() => increment(item.itemId)}
              className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
