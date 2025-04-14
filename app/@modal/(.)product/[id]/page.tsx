import ItemModal from "@/components/ItemModal";
import { getLocalMenu } from "@/lib/readFile";

export default async function ProductModal({
  params,
}: {
  params: { id: string };
}) {
  const { id: productId } = await params;
  const menu = await getLocalMenu();

  const product = menu.itemCategories
    .flatMap((cat) => cat.items)
    .find((item) => item.itemId === productId);

  return <ItemModal product={product} />;
}
