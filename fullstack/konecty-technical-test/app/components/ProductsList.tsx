"use client";
import { Product } from "app/types";
import React, { useState } from "react";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const [productsList, setProductsList] = useState<Product[]>(products);

  console.log(productsList);
  return <div>ProductsList</div>;
}
