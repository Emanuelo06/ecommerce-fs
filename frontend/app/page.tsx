"use client";

import React from "react";
import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { useProductsQuery } from "@/services/productQueries";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { data, isLoading, error } = useProductsQuery({ limit: 4, sort: "newest" });

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/products">
            <Button variant="link">View All</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            Failed to load products.
          </div>
        ) : !data || data.products.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No products found. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                category={product.category}
                image={product.images?.[0] || `https://placehold.co/600x400?text=${product.title}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home