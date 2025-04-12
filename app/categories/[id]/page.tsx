import { getCategoryItemsById } from "@/lib/iiko/menu.action";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const category = await getCategoryItemsById(params.id);

  return (
    <div className="mx-auto max-w-7xl mt-20">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{category?.name}</h1>
          <p className="text-lg font-regular text-black/70">
            {category?.description}
          </p>
        </div>
        <Link href="/" className="mt-8 flex flex-row items-center gap-2">
          <ArrowLeftCircle size={30} />
          <span className="font-semibold uppercase">Назад</span>
        </Link>
      </div>

      <div className="flex flex-row flex-wrap mt-10 justify-between">
        {category.items.map((item: any) => {
          const size = item.itemSizes[0];
          const prices = size.prices[0];
          return (
            <div
              key={item.id}
              className="w-[500px] h-[600px] bg-gradient-to-t from-white to-purple-100/30 border-1 border-gray-100 shadow-md rounded-lg my-10 items-center flex flex-col gap-2 justify-between"
            >
              <div className="h-[400px]">
                {size?.buttonImageUrl && (
                  <Image
                    src={size.buttonImageUrl}
                    alt={item.name}
                    className="object-fit mt-2"
                    width={400}
                    height={300}
                  />
                )}
              </div>
              <div className="w-full h-[150px] text-center">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-lg font-regular text-black/70">
                  {size?.description}
                </p>
                <p className="text-2xl font-bold text-purple-950 mt-5">
                  {prices.price.toLocaleString("ru-RU")} UZS
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
