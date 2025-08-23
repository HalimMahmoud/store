"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[400px] p-4">
        <h4 className="font-semibold text-lg mb-2">Shopping Cart</h4>
        <Separator className="mb-2" />
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ScrollArea className="h-[250px] pr-2">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 items-center justify-between"
                  >
                    <div className="w-16 h-16 relative rounded overflow-hidden border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.quantity} × {item.price} EGP
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-6 h-6"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>

                        <span className="text-sm w-5 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          size="icon"
                          variant="outline"
                          className="w-6 h-6"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= (item.stock ?? Infinity)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-sm">
              <span>Total:</span>
              <span>{total.toFixed(2)} EGP</span>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" onClick={clearCart}>
                <Trash2 className="w-4 h-4 mr-1" /> Clear
              </Button>
              <Link href="/cart" className="flex-1">
                <Button className="w-full">Go to Cart</Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
