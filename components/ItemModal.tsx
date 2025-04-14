"use client";

import Image from "next/image";
import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const ItemModal = ({ product }: { product: any }) => {
  const router = useRouter();

  if (!product) return null;
  console.log(product.itemSizes[0].buttonImageUrl);

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg relative flex md:flex-row flex-col items-center justify-between"
      >
        <X
          className="absolute top-2 right-2 cursor-pointer text-primary"
          onClick={() => router.back()}
        />
        <div className="flex flex-row mt-4 justify-between mx-4">
          <div className="w-[347px] h-[238px] rounded-lg ">
            <Image
              src={product.itemSizes[0].buttonImageUrl}
              alt={product.name}
              width={347}
              height={238}
              className="rounded-lg object-contain"
            />
          </div>
          <div className="ml-4 flex flex-col gap-3">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h1>{product.itemSizes[0].prices[0].price}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
