import ProductDetail from "./ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}?populate=*`,
    { cache: "no-store" } // no-store = always fetch latest
  );

  if (!res.ok) {
    return <div className="p-6">❌ Failed to load product</div>;
  }

  const json = await res.json();
  const product = json.data;

  if (!product) {
    return <div className="p-6">⚠️ Product not found</div>;
  }

  return <ProductDetail product={product} />;
}
