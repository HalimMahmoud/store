"use client";
import React, { useState } from "react";
import { Star, ShoppingCart, Plus, Minus, Heart, Share2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

type Product = {
  documentId: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  images: { url: string }[];
};
interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.documentId,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url ?? "",
      stock: product.stock,
      // add other required fields if needed
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : index < rating
            ? "fill-yellow-200 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const adjustQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      {/* <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0].url}`}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {product.originalPrice && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                Sale
              </Badge>
            )}
            {!product.stock && (
              <Badge variant="secondary" className="absolute top-4 right-4">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Category */}
            <Badge variant="outline" className="mb-4">
              {/* {product.category === "toys" ? "Kids Toys" : "Kids Clothes"} */}
            </Badge>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-gray-600">
                {product.rating}

                {/* ({product.reviewCount} reviews) */}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-green-600">
                Save {formatPrice(product.originalPrice - product.price)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {product.stock ? (
              <p className="text-green-600 font-medium">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-medium">Out of Stock</p>
            )}
          </div>

          {/* Quantity Selector */}
          {product.stock && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => adjustQuantity(-1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => adjustQuantity(1)}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className="flex-1 h-12"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant="outline" size="lg" className="h-12">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <Separator />

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.documentId}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span>
                      {/* {product.category === "toys"
                        ? "Kids Toys"
                        : "Kids Clothes"} */}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span>{product.documentId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span>{product.stock} units</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(5)}</div>
                      <span className="font-medium">John D.</span>
                    </div>
                    <p className="text-gray-600">
                      Great quality product! My kids love it and it arrived
                      quickly.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(4)}</div>
                      <span className="font-medium">Sarah M.</span>
                    </div>
                    <p className="text-gray-600">
                      Very happy with this purchase. Excellent value for money.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
