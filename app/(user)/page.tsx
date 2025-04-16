import Category from "@/components/Category";
import MenuNav from "@/components/MenuNav";
import { getLocalMenu } from "@/lib/readFile";

export default async function HomePage() {
  const menu = await getLocalMenu();
  const categories = menu.itemCategories;
  return (
    <>
      <MenuNav />
      <div className="mt-3">
        {categories.map((category) => (
          <Category
            categoryId={category.id}
            key={category.id}
            name={category.name}
            items={category.items}
          />
        ))}
      </div>
    </>
  );
}
