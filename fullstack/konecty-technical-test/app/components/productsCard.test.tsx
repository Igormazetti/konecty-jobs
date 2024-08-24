import { render, screen } from "@testing-library/react";
import ProductsCard from "./ProductsCard";
import { Product } from "app/types";

const mockProduct: Product = {
  id: 1,
  name: "Product 1",
  category: "Categoria A",
  price: 100,
  image: "https://www.image.com/image.jpg",
};

describe("ProductsCard", () => {
  it("should render product details correctly", () => {
    render(<ProductsCard product={mockProduct} />);

    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText("Categoria A")).toBeInTheDocument();

    expect(screen.getByText("Product 1")).toBeInTheDocument();

    expect(screen.getByText("$100")).toBeInTheDocument();
  });
});
