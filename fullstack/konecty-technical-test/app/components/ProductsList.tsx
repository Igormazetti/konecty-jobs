"use client";
import { Product } from "app/types";
import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import CategoryMenu from "./CategoryMenu";
import ProductsCard from "./ProductsCard";
import { useDebounce } from "app/hooks/useDebounce";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const [productsList, setProductsList] = useState<Product[]>(products);

  const [search, setSearch] = useState("");

  const debouncedPayload = useDebounce({
    value: search,
    delay: 500,
  });

  const handleFilter = async (category: string) => {
    const res = await fetch(`/api/products?category=${category}`);
    const result = await res.json();

    if (search) {
      const filteredProducts = result.filter((product: Product) => product.name.toLowerCase().includes(search.toLowerCase()));
      setProductsList(filteredProducts);
    } else {
      setProductsList(result);
    }
  };

  useEffect(() => {
    if (debouncedPayload) {
      const filteredProducts = productsList.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
      setProductsList(filteredProducts);
    } else {
      setProductsList(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPayload]);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex items-center">
        <MagnifyingGlass size={24} color="#8B8B8B" className=" absolute left-6" />
        <input
          className="bg-white text-[#8B8B8B] w-[229px] p-2 pl-14 rounded-[10px]"
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

      <div className="grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[340px] md:max-w-[675px] overflow-y-auto">
        {productsList.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
