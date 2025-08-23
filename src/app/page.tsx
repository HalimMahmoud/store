import Products from "@/components/shared/Products/Products";

export default function Home() {
  const getCategoryTitle = () => {
    return "All Products";
  };

  const getWelcomeMessage = () => {
    return "Welcome to Our Store";
  };

  const getSubMessage = () => {
    return "Explore our wide range of products below.";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getWelcomeMessage()}
          </h1>
          <p className="text-gray-600">{getSubMessage()}</p>
        </div>

        {/* Category Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {getCategoryTitle()}
          </h2>
        </div>

        <Products />
      </div>
    </div>
  );
}
