"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Plus, Trash2, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  documentId: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  images: { url: string }[];
};

export default function CarouselProducts({
  products,
}: {
  products: Product[];
}) {
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const [addingItemId, setAddingItemId] = useState<string | null>(null);

  const handleAddToCart = async (product: Product) => {
    setAddingItemId(product.documentId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      addToCart({
        id: product.documentId,
        name: product.name,
        price: product.price,
        image: `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0].url}`,
        stock: product.stock,
      });
    } finally {
      setAddingItemId(null);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : index < rating
            ? "fill-yellow-200 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(price);

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <Carousel opts={{ align: "start", slidesToScroll: "auto" }}>
      <CarouselContent>
        {products.map((product) => {
          const isLoading = addingItemId === product.documentId;
          const isInCart = cart.some((item) => item.id === product.documentId);
          const inStock = product.stock > 0;
          const cartItem = cart.find((item) => item.id === product.documentId);
          return (
            <CarouselItem
              key={product.documentId}
              className="md:basis-1/4 lg:basis-1/6"
            >
              <Link
                className="p-2"
                href="/products/[id]"
                as={`/products/${product.documentId}`}
              >
                <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden py-0">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0].url}`}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {product.originalPrice && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 left-2"
                        >
                          Sale
                        </Badge>
                      )}
                      {!inStock && (
                        <Badge
                          variant="secondary"
                          className="absolute top-2 right-2"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Stock */}
                      {inStock ? (
                        <p className="text-sm text-green-600 mb-3">
                          In Stock ({product.stock})
                        </p>
                      ) : (
                        <p className="text-sm text-red-600 mb-3">
                          Out of Stock
                        </p>
                      )}

                      {/* Add to Cart Button */}

                      {isInCart ? (
                        <div
                          className="flex items-center justify-between gap-2 
"
                        >
                          <Button
                            className="cursor-pointer z-10"
                            onClick={(e) => {
                              e.preventDefault(); // ⛔ stop the <a> from navigating

                              e.stopPropagation(); // prevent card click

                              if (cartItem && cartItem.quantity > 1) {
                                updateQuantity(
                                  product.documentId,
                                  cartItem.quantity - 1
                                );
                              } else {
                                removeFromCart(product.documentId);
                              }
                            }}
                            variant="secondary"
                            size="icon"
                          >
                            {cartItem?.quantity === 1 ? (
                              <Trash2 className="h-4 w-4" />
                            ) : (
                              <Minus className="h-4 w-4" />
                            )}
                          </Button>

                          <span className="font-medium text-sm">
                            {cartItem?.quantity}
                          </span>

                          <Button
                            onClick={(e) => {
                              e.preventDefault(); // ⛔ stop the <a> from navigating

                              e.stopPropagation(); // prevent card click

                              if (
                                cartItem &&
                                cartItem.quantity < product.stock
                              ) {
                                updateQuantity(
                                  product.documentId,
                                  cartItem.quantity + 1
                                );
                              }
                            }}
                            className="cursor-pointer z-10"
                            disabled={cartItem?.quantity === product.stock}
                            variant="secondary"
                            size="icon"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="cursor-pointer w-full z-10"
                          onClick={(e) => {
                            e.preventDefault(); // ⛔ stop the <a> from navigating

                            e.stopPropagation(); // prevent card click

                            handleAddToCart(product);
                          }}
                          disabled={!inStock || isLoading}
                          variant={inStock ? "default" : "secondary"}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {isLoading
                            ? "Adding..."
                            : inStock
                            ? "Add to Cart"
                            : "Out of Stock"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
