"use client";

import Image from "next/image";
import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const ItemModal = ({ product }: { product: any }) => {
  const router = useRouter();

  if (!product) return null;

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg relative flex md:flex-row flex-col items-center justify-between md:w-[694px] w-[90%] md:h-[374px]"
      >
        <X
          className="absolute top-2 right-2 cursor-pointer text-primary"
          onClick={() => router.back()}
        />
        <div className="flex md:flex-row flex-col mt-4 justify-between mx-4">
          <div className="w-[347px] h-[238px] rounded-lg overflow-hidden">
            <Image
              src={product.itemSizes[0].buttonImageUrl}
              alt={product.name}
              width={347}
              height={238}
              className="rounded-lg object-contain"
            />
          </div>
          <div className="max-sm:mt-4 ml-4 flex flex-col gap-5 items-start">
            <h2 className="font-proxima-bold text-2xl">{product.name}</h2>
            <p className="text-md line-clamp-3">{product.description}</p>
            <h1 className="text-xl font-proxima-bold text-primary">
              {product?.itemSizes[0]?.prices[0]?.price?.toLocaleString?.()} UZS
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
