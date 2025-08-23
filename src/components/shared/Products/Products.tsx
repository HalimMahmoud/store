import CarouselProducts from "./CarouselProducts";

export default async function ProductsServer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const products = json.data;

  return <CarouselProducts products={products} />;
}
