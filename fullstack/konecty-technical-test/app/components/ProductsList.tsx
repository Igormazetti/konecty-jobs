"use client";
import { Product } from "app/types";
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import CategoryMenu from "./CategoryMenu";
import ProductsCard from "./ProductsCard";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [search, setSearch] = useState("");

  console.log(productsList);

  const handleFilter = async (category: string) => {
    const res = await fetch(`/api/products?category=${category}`);
    const result = await res.json();
    setProductsList(result);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex items-center">
        <MagnifyingGlass size={24} color="#8B8B8B" className=" absolute left-2" />
        <input
          className="bg-white text-[#8B8B8B] w-[229px] p-2 pl-10 rounded-md"
          type="text"
          placeholder="Buscar produto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <h1 className="font-bold text-[30px]">Tênis</h1>
        <p>{productsList.length} produtos encontrados</p>
      </div>

      <CategoryMenu handleFilter={handleFilter} />

      <div className="grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full md:w-[675px] overflow-y-auto">
        {productsList.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
