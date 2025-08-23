"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";

export const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const loggedIn = true;
    if (loggedIn) {
      setUser({ name: "John" });
    }
  }, []);

  const logout = () => {
    setUser(null); // Replace with real logout logic
  };

  return { user, logout };
};

export default function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="dark:text-gray-300">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>👋 {user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Edit Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/signin">
            <Button
              variant="outline"
              className="text-sm px-4 py-1 mr-1 dark:text-gray-300"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="outline"
              className="text-sm px-4 py-1 mr-1 dark:text-gray-300"
            >
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
