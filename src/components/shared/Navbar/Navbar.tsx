"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle/DarkModeToggle";

import UserProfile, { useAuth } from "./UserProfile/UserProfile";
import Cart from "../Cart/Cart";

// Simulated auth state (replace with real auth logic)

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="w-full shadow-sm border-b bg-white dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold whitespace-nowrap text-black dark:text-white"
          >
            Store
          </Link>

          {/* Search Bar */}
          <div className="flex-1 hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-full"
            />
          </div>

          {/* Pages & Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Pages */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/about"
                className="hover:text-primary transition text-muted-foreground dark:text-gray-300"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition text-muted-foreground dark:text-gray-300"
              >
                Contact
              </Link>
            </nav>

            <UserProfile />
            {/* Cart
            <Button variant="ghost" size="icon" className="dark:text-gray-300">
              <ShoppingCart className="h-5 w-5" />
            </Button> */}

            <Cart />
            <DarkModeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="/">Home</Link>
                  <Link href="/products">Products</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                  <Input type="text" placeholder="Search..." className="mt-2" />
                  {!user && (
                    <>
                      <Link href="/signin">Sign In</Link>
                      <Link href="/signup">Sign Up</Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
