"use client";

import Category from "@/components/Category";
import ScrollableNav from "@/components/ScrollableNav";
import { useEffect, useState } from "react";
import CartBar from "@/components/CartBar";
import { useTableStore } from "@/store/table";
import { getLocalMenu } from "@/lib/readFile";

export default function Page() {
  const setTableId = useTableStore((s) => s.setTableId);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tableId");
    setTableId(t);
    (async () => {
      const data = await getLocalMenu();
      setCategories(data.itemCategories || []);
    })();
  }, [setTableId]);

  return (
    <div className="max-w-6xl mx-auto">
      <ScrollableNav categories={categories} />
      <div className="mt-4">
        {categories.map((category: any) => (
          <Category
            key={category.id}
            categoryId={category.id}
            name={category.name}
            items={category.items}
          />
        ))}
      </div>
      <CartBar />
    </div>
  );
}
