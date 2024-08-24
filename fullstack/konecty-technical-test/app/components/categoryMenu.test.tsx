import { render, screen, fireEvent } from "@testing-library/react";
import CategoryMenu from "./CategoryMenu";

describe("CategoryMenu", () => {
  it("should render all category items", () => {
    render(<CategoryMenu handleFilter={() => {}} />);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Nike")).toBeInTheDocument();
    expect(screen.getByText("Converse")).toBeInTheDocument();
    expect(screen.getByText("Adidas")).toBeInTheDocument();
    expect(screen.getByText("Vans")).toBeInTheDocument();
  });

  it("should call handleFilter with the correct category when an item is clicked", () => {
    const handleFilter = jest.fn();
    render(<CategoryMenu handleFilter={handleFilter} />);

    fireEvent.click(screen.getByText("Nike"));

    expect(handleFilter).toHaveBeenCalledWith("Nike");
    expect(handleFilter).toHaveBeenCalledTimes(1);
  });
});
