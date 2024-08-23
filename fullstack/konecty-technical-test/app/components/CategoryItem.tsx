import React from "react";

interface CategoryItemProps {
  title: string;
  handleClick: () => void;
}

export default function CategoryItem({ title, handleClick }: CategoryItemProps) {
  return (
    <button
      onClick={handleClick}
      className="bg-white px-4 py-1 rounded-full font-semibold transition-opacity duration-200 hover:opacity-80"
    >
      {title}
    </button>
  );
}
