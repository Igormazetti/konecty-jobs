import React from "react";
import CategoryItem from "./CategoryItem";

interface CategoryMenuProps {
  handleFilter: (category: string) => void;
}

const categories = ["Todos", "Nike", "Converse", "Adidas", "Vans"];

export default function CategoryMenu({ handleFilter }: CategoryMenuProps) {
  return (
    <div className="flex gap-4 w-full overflow-auto">
      {categories.map((category) => (
        <CategoryItem key={category} title={category} handleClick={() => handleFilter(category)} />
      ))}
    </div>
  );
}
