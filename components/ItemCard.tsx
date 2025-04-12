import Image from "next/image";
import React from "react";

const ItemCard = ({
  name,
  description,
  size,
}: {
  name: string;
  description: string;
  size: string;
}) => {
  return (
    <div className="w-[286px] h-[310px] bg-white rounded-xl hover:shadow-lg transition mb-4 flex flex-col gap-4">
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
      <h2 className="text-xl font-bold ml-2">{name}</h2>
      <p className="text-2xl font-proxima-bold ml-2 text-primary">
        {size.prices[0].price} UZS
      </p>
    </div>
  );
};

export default ItemCard;
