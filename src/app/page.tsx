import CarouselProducts from "@/components/shared/Products/CarouselProducts";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const products = json.data;
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2  dark:text-white">
            Welcome to Our Store
          </h1>
          <p className="text-gray-600  dark:text-white">
            Explore our wide range of products below.
          </p>
        </div>

        {/* Category Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6  dark:text-white">
            All Products
          </h2>
        </div>

        {/* Product Listing */}
        <CarouselProducts products={products} />
      </div>
    </div>
  );
}
