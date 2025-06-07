"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    params.delete("ingredient");
    params.delete("country");
    params.delete("category");

    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Recipe Book</span>
        </Link>

        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>
    </header>
  );
}
