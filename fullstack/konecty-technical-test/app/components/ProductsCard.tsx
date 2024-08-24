import { Product } from "app/types";
import Image from "next/image";
import React from "react";

interface ProductsCardProps {
  product: Product;
}

export default function ProductsCard({ product }: ProductsCardProps) {
  return (
    <div className="bg-white rounded-[15px] w-[156px] h-[215px] flex flex-col justify-center px-3">
      <Image src={product.image} alt={product.name} height={65} width={129} className="w-full object-contain h-[100px]" />

      <div className="mt-2">
        <p className="font-semibold">{product.category}</p>
        <p className="text-[#7C7A7A] text-[13px]">{product.name}</p>
        <p className="font-semibold">${product.price}</p>
      </div>
    </div>
  );
}
