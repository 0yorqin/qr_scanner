import Image from "next/image";
import React from "react";

interface ItemSize {
  buttonImageUrl?: string;
  prices: { price: number }[];
}

interface Item {
  id: string;
  name: string;
  itemSizes: ItemSize[];
}

const ItemCard = ({ item }: { item: Item }) => {
  const { name, itemSizes } = item;
  const size = itemSizes[0];
  return (
    <div className="md:w-[286px] h-[310px] max-sm:w-[48%] bg-white rounded-xl hover:shadow-lg transition mb-4 flex flex-col gap-4">
      <div className="rounded-t-xl h-[200px] overflow-hidden">
        <Image
          src={
            size.buttonImageUrl ||
            "https://www.servli.com/cdn/shop/t/262/assets/fsr-placeholder.png?v=45093109498714503231652397781"
          }
          alt={name}
          width={286}
          height={150}
          className="rounded-t-xl object-contain"
        />
      </div>
      <h2 className="text-xl font-bold ml-2 line-clamp-1">{name}</h2>
      <p className="text-2xl font-proxima-bold ml-2 text-primary">
        {size.prices[0].price} UZS
      </p>
    </div>
  );
};

export default ItemCard;
