import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsList from "./ProductsList";
import { Product } from "app/types";

const mockProducts: Product[] = [
  { id: 1, name: "Product 1", category: "Nike", price: 100, image: "https://www.image.com" },
  { id: 2, name: "Product 2", category: "Adidas", price: 200, image: "https://www.image.com" },
  { id: 3, name: "Product 3", category: "Nike", price: 150, image: "https://www.image.com" },
];

jest.mock("../hooks/useDebounce.ts", () => ({
  useDebounce: jest.fn((value) => value.value),
}));

describe("ProductsList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the product list with correct number of products", () => {
    render(<ProductsList products={mockProducts} />);
    expect(screen.getByText("Tênis")).toBeInTheDocument();
    expect(screen.getByText("3 produtos encontrados")).toBeInTheDocument();
  });

  it("should filter products by category", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts.filter((product) => product.category === "Nike")),
      })
    ) as jest.Mock;

    render(<ProductsList products={mockProducts} />);

    fireEvent.click(screen.getByRole("button", { name: /Nike/i }));

    expect(await screen.findByText("2 produtos encontrados")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    (global.fetch as jest.Mock).mockClear();
  });

  it("should filter products by search input with debounce", async () => {
    render(<ProductsList products={mockProducts} />);

    fireEvent.change(screen.getByPlaceholderText("Buscar produto"), { target: { value: "Product 1" } });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
    });
  });

  it("should reset product list when search is cleared", async () => {
    render(<ProductsList products={mockProducts} />);

    fireEvent.change(screen.getByPlaceholderText("Buscar produto"), { target: { value: "Product 1" } });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Buscar produto"), { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("Product 3")).toBeInTheDocument();
      expect(screen.getByText("3 produtos encontrados")).toBeInTheDocument();
    });
  });
});
