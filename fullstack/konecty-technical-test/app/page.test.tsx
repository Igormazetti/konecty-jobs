import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: "Product 1", category: "Category A", image: "https://www.image.com" },
        { id: 2, name: "Product 2", category: "Category B", image: "https://www.image.com" },
      ]),
  })
) as jest.Mock;

describe("Page component", () => {
  it("renders the page correctly with products", async () => {
    render(await Page());

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
