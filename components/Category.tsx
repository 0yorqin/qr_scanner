"use client";

import React, { useEffect, useRef } from "react";
import ItemCard from "./ItemCard";
import { useCategoryStore } from "@/store/category";
import { useIntersection } from "react-use";

interface Props {
  categoryId: string;
  name: string;
  items: any[];
}

const Category = ({ categoryId, name, items }: Props) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLElement>(null);
  const intersection = useIntersection(intersectionRef, {
    rootMargin: "-30% 0px -70% 0px",
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, setActiveCategoryId, categoryId]);

  return (
    <div
      id={categoryId}
      data-category-id={categoryId}
      className="mb-8 p-2"
      ref={intersectionRef}
    >
      <h1 className="text-2xl font-bold mb-4">{name}</h1>

      <div className="flex flex-wrap justify-start gap-2 w-full">
        {items.map((item: any, index) => {
          return <ItemCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Category;
