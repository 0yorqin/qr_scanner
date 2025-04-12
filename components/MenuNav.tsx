import { getLocalMenu } from "@/lib/readFile";
import React from "react";
import ScrollableNav from "./ScrollableNav";

const MenuNav = async () => {
  const menu = await getLocalMenu();
  const categories = menu?.itemCategories;

  if (!categories || categories.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500 ">
        Нет категорий для отображения
      </div>
    );
  }

  return <ScrollableNav categories={categories} />;
};

export default MenuNav;
