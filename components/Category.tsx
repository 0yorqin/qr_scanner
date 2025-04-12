import React from "react";
import ItemCard from "./ItemCard";

interface Props {
  categoryId: string;
  name: string;
  items: any[];
}

const Category = ({ categoryId, name, items }: Props) => {
  return (
    <div id={categoryId} className="mb-8">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>

      <div className="flex flex-row flex-wrap md:justify-between justify-center">
        {items.map((item: any) => {
          const size = item.itemSizes[0];
          return (
            <ItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              size={size}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
